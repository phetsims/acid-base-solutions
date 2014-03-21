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
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' ),
    Constants = require( 'ACID_BASE_SOLUTIONS/model/Constants/Constants' ),

  // strings
    pHColorKeyString = require( 'string!ACID_BASE_SOLUTIONS/pHColorKey' ),

  // constants
    FONT_BIG = new PhetFont( 10 ),
    FONT_SMALL = new PhetFont( 8 ),
    PH_COLORS = require( 'model/Constants/PHColors' ),
    PAPER_DEFAUL_COLOR = PH_COLORS[PH_COLORS.length - 1],
    SPACE_BETWEEN_RECTS = 1,
    TABLE_RECT_HEIGHT = Constants.PH_COLOR_KEY_RECT_HEIGHT,
    TABLE_RECT_WIDTH = Constants.PH_COLOR_KEY_RECT_WIDTH;

  function PHPaperTest( pHPaperModel ) {
    var self = this,
      indicatorPaper,
      paper;
    Node.call( this );

    this.addChild( new Text( pHColorKeyString, {font: FONT_BIG, centerY: 0} ) );

    // add color key table
    for ( var i = 0; i < PH_COLORS.length - 1; i++ ) {
      this.addChild( new Rectangle( (TABLE_RECT_WIDTH + SPACE_BETWEEN_RECTS) * i, 10, TABLE_RECT_WIDTH, TABLE_RECT_HEIGHT, {fill: PH_COLORS[i]} ) );
      this.addChild( new Text( i.toString(), {font: FONT_SMALL, centerX: (TABLE_RECT_WIDTH + SPACE_BETWEEN_RECTS) * (i + 0.5), centerY: 46} ) );
    }

    // add pH paper
    this.addChild( paper = new Node( {children: [
      new Rectangle( (PH_COLORS.length + 2) * (TABLE_RECT_WIDTH + SPACE_BETWEEN_RECTS), 0, TABLE_RECT_WIDTH, pHPaperModel.length, {cursor: 'pointer', fill: PAPER_DEFAUL_COLOR, stroke: 'rgb(150, 150, 150)', lineWidth: 0.5} ),
      indicatorPaper = new Rectangle( 0, 0, TABLE_RECT_WIDTH, 0, {cursor: 'pointer', fill: 'red', stroke: 'rgb(150, 150, 150)', lineWidth: 0.5} )
    ]} ) );
    indicatorPaper.rotate( Math.PI );
    indicatorPaper.setTranslation( (PH_COLORS.length + 2) * (TABLE_RECT_WIDTH + SPACE_BETWEEN_RECTS) + TABLE_RECT_WIDTH, pHPaperModel.length );

    // add drag and drop for paper
    var clickOffset;
    paper.addInputListener( new SimpleDragHandler( {
      start: function( e ) {
        // get offset
        clickOffset = paper.globalToParentPoint( e.pointer.point ).subtract( e.currentTarget );
      },
      drag: function( e ) {
        // move to new position
        pHPaperModel.move( paper.globalToParentPoint( e.pointer.point ).subtract( clickOffset ) );
      }
    } ) );

    this.translation = pHPaperModel.location;

    // add observers
    pHPaperModel.paperLocation.link( function( location ) {
      paper.translation = location;
    } );

    pHPaperModel.indicatorHeight.link( function( newHeight ) {
      indicatorPaper.setRectHeight( newHeight );
    } );

    pHPaperModel.visibility.link( function( isVisible ) {
      self.setVisible( isVisible );
    } );

    pHPaperModel.pH.link( function( pHValue ) {
      indicatorPaper.setFill( PH_COLORS[Math.round( pHValue )] );
    } );
  }

  return inherit( Node, PHPaperTest );
} );
