// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation for pH paper in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ABSColors = require( 'ACID_BASE_SOLUTIONS/common/ABSColors' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
  var PAPER_STROKE = 'rgb(100, 100, 100)';

  /**
   * @param {PHPaper} pHPaper
   * @constructor
   */
  function PHPaperNode( pHPaper ) {

    var self = this;
    Node.call( this, { cursor: 'pointer' } );

    // blank paper
    var paperNode = new Rectangle( 0, 0, pHPaper.paperSize.width, pHPaper.paperSize.height,
      { fill: ABSColors.PH_PAPER, stroke: PAPER_STROKE, lineWidth: 0.5 } );

    // portion of the paper that changes color
    var indicatorNode = new Rectangle( 0, 0, pHPaper.paperSize.width, 0, { stroke: PAPER_STROKE, lineWidth: 0.5 } );
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

    // drag paper to move it
    this.addInputListener( new SimpleDragHandler( {

      clickOffset: null,

      start: function( e ) {
        this.clickOffset = self.globalToParentPoint( e.pointer.point ).subtract( e.currentTarget.translation );
      },

      drag: function( e ) {
        var v = self.globalToParentPoint( e.pointer.point ).subtract( this.clickOffset );
        pHPaper.locationProperty.value = new Vector2(
          Util.clamp( v.x, pHPaper.dragBounds.minX, pHPaper.dragBounds.maxX ),
          Util.clamp( v.y, pHPaper.dragBounds.minY, pHPaper.dragBounds.maxY ) );
      }
    } ) );

    // add observers
    pHPaper.locationProperty.link( function( location ) {
      self.translation = location;
    } );

    pHPaper.indicatorHeightProperty.link( function( height ) {
      indicatorNode.setRectHeight( height );
    } );

    pHPaper.pHProperty.link( function( pH ) {
      indicatorNode.fill = ABSColors.PH[ Math.round( pH ) ];
    } );
  }

  return inherit( Node, PHPaperNode, {}, {

    /**
     * Creates an icon that represents the pH paper.
     * @static
     * @param width
     * @param height
     * @returns {Node}
     */
    createIcon: function( width, height ) {
      return new Node( { children: [
        // full paper
        new Rectangle( 0, 0, width, height, { fill: ABSColors.PH_PAPER, stroke: PAPER_STROKE, lineWidth: 0.5 } ),
        // portion of paper that's colored
        new Rectangle( 0, 0.6 * height, width, 0.4 * height, { fill: ABSColors.PH[2], stroke: PAPER_STROKE, lineWidth: 0.5 } )
      ] } );
    }
  } );
} );
