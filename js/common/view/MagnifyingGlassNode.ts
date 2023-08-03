// Copyright 2014-2023, University of Colorado Boulder

/**
 * MagnifyingGlassNode is the view of the magnifying glass, in which are shown different representations of the solution.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { Shape } from '../../../../kite/js/imports.js';
import { Circle, Image, Node, Path, Rectangle } from '../../../../scenery/js/imports.js';
import solvent_png from '../../../images/solvent_png.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ParticlesNode from './ParticlesNode.js';
import { ViewMode } from './ViewMode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import ABSColors from '../ABSColors.js';
import Beaker from '../model/Beaker.js';
import AqueousSolution from '../model/solutions/AqueousSolution.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';

// constants
const SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
const CLIPPING_ENABLED = true; // set to false for debugging particle positions
const LENS_LINE_WIDTH = 8;

export default class MagnifyingGlassNode extends Node {

  private readonly solventNode: Node;
  private readonly particlesNode: ParticlesNode;

  public constructor( beaker: Beaker,
                      solutions: AqueousSolution[],
                      solutionProperty: ReadOnlyProperty<AqueousSolution>,
                      viewModeProperty: StringUnionProperty<ViewMode>,
                      solventVisibleProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    // lens
    const LENS_RADIUS = 0.465 * beaker.size.height;
    const LENS_CENTER = beaker.position.plusXY( 0, -beaker.size.height / 2 );
    const lensShape = Shape.circle( 0, 0, LENS_RADIUS );
    const lensNode = new Path( lensShape, { stroke: 'black', lineWidth: LENS_LINE_WIDTH } );

    // handle
    const handleNode = new Rectangle( LENS_RADIUS + 2, -LENS_RADIUS / 7, LENS_RADIUS * 0.9, LENS_RADIUS / 4, 5, 5, {
      fill: ABSColors.magnifyingGlassHandleFillProperty,
      stroke: 'black',
      lineWidth: 1
    } );
    handleNode.rotate( Math.PI / 6 );

    // opaque background, so we don't see things like pH paper in magnifyingGlass
    const waterNode = new Circle( LENS_RADIUS, {
      fill: ABSColors.opaqueSolutionColorProperty
    } );

    // solvent (H2O)
    const solventNode = new Image( solvent_png, {
      visibleProperty: solventVisibleProperty,
      imageOpacity: 0.6,  // reduce opacity so that other particles stand out more
      centerX: 0,
      centerY: 0
    } );

    // particles
    const particlesNode = new ParticlesNode( solutions, solutionProperty, new Bounds2( -LENS_RADIUS, -LENS_RADIUS, LENS_RADIUS, LENS_RADIUS ),
      LENS_RADIUS, LENS_LINE_WIDTH, tandem.createTandem( 'particlesNode' ) );

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
      translation: LENS_CENTER,
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
    solutionProperty.link( ( newSolution, oldSolution ) => {

      this.particlesNode.reset();

      // unlink from previous solution
      if ( oldSolution ) {
        oldSolution.strengthProperty.unlink( updateParticlesBound );
        oldSolution.concentrationProperty.unlink( updateParticlesBound );
      }

      // link to new solution
      newSolution.strengthProperty.lazyLink( updateParticlesBound );
      newSolution.concentrationProperty.lazyLink( updateParticlesBound );
      this.updateParticles();
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