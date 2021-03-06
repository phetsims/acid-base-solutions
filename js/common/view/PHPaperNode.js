// Copyright 2014-2021, University of Colorado Boulder

/**
 * Visual representation for pH paper in the 'Acid-Base Solutions' sim.
 * Origin is at the bottom-center of the paper.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Color from '../../../../scenery/js/util/Color.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSColors from '../ABSColors.js';

// constants
const SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
const PAPER_STROKE = 'rgb(100, 100, 100)';

class PHPaperNode extends Node {

  /**
   * @param {PHPaper} pHPaper
   */
  constructor( pHPaper ) {

    super( { cursor: 'pointer' } );

    // blank paper
    const paperNode = new Rectangle( 0, 0, pHPaper.paperSize.width, pHPaper.paperSize.height,
      { fill: ABSColors.PH_PAPER, stroke: PAPER_STROKE, lineWidth: 0.5 } );

    // portion of the paper that changes color
    const indicatorNode = new Rectangle( 0, 0, pHPaper.paperSize.width, 0, { stroke: PAPER_STROKE, lineWidth: 0.5 } );
    indicatorNode.rotate( Math.PI ); // so that indicator rectangle expands upward

    // rendering order
    this.addChild( paperNode );
    this.addChild( indicatorNode );
    if ( SHOW_ORIGIN ) {
      this.addChild( new Circle( 2, { fill: 'red' } ) );
    }

    // origin at bottom-center of paper
    paperNode.centerX = 0;
    paperNode.bottom = 0;
    indicatorNode.centerX = 0;
    indicatorNode.top = 0;

    // expand touch area
    this.touchArea = this.localBounds.dilatedXY( 10, 10 );

    // @private Constrained dragging
    let clickOffset = null;
    this.dragHandler = new DragListener( {

      start: event => {
        clickOffset = this.globalToParentPoint( event.pointer.point ).subtract( event.currentTarget.translation );
      },

      drag: event => {
        const v = this.globalToParentPoint( event.pointer.point ).subtract( clickOffset );
        pHPaper.positionProperty.set( new Vector2(
          Utils.clamp( v.x, pHPaper.dragBounds.minX, pHPaper.dragBounds.maxX ),
          Utils.clamp( v.y, pHPaper.dragBounds.minY, pHPaper.dragBounds.maxY ) ) );
      }
    } );
    this.addInputListener( this.dragHandler );

    // add observers
    pHPaper.positionProperty.link( position => {
      this.translation = position;
    } );

    pHPaper.indicatorHeightProperty.link( height => {
      indicatorNode.setRectHeight( height );
    } );

    // @private
    this.updateColor = () => {
      if ( this.visible ) {
        indicatorNode.fill = pHToColor( pHPaper.pHProperty.get() );
      }
    };
    pHPaper.pHProperty.link( this.updateColor );

    // @private is the paper animating?
    this.animating = false;

    // @private needed by methods
    this.pHPaper = pHPaper;
  }

  // @public
  step( dt ) {
    if ( !this.dragHandler.dragging ) {

      const position = this.pHPaper.positionProperty.value;
      const minY = this.pHPaper.beaker.top + ( 0.6 * this.pHPaper.paperSize.height );

      // if the paper is fully submerged in the solution ...
      if ( ( this.animating && position.y > minY ) || ( this.pHPaper.top > this.pHPaper.beaker.top ) ) {

        // float to the top of the beaker, with part of the paper above the surface
        this.animating = true;
        const dy = dt * 250; // move at a constant speed of 250 pixels per second
        const y = Math.max( minY, position.y - dy );
        this.pHPaper.positionProperty.value = new Vector2( position.x, y );
      }
    }
    else {
      this.animating = false;
    }

    // Update when this Node becomes visible.
    this.visibleProperty.link( visible => visible && this.updateColor() );
  }

  /**
   * Creates an icon that represents the pH paper.
   * @public
   * @static
   * @param {number} width
   * @param {number} height
   * @returns {Node}
   */
  static createIcon( width, height ) {
    return new Node( {
      children: [
        // full paper
        new Rectangle( 0, 0, width, height, { fill: ABSColors.PH_PAPER, stroke: PAPER_STROKE, lineWidth: 0.5 } ),
        // portion of paper that's colored
        new Rectangle( 0, 0.6 * height, width, 0.4 * height, {
          fill: ABSColors.PH[ 2 ],
          stroke: PAPER_STROKE,
          lineWidth: 0.5
        } )
      ]
    } );
  }
}

// Creates a {Color} color for a given {number} pH.
function pHToColor( pH ) {
  assert && assert( pH >= 0 && pH <= ABSColors.PH.length );
  let color;
  if ( Number.isInteger( pH ) ) {
    // pH value is an integer, look up color
    color = ABSColors.PH[ pH ];
  }
  else {
    // pH value is not an integer, interpolate between 2 closest colors
    const lowerPH = Math.floor( pH );
    const upperPH = lowerPH + 1;
    color = Color.interpolateRGBA( ABSColors.PH[ lowerPH ], ABSColors.PH[ upperPH ], ( pH - lowerPH ) );
  }
  return color;
}

acidBaseSolutions.register( 'PHPaperNode', PHPaperNode );
export default PHPaperNode;