// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for lightbulb, battery and wires in the conductivity test in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Image = require( 'SCENERY/nodes/Image' ),
    Path = require( 'SCENERY/nodes/Path' ),
    Shape = require( 'KITE/Shape' ),
    LinearFunction = require( 'DOT/LinearFunction' ),
    ConductivityTestWire = require( 'ACID_BASE_SOLUTIONS/view/workspace/tests/conductivity-test/ConductivityTestWire' ),
    ConductivityTestProbe = require( 'ACID_BASE_SOLUTIONS/view/workspace/tests/conductivity-test/ConductivityTestProbe' ),
    ConductivityTestLightRays = require( 'ACID_BASE_SOLUTIONS/view/workspace/tests/conductivity-test/ConductivityTestLightRays' );

  // images
  var batteryImage = require( 'image!ACID_BASE_SOLUTIONS/battery.png' ),
    lightBulbBaseImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-base.png' ),
    lightBulbGlassImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-glass.png' ),
    lightBulbGlassMaskImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-glass-mask.png' );

  // constants
  var BULB_END_X = 23,
    BULB_END_Y = 84,
    BULB_TO_BATTERY_WIRE_LENGTH = 40,
    OPACITY_MAX = 0.15,
  // alpha of the bulb when used against a dark background. This is clamped after evaluation to keep it within the range [0,1]
    BRIGHTNESS_TO_ALPHA_FUNCTION_AGAINST_DARK_BACKGROUND = new LinearFunction( 0, 1, OPACITY_MAX, 0 );

  function ConductivityTest( conductivityTestModel ) {
    var self = this,
      lightBulbDarkMask = new Node( {opacity: OPACITY_MAX, children: [new Image( lightBulbGlassMaskImage, {scale: 0.33} )]} ),
      wireOptions = conductivityTestModel.getWireOptions(),
      positiveProbeYProperty = conductivityTestModel.positiveProbeYProperty,
      negativeProbeYProperty = conductivityTestModel.negativeProbeYProperty,
      isClosedProperty = conductivityTestModel.isClosedProperty,
      negativeWire,
      positiveWire;
    Node.call( this );

    // add light rays
    this.addChild( new ConductivityTestLightRays( conductivityTestModel.brightnessProperty, isClosedProperty, lightBulbDarkMask.getGlobalBounds().width / 2, {x: lightBulbDarkMask.getGlobalBounds().width / 2, y: lightBulbDarkMask.getGlobalBounds().height / 2.75} ) );

    this.addChild( new Node( {children: [
      // add light bulb image
      new Node( {children: [
        new Image( lightBulbBaseImage, {scale: 0.33, x: 15.5, y: 66} ),
        new Image( lightBulbGlassImage, {scale: 0.33} ),
        lightBulbDarkMask
      ]} ),
      // add wire from battery to light bulb
      new Path( new Shape().moveTo( BULB_END_X, BULB_END_Y ).lineTo( BULB_END_X + BULB_TO_BATTERY_WIRE_LENGTH, BULB_END_Y ), {stroke: 'black', lineWidth: 1.5} ),
      // add battery image
      new Image( batteryImage, {scale: 0.6, x: BULB_END_X + BULB_TO_BATTERY_WIRE_LENGTH, y: 67} )
    ]} ) );

    // add wires
    this.addChild( negativeWire = new ConductivityTestWire( 'negative', wireOptions.negative.start.x, wireOptions.negative.start.y, wireOptions.negative.end.x, wireOptions.negative.end.y ) );
    this.addChild( positiveWire = new ConductivityTestWire( 'positive', wireOptions.positive.start.x, wireOptions.positive.start.y, wireOptions.positive.end.x, wireOptions.positive.end.y ) );

    // add probes
    this.addChild( new ConductivityTestProbe( 'red', '+', positiveProbeYProperty, {x: 155, y: wireOptions.positive.end.y} ) );
    this.addChild( new ConductivityTestProbe( 'black', '-', negativeProbeYProperty, {x: -30, y: wireOptions.negative.end.y} ) );

    this.translation = conductivityTestModel.location;

    // update wires if end point was changed
    positiveProbeYProperty.link( function( y ) {
      positiveWire.setEndPoint( wireOptions.positive.end.x, y );
    } );
    negativeProbeYProperty.link( function( y ) {
      negativeWire.setEndPoint( wireOptions.negative.end.x, y );
    } );

    // set brightness of light bulb
    var setBrightness = function() {
      lightBulbDarkMask.setOpacity( (isClosedProperty.value ? BRIGHTNESS_TO_ALPHA_FUNCTION_AGAINST_DARK_BACKGROUND( conductivityTestModel.brightnessProperty.value ) : OPACITY_MAX) );
    };
    conductivityTestModel.brightnessProperty.link( setBrightness );
    isClosedProperty.link( setBrightness );

    // visibility observer
    conductivityTestModel.visibleProperty.link( function( visible ) {
      self.setVisible( visible );
    } );
  }

  return inherit( Node, ConductivityTest );
} );
