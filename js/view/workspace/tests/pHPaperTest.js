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
    FONT_BIG = new PhetFont( 10 ),
    FONT_SMALL = new PhetFont( 8 ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' ),

  // strings
    pHColorKeyString = require( 'string!ACID_BASE_SOLUTIONS/pHColorKey' );

  var dragArea = {
    left: -295,
    right: 60,
    top: 0,
    bottom: 310
  };

  function pHPaperTest( model, options ) {
    var self = this,
      paperDefaultColor = model.PH_COOLORS[model.PH_COOLORS.length - 1],
      waterSurface = 14.5,
      indicatorPaper,
      paper,
      paperInitX,
      paperInitY;
    Node.call( this, options );

    this.addChild( new Text( pHColorKeyString, {font: FONT_BIG, centerY: 0} ) );

    // add color key table
    for ( var i = 0, tableRectWidth = 14, tableRectHeight = 28, space = 1; i < model.PH_COOLORS.length - 1; i++ ) {
      this.addChild( new Rectangle( (tableRectWidth + space) * i, 10, tableRectWidth, tableRectHeight, {fill: model.PH_COOLORS[i]} ) );
      this.addChild( new Text( i, {font: FONT_SMALL, centerX: (tableRectWidth + space) * (i + 0.5), centerY: 46} ) );
    }

    // add pH paper
    this.addChild( paper = new Node( {children: [
      new Rectangle( (model.PH_COOLORS.length + 2) * (tableRectWidth + space), 0, tableRectWidth, tableRectHeight * 4, {cursor: 'pointer', fill: paperDefaultColor, stroke: 'rgb(150, 150, 150)', lineWidth: 0.5} ),
      indicatorPaper = new Rectangle( 0, 0, tableRectWidth, 0, {cursor: 'pointer', fill: 'red', stroke: 'rgb(150, 150, 150)', lineWidth: 0.5} )
    ]} ) );
    indicatorPaper.rotate( Math.PI );
    indicatorPaper.setTranslation( (model.PH_COOLORS.length + 2) * (tableRectWidth + space) + tableRectWidth, tableRectHeight * 4 );

    // add drag and drop for paper
    var clickOffset,
      isContact = false, // water contact
      currentTarget = new Vector2( 0, 0 ),
      checkIndicator = function() {
        var diff = paper.y - waterSurface,
          newHeight;

        isContact = (diff > 0);

        if ( isContact ) {
          newHeight = Math.min( Math.max( diff + 5 ), tableRectHeight * 4 );
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
        v.setX( Math.min( Math.max( dragArea.left, v.x ), dragArea.right ) );
        v.setY( Math.min( Math.max( dragArea.top, v.y ), dragArea.bottom ) );
        // move to new position
        paper.setTranslation( v );
        checkIndicator();
      }
    } ) );
    paperInitX = paper.x;
    paperInitY = paper.y;

    model.property( 'testMode' ).link( function( mode ) {
      self.setVisible( mode === 'PH_PAPER' );
    } );

    model.property( 'ph' ).link( function( pHValue ) {
      indicatorPaper.setFill( model.PH_COOLORS[Math.round( pHValue )] );
      indicatorPaper.setRectHeight( 0 );
      checkIndicator();
    } );

    model.property( 'resetTrigger' ).link( function() {
      paper.setTranslation( paperInitX, paperInitY );
      indicatorPaper.setRectHeight( 0 );
      checkIndicator();
    } );
  }

  return inherit( Node, pHPaperTest );
} );
