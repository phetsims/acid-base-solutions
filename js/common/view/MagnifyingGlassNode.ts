// Copyright 2014-2023, University of Colorado Boulder

/**
 * MagnifyingGlass view.
 * For performance, draws particle directly to Canvas using drawImage.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { Shape } from '../../../../kite/js/imports.js';
import { Circle, Image, Node, Path, Rectangle } from '../../../../scenery/js/imports.js';
import solvent_png from '../../../images/solvent_png.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import MagnifyingGlass from '../model/MagnifyingGlass.js';
import ParticlesNode from './ParticlesNode.js';
import { ViewMode } from './ViewMode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';

// constants
const SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
const CLIPPING_ENABLED = true; // set to false for debugging particle positions
const LENS_LINE_WIDTH = 8;

export default class MagnifyingGlassNode extends Node {

  private readonly solventNode: Node;
  private readonly particlesNode: ParticlesNode;

  public constructor( magnifyingGlass: MagnifyingGlass,
                      viewModeProperty: StringUnionProperty<ViewMode>,
                      solventVisibleProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    // lens
    const RADIUS = magnifyingGlass.radius;
    const lensShape = Shape.circle( 0, 0, RADIUS );
    const lensNode = new Path( lensShape, { stroke: 'black', lineWidth: LENS_LINE_WIDTH } );

    // handle
    const handleNode = new Rectangle( RADIUS + 2, -RADIUS / 7, RADIUS * 0.9, RADIUS / 4, 5, 5, {
      fill: 'rgb( 85, 55, 33 )',
      stroke: 'black',
      lineWidth: 1
    } );
    handleNode.rotate( Math.PI / 6 );

    // opaque background, so we don't see things like pH paper in magnifyingGlass
    const waterNode = new Circle( RADIUS, { fill: 'rgb(210,231,235)' } );

    // solvent (H2O)
    const solventNode = new Image( solvent_png, {
      visibleProperty: solventVisibleProperty,
      imageOpacity: 0.6,  // reduce opacity so that other particles stand out more
      centerX: 0,
      centerY: 0
    } );

    // particles
    const particlesNode = new ParticlesNode( magnifyingGlass, new Bounds2( -RADIUS, -RADIUS, RADIUS, RADIUS ),
      LENS_LINE_WIDTH, tandem.createTandem( 'particlesNode' ) );

    // stuff that's visible through (and therefore clipped to) the lens
    const viewportNode = new Node( { children: [ solventNode, particlesNode ] } );
    if ( CLIPPING_ENABLED ) {
      viewportNode.clipArea = lensShape;
    }

    const children: Node[] = [ waterNode, viewportNode, handleNode, lensNode ];
    if ( SHOW_ORIGIN ) {
      children.push( new Circle( 10, { fill: 'red' } ) );
    }

    super( {
      children: children,
      translation: magnifyingGlass.position,
      visibleProperty: new DerivedProperty( [ viewModeProperty ], viewMode => ( viewMode === 'particles' ), {
        tandem: tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      isDisposable: false,
      tandem: tandem
    } );

    this.particlesNode = particlesNode;
    this.solventNode = solventNode;

    // Observe the strength and concentration Properties for the selected solution.
    const updateParticlesBound = this.updateParticles.bind( this );
    magnifyingGlass.solutionProperty.link( ( newSolution, oldSolution ) => {

      this.particlesNode.reset();

      // unlink from previous solution
      if ( oldSolution ) {
        oldSolution.strengthProperty.unlink( updateParticlesBound );
        oldSolution.concentrationProperty.unlink( updateParticlesBound );
      }

      // link to new solution
      newSolution.strengthProperty.link( updateParticlesBound );
      newSolution.concentrationProperty.link( updateParticlesBound );
    } );

    // Update when this Node becomes visible.
    this.visibleProperty.link( visible => visible && this.updateParticles() );
  }

  /*
   * Updates the number of particles visible.
   * To improve performance, updates only when this Node is visible.
   */
  private updateParticles(): void {
    if ( this.visible ) {
      this.particlesNode.update();
    }
  }
}

acidBaseSolutions.register( 'MagnifyingGlassNode', MagnifyingGlassNode );