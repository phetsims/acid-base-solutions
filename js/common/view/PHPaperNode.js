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
  var Circle = require( 'SCENERY/nodes/Circle' );
  var ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PHColorKeyNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHColorKeyNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  // constants
  var SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
  var PAPER_COLOR = 'rgb(217,215,154)'; // color of blank pH paper, cream

  function PHPaperNode( pHPaper ) {

    var self = this;
    Node.call( this, { cursor: 'pointer' } );

    // blank paper
    var width = ABSConstants.PH_PAPER_SIZE.width;
    var height = ABSConstants.PH_PAPER_SIZE.height;
    var paperNode = new Rectangle( 0, 0, width, height, { fill: PAPER_COLOR, stroke: 'rgb(150, 150, 150)', lineWidth: 0.5 } );

    // portion of the paper that changes color
    var indicatorNode = new Rectangle( 0, 0, width, 0, { fill: 'red', stroke: 'rgb(150, 150, 150)', lineWidth: 0.5 } );
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

    // drag paper to move it
    var clickOffset;
    this.addInputListener( new SimpleDragHandler( {

      start: function( e ) {
        clickOffset = self.globalToParentPoint( e.pointer.point ).subtract( e.currentTarget.translation );
      },

      drag: function( e ) {
        pHPaper.movePoint( self.globalToParentPoint( e.pointer.point ).subtract( clickOffset ) );
      }
    } ) );

    // add observers
    pHPaper.locationProperty.link( function( location ) {
      self.translation = location;
    } );

    pHPaper.indicatorHeightProperty.link( function( height ) {
      indicatorNode.setRectHeight( height );
    } );

    pHPaper.visibleProperty.link( function( visible ) {
      self.visible = visible;
    } );

    pHPaper.pHProperty.link( function( pH ) {
      indicatorNode.fill = PHColorKeyNode.pHToColor( pH );
    } );
  }

  return inherit( Node, PHPaperNode );
} );
