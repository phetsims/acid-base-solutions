// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for pH meter test in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Path = require( 'SCENERY/nodes/Path' ),
    Shape = require( 'KITE/Shape' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONT = new PhetFont( {size: 15, weight: 'bold'} ),
    SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' ),

  // string
    pHString = require( 'string!ACID_BASE_SOLUTIONS/pH' );

  function pHMeterTest( model, options ) {
    var self = this,
      backlash = 150,
      bufferY = 0,
      pHText,
      initY;
    Node.call( this, _.extend( {cursor: 'pointer'}, options ) );

    // add sensor
    this.addChild( new Node( {children: [
      new Rectangle( 15, 16, 8, 60, {fill: 'rgb(192,192,192)', stroke: 'rgb(160,160,160)', lineWidth: 0.5} ),
      new Rectangle( 10, 72, 18, 25, 3, 3, {fill: 'black'} ),
      new Path( new Shape().moveTo( 10, 95 ).lineTo( 28, 95 ).lineTo( 19, 110 ).lineTo( 10, 95 ), {fill: 'black'} )
    ]} ) );

    // add background view
    this.addChild( new Rectangle( 0, -16, 75, 32, 5, 5, {fill: 'rgb(192,192,192)', stroke: 'rgb(64,64,64)', lineWidth: 1.5} ) );

    // add text
    this.addChild( new Text( pHString + ':', {font: FONT, centerX: 18, centerY: 0} ) );
    this.addChild( pHText = new Text( '', {font: FONT, centerX: 36, centerY: 0} ) );

    // init drag
    initY = this.y;
    this.addInputListener( new SimpleDragHandler( {
      translate: function( e ) {
        var deltaY = e.delta.y;
        if ( e.position.y > initY && e.position.y < backlash && bufferY <= 0 ) {
          self.y += deltaY;
        }
        else if ( e.position.y <= initY || e.position.y >= backlash ) {
          bufferY += Math.abs( deltaY );
        }
        else {
          bufferY -= Math.abs( deltaY );
        }
      },
      end: function() {
        bufferY = 0;
      }
    } ) );

    model.property( 'ph' ).link( function( ph ) {
      pHText.setText( ph.toFixed( 2 ).replace( '.', ',' ) );
    } );

    model.property( 'testMode' ).link( function( mode ) {
      self.setVisible( mode === 'PH_METER' );
    } );
  }

  return inherit( Node, pHMeterTest );
} );
