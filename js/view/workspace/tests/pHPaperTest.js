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
    FONT_BIG = new PhetFont( 12 ),
    FONT_SMALL = new PhetFont( 9 ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' ),

  // strings
    pHColorKeyString = require( 'string!ACID_BASE_SOLUTIONS/pHColorKey' );

  var dragArea = {
    left: -290,
    right: 60,
    top: 0,
    bottom: 290
  };

  function pHPaperTest( model, options ) {
    var self = this,
      paperColor = model.PH_COOLORS[model.PH_COOLORS.length - 1];
    Node.call( this, options );

    this.addChild( new Text( pHColorKeyString, {font: FONT_BIG, centerY: 0} ) );

    // add color key table
    for ( var i = 0, rectWidth = 14, rectHeight = 30, space = 1; i < model.PH_COOLORS.length - 1; i++ ) {
      this.addChild( new Rectangle( (rectWidth + space) * i, 10, rectWidth, rectHeight, {fill: model.PH_COOLORS[i]} ) );
      this.addChild( new Text( i, {font: FONT_SMALL, centerX: (rectWidth + space) * (i + 0.5), centerY: 46} ) );
    }

    // add pH paper
    this.addChild( self.paper = new Rectangle( (model.PH_COOLORS.length + 2) * (rectWidth + space), 0, rectWidth, rectHeight * 4, {cursor: 'pointer', fill: paperColor, stroke: 'rgb(217,200,154)'} ) );
    this.paper.addInputListener( new SimpleDragHandler( {
      translate: self.move.bind( this )
    } ) );

    model.property( 'testMode' ).link( function( mode ) {
      self.setVisible( mode === 'PH_PAPER' );
    } );
  }

  return inherit( Node, pHPaperTest, {
    move: function( e ) {
      var position = e.position;
      if ( dragArea.left < position.x && position.x < dragArea.right &&
           dragArea.top < position.y && position.y < dragArea.bottom ) {
        this.paper.setTranslation( e.position );
      }
    }
  } );
} );
