// Copyright 2014-2020, University of Colorado Boulder

/**
 * Magnifier view.
 * For performance, draws molecules directly to Canvas using drawImage.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Shape from '../../../../kite/js/Shape.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import solventImage from '../../../images/solvent_png.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import MoleculesNode from './MoleculesNode.js';

// constants
const SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
const CLIPPING_ENABLED = true; // set to false to debug positioning of molecules
const LENS_LINE_WIDTH = 8;

class MagnifierNode extends Node {

  /**
   * @param {Magnifier} magnifier
   */
  constructor( magnifier ) {

    super();

    // lens
    const RADIUS = magnifier.radius;
    const lensShape = Shape.circle( 0, 0, RADIUS );
    const lensNode = new Path( lensShape, { stroke: 'black', lineWidth: LENS_LINE_WIDTH } );

    // handle
    const handleNode = new Rectangle( RADIUS + 2, -RADIUS / 7, RADIUS * 0.9, RADIUS / 4, 5, 5, {
      fill: 'rgb( 85, 55, 33 )',
      stroke: 'black',
      lineWidth: 1
    } );
    handleNode.rotate( Math.PI / 6 );

    // opaque background, so we don't see things like pH paper in magnifier
    const waterNode = new Circle( RADIUS, { fill: 'rgb(210,231,235)' } );

    // @private solvent (H2O)
    this.solventNode = new Image( solventImage, {
      imageOpacity: 0.6,  // reduce opacity so that other molecules stand out more
      centerX: 0,
      centerY: 0
    } );

    // @private molecules
    this.moleculesNode = new MoleculesNode( magnifier, new Bounds2( -RADIUS, -RADIUS, RADIUS, RADIUS ), LENS_LINE_WIDTH );

    // stuff that's visible through (and therefore clipped to) the lens
    const viewportNode = new Node( { children: [ this.solventNode, this.moleculesNode ] } );
    if ( CLIPPING_ENABLED ) {
      viewportNode.clipArea = lensShape;
    }

    // rendering order
    this.addChild( waterNode );
    this.addChild( viewportNode );
    this.addChild( handleNode );
    this.addChild( lensNode );
    if ( SHOW_ORIGIN ) {
      this.addChild( new Circle( 10, { fill: 'red' } ) );
    }

    // move to correct position
    this.translation = magnifier.position;

    // Observe the strength and concentration properties for whichever solution is selected.
    const updateMoleculesBound = this.updateMolecules.bind( this );
    magnifier.solutionTypeProperty.link( ( newSolutionType, prevSolutionType ) => {

      this.moleculesNode.reset();

      // unlink from previous solution
      if ( prevSolutionType ) {
        magnifier.solutions[ prevSolutionType.name ].strengthProperty.unlink( updateMoleculesBound );
        magnifier.solutions[ prevSolutionType.name ].concentrationProperty.unlink( updateMoleculesBound );
      }

      // link to new solution
      magnifier.solutions[ newSolutionType.name ].strengthProperty.link( updateMoleculesBound );
      magnifier.solutions[ newSolutionType.name ].concentrationProperty.link( updateMoleculesBound );
    } );

    // Update when this Node becomes visible.
    this.visibleProperty.link( visible => visible && this.updateMolecules() );
  }

  // @public
  setSolventVisible( visible ) {
    this.solventNode.visible = visible;
  }

  /*
   * @private
   * Updates the number of molecules visible in the magnifier.
   * To improve performance, updates only when this node is visible.
   */
  updateMolecules() {
    if ( this.visible ) {
      this.moleculesNode.update();
    }
  }
}

acidBaseSolutions.register( 'MagnifierNode', MagnifierNode );
export default MagnifierNode;