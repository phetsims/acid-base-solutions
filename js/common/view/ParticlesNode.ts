// Copyright 2014-2024, University of Colorado Boulder

/**
 * ParticlesNode displays the 'Particles' view. It consists of a magnifying glass, in which are shown a relative
 * ratio of the particles that make up the solution.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Shape from '../../../../kite/js/Shape.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import solvent_png from '../../../images/solvent_png.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSColors from '../ABSColors.js';
import ABSPreferences from '../model/ABSPreferences.js';
import Beaker from '../model/Beaker.js';
import AqueousSolution from '../model/solutions/AqueousSolution.js';
import ParticlesCanvasNode from './ParticlesCanvasNode.js';
import { ViewMode } from './ViewMode.js';

// constants
const SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
const CLIPPING_ENABLED = true; // set to false for debugging particle positions
const LENS_LINE_WIDTH = 8;

export default class ParticlesNode extends Node {

  private readonly solventNode: Node;
  private readonly particlesCanvasNode: ParticlesCanvasNode;

  public constructor( beaker: Beaker,
                      solutions: AqueousSolution[],
                      solutionProperty: ReadOnlyProperty<AqueousSolution>,
                      viewModeProperty: StringUnionProperty<ViewMode>,
                      tandem: Tandem ) {

    // magnifying glass lens
    const lensRadius = 0.465 * beaker.size.height;
    const lensCenter = beaker.position.plusXY( 0, -beaker.size.height / 2 );
    const lensShape = Shape.circle( 0, 0, lensRadius );
    const lensNode = new Path( lensShape, { stroke: 'black', lineWidth: LENS_LINE_WIDTH } );

    // magnifying glass handle
    const handleNode = new Rectangle( lensRadius + 2, -lensRadius / 7, lensRadius * 0.9, lensRadius / 4, 5, 5, {
      fill: ABSColors.magnifyingGlassHandleFillProperty,
      stroke: 'black',
      lineWidth: 1
    } );
    handleNode.rotate( Math.PI / 6 );

    // opaque background, so we don't see things like pH paper in magnifyingGlass
    const waterNode = new Circle( lensRadius, {
      fill: ABSColors.opaqueSolutionColorProperty
    } );

    // solvent (H2O)
    const solventNode = new Image( solvent_png, {
      visibleProperty: ABSPreferences.showSolventProperty,
      imageOpacity: 0.6,  // reduce opacity so that other particles stand out more
      centerX: 0,
      centerY: 0
    } );

    // particles
    const particlesCanvasNode = new ParticlesCanvasNode( solutions, solutionProperty, lensRadius, LENS_LINE_WIDTH, tandem );

    // stuff that's visible through (and therefore clipped to) the lens
    const viewportNode = new Node( { children: [ solventNode, particlesCanvasNode ] } );
    if ( CLIPPING_ENABLED ) {
      viewportNode.clipArea = lensShape;
    }

    const children: Node[] = [ waterNode, viewportNode, handleNode, lensNode ];
    if ( SHOW_ORIGIN ) {
      children.push( new Circle( 10, { fill: 'red' } ) );
    }

    super( {
      children: children,
      translation: lensCenter,
      visibleProperty: new DerivedProperty( [ viewModeProperty ], viewMode => ( viewMode === 'particles' ), {
        tandem: tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      isDisposable: false,
      tandem: tandem
    } );

    this.particlesCanvasNode = particlesCanvasNode;
    this.solventNode = solventNode;

    // Observe the strength and concentration Properties for the selected solution.
    const updateParticlesCanvasNodeBound = this.updateParticlesCanvasNode.bind( this );
    solutionProperty.link( ( newSolution, oldSolution ) => {

      this.particlesCanvasNode.reset();

      // unlink from previous solution
      if ( oldSolution ) {
        oldSolution.strengthProperty.unlink( updateParticlesCanvasNodeBound );
        oldSolution.concentrationProperty.unlink( updateParticlesCanvasNodeBound );
      }

      // link to new solution
      newSolution.strengthProperty.lazyLink( updateParticlesCanvasNodeBound );
      newSolution.concentrationProperty.lazyLink( updateParticlesCanvasNodeBound );
      this.updateParticlesCanvasNode();
    } );

    // Update when this Node becomes visible.
    this.visibleProperty.link( visible => visible && this.updateParticlesCanvasNode() );
  }

  /*
   * Updates the number of particles visible.
   * To improve performance, updates only when this Node is visible.
   */
  private updateParticlesCanvasNode(): void {
    if ( this.visible ) {
      this.particlesCanvasNode.update();
    }
  }
}

acidBaseSolutions.register( 'ParticlesNode', ParticlesNode );