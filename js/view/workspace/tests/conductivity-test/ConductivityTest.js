// Copyright 2002-2014, University of Colorado Boulder

/**
 * Conductivity tester. Light bulb connected to a battery, with draggable probes.
 * When the probes are both immersed in solution, the circuit is completed at
 * the battery glows and emits light rays. The light bulb is made to 'glow' by
 * modulating the opacity of a mask image.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Circle = require( 'SCENERY/nodes/Circle' );
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
  var SHOW_ORIGIN = true; // draws a red circle at the origin, for debugging
  var BULB_TO_BATTERY_WIRE_LENGTH = 40;
  var OPACITY_MAX = 0.15;
  var BRIGHTNESS_TO_OPACITY = new LinearFunction( 0, 1, OPACITY_MAX, 0 ); //
  var BULB_SCALE = 0.33; // scale applied to all bulb images

  function ConductivityTest( conductivityTestModel ) {

    var self = this;
    var wireOptions = conductivityTestModel.getWireOptions();

    Node.call( this );


    // origin at bottom center of bulb's base
    var baseNode = new Image( lightBulbBaseImage,
      { scale: BULB_SCALE, centerX: 0, bottom: 0 } );

    // glass centered above base
    var glassNode = new Image( lightBulbGlassImage,
      { scale: BULB_SCALE, centerX: 0, bottom: baseNode.top } );

    // mask version of the bulb, used to make the bulb 'glow' by modulating opacity
    var lightBulbDarkMask = new Image( lightBulbGlassMaskImage,
      { scale: BULB_SCALE, opacity: OPACITY_MAX, translation: glassNode.translation } );

    // light rays centered on the bulb
    var bulbRadius = glassNode.width / 2;
    var raysNode = new ConductivityTestLightRays( conductivityTestModel.brightnessProperty, conductivityTestModel.isClosedProperty, bulbRadius,
      { centerX: glassNode.centerX, y: glassNode.top + bulbRadius } );

    // wire from bulb base to battery
    var bulbBatteryWire = new Path( new Shape().moveTo( 0, 0 ).lineTo( BULB_TO_BATTERY_WIRE_LENGTH, 0 ), { stroke: 'black', lineWidth: 1.5 } );

    // battery
    var battery = new Image( batteryImage, { scale: 0.6, x: BULB_TO_BATTERY_WIRE_LENGTH, centerY: 0 } )

    // apparatus (bulb + battery), origin at tip of bulb's base
    var apparatusNode = new Node( {
      translation: conductivityTestModel.location,
      children: [
        bulbBatteryWire,
        battery,
        raysNode,
        baseNode,
        glassNode,
        lightBulbDarkMask
      ]} );
    if ( SHOW_ORIGIN ) {
      apparatusNode.addChild( new Circle( 2, { fill: 'red' } ) );
    }

    // wires
    var negativeWire = new ConductivityTestWire( 'negative', wireOptions.negative.start.x, wireOptions.negative.start.y, wireOptions.negative.end.x, wireOptions.negative.end.y );
    var positiveWire = new ConductivityTestWire( 'positive', wireOptions.positive.start.x, wireOptions.positive.start.y, wireOptions.positive.end.x, wireOptions.positive.end.y );

    // probes
    var negativeProbe = new ConductivityTestProbe( conductivityTestModel.negativeProbeLocation, conductivityTestModel.probeDragYRange, { isPositive: false } );
    var positiveProbe = new ConductivityTestProbe( conductivityTestModel.positiveProbeLocation, conductivityTestModel.probeDragYRange, { isPositive: true } );

    // rendering order
    this.addChild( apparatusNode );
    this.addChild( negativeWire );
    this.addChild( positiveWire );
    this.addChild( negativeProbe );
    this.addChild( positiveProbe );

    // update wires if end point was changed
    conductivityTestModel.positiveProbeLocation.link( function( location ) {
      positiveWire.setEndPoint( wireOptions.positive.end.x, location.y );
    } );
    conductivityTestModel.negativeProbeLocation.link( function( location ) {
      negativeWire.setEndPoint( wireOptions.negative.end.x, location.y );
    } );

    // set brightness of light bulb
    var setBrightness = function() {
      lightBulbDarkMask.opacity = ( conductivityTestModel.isClosedProperty.value ? BRIGHTNESS_TO_OPACITY( conductivityTestModel.brightnessProperty.value ) : OPACITY_MAX );
    };
    conductivityTestModel.brightnessProperty.link( setBrightness );
    conductivityTestModel.isClosedProperty.link( setBrightness );

    // visibility observer
    conductivityTestModel.visibleProperty.link( function( visible ) {
      self.setVisible( visible );
    } );
  }

  return inherit( Node, ConductivityTest );
} );
