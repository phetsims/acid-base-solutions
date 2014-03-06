// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for pH meter test in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Path = require( 'SCENERY/nodes/Path' ),
    Shape = require( 'KITE/Shape' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' ),
    Util = require( 'DOT/Util' ),
    TestModes = require( 'model/TestModes' ),

  // string
    pHString = require( 'string!ACID_BASE_SOLUTIONS/pH' ),

  // constants
    FONT = new PhetFont( {size: 15, weight: 'bold'} ),
    PROBE_MIN_Y_COODINATE = 25.2,
    PROBE_MAX_Y_COODINATE = 100,
    WATER_SURFACE = 38;

  function PHMeterTest( model, options ) {
    var self = this;
    Node.call( this, _.extend( {cursor: 'pointer'}, options ) );

    // add sensor
    this.addChild( new Node( {children: [
      new Rectangle( 12, 16, 5, 52, {fill: 'rgb(192,192,192)', stroke: 'rgb(160,160,160)', lineWidth: 0.5} ),
      new Rectangle( 7.5, 65, 14, 22, 3, 3, {fill: 'black'} ),
      new Path( new Shape().moveTo( 7.5, 85 ).lineTo( 21.5, 85 ).lineTo( 14.5, 100 ).lineTo( 7.5, 85 ), {fill: 'black'} )
    ]} ) );

    // add background view
    this.addChild( new Rectangle( 0, -16, 75, 32, 5, 5, {fill: 'rgb(192,192,192)', stroke: 'rgb(64,64,64)', lineWidth: 1.5} ) );

    // add text
    this.addChild( new Text( pHString + ':', {font: FONT, centerX: 18, centerY: 0} ) );
    this.addChild( this.pHText = new Text( '', {font: FONT, centerX: 34, centerY: 0} ) );

    // init drag
    var clickYOffset;
    this.addInputListener( new SimpleDragHandler( {
      start: function( e ) {
        clickYOffset = self.globalToParentPoint( e.pointer.point ).y - e.currentTarget.y;
      },
      drag: function( e ) {
        // new y-coordinate
        var y = self.globalToParentPoint( e.pointer.point ).y - clickYOffset;
        // check limitation
        y = Math.min( Math.max( PROBE_MIN_Y_COODINATE, y ), PROBE_MAX_Y_COODINATE );
        // move to new position
        self.setYValue( y );
      }
    } ) );

    model.property( 'pH' ).link( function( pH ) {
      self.pHText.setText( Util.toFixed( pH, 2 ) );
    } );

    model.property( 'testMode' ).link( function( mode ) {
      self.setVisible( mode === TestModes.PH_METER );
    } );

    model.property( 'resetTrigger' ).link( function() {
      self.setYValue( options.y || 0 );
    } );
  }

  return inherit( Node, PHMeterTest, {
    setYValue: function( y ) {
      this.y = y;
      this.pHText.setVisible( this.y > WATER_SURFACE );
    }
  } );
} );
