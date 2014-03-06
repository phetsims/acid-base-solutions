// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for pH paper test in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Vector2 = require( 'DOT/Vector2' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' ),
    TestModes = require( 'model/TestModes' ),

  // strings
    pHColorKeyString = require( 'string!ACID_BASE_SOLUTIONS/pHColorKey' ),

  // constants
    PH_COLORS = require( 'model/Constants/PHColors' ),
    FONT_BIG = new PhetFont( 10 ),
    FONT_SMALL = new PhetFont( 8 ),
    WATER_SURFACE = 14.5,
    TABLE_RECT_WIDTH = 14,
    TABLE_RECT_HEIGHT = 28, 
    SPACE_BETWEEN_RECTS = 1,
    
    DRAG_AREA = {
      left: -295,
      right: 60,
      top: 0,
      bottom: 310
    };

  function PHPaperTest( model, options ) {
    var self = this,
      paperDefaultColor = PH_COLORS[PH_COLORS.length - 1],
      indicatorPaper,
      paper,
      paperInitX,
      paperInitY;
    Node.call( this, options );

    this.addChild( new Text( pHColorKeyString, {font: FONT_BIG, centerY: 0} ) );

    // add color key table
    for ( var i = 0; i < PH_COLORS.length - 1; i++ ) {
      this.addChild( new Rectangle( (TABLE_RECT_WIDTH + SPACE_BETWEEN_RECTS) * i, 10, TABLE_RECT_WIDTH, TABLE_RECT_HEIGHT, {fill: PH_COLORS[i]} ) );
      this.addChild( new Text( i, {font: FONT_SMALL, centerX: (TABLE_RECT_WIDTH + SPACE_BETWEEN_RECTS) * (i + 0.5), centerY: 46} ) );
    }

    // add pH paper
    this.addChild( paper = new Node( {children: [
      new Rectangle( (PH_COLORS.length + 2) * (TABLE_RECT_WIDTH + SPACE_BETWEEN_RECTS), 0, TABLE_RECT_WIDTH, TABLE_RECT_HEIGHT * 4, {cursor: 'pointer', fill: paperDefaultColor, stroke: 'rgb(150, 150, 150)', lineWidth: 0.5} ),
      indicatorPaper = new Rectangle( 0, 0, TABLE_RECT_WIDTH, 0, {cursor: 'pointer', fill: 'red', stroke: 'rgb(150, 150, 150)', lineWidth: 0.5} )
    ]} ) );
    indicatorPaper.rotate( Math.PI );
    indicatorPaper.setTranslation( (PH_COLORS.length + 2) * (TABLE_RECT_WIDTH + SPACE_BETWEEN_RECTS) + TABLE_RECT_WIDTH, TABLE_RECT_HEIGHT * 4 );

    // add drag and drop for paper
    var clickOffset,
      isContact = false, // water contact
      currentTarget = new Vector2( 0, 0 ),
      checkIndicator = function() {
        var diff = paper.y - WATER_SURFACE,
          newHeight;

        isContact = (diff > 0);

        if ( isContact ) {
          newHeight = Math.min( Math.max( diff + 5 ), TABLE_RECT_HEIGHT * 4 );
          if ( newHeight > indicatorPaper.getHeight() ) {
            indicatorPaper.setRectHeight( newHeight );
          }
        }
      };
    paper.addInputListener( new SimpleDragHandler( {
      start: function( e ) {
        // get offset
        clickOffset = paper.globalToParentPoint( e.pointer.point ).subtract( currentTarget.setXY( e.currentTarget.x, e.currentTarget.y ) );
      },
      drag: function( e ) {
        // get new position
        var v = paper.globalToParentPoint( e.pointer.point ).subtract( clickOffset );
        // check limitation
        v.setX( Math.min( Math.max( DRAG_AREA.left, v.x ), DRAG_AREA.right ) );
        v.setY( Math.min( Math.max( DRAG_AREA.top, v.y ), DRAG_AREA.bottom ) );
        // move to new position
        paper.setTranslation( v );
        checkIndicator();
      }
    } ) );
    paperInitX = paper.x;
    paperInitY = paper.y;

    model.property( 'testMode' ).link( function( mode ) {
      self.setVisible( mode === TestModes.PH_PAPER );
    } );

    model.property( 'pH' ).link( function( pHValue ) {
      indicatorPaper.setFill( PH_COLORS[Math.round( pHValue )] );
      indicatorPaper.setRectHeight( 0 );
      checkIndicator();
    } );

    model.property( 'resetTrigger' ).link( function() {
      paper.setTranslation( paperInitX, paperInitY );
      indicatorPaper.setRectHeight( 0 );
      checkIndicator();
    } );
  }

  return inherit( Node, PHPaperTest );
} );
