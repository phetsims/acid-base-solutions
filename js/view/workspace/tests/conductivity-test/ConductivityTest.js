// Copyright 2002-2014, University of Colorado Boulder

/**
 * Conductivity tester. Light bulb connected to a battery, with draggable probes.
 * When the probes are both immersed in solution, the circuit is completed at
 * the battery glows and emits light rays. The light bulb is made to 'glow' by
 * modulating the opacity of a mask image.
 * <p>
 * This node assumes that it is located at (0,0), and its components are
 * positioned in the world coordinate frame.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Circle = require( 'SCENERY/nodes/Circle' );
  var ConductivityTestWire = require( 'ACID_BASE_SOLUTIONS/view/workspace/tests/conductivity-test/ConductivityTestWire' );
  var ConductivityTestProbe = require( 'ACID_BASE_SOLUTIONS/view/workspace/tests/conductivity-test/ConductivityTestProbe' );
  var ConductivityTestLightRays = require( 'ACID_BASE_SOLUTIONS/view/workspace/tests/conductivity-test/ConductivityTestLightRays' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  // images
  var batteryImage = require( 'image!ACID_BASE_SOLUTIONS/battery.png' );
  var lightBulbBaseImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-base.png' );
  var lightBulbGlassImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-glass.png' );
  var lightBulbGlassMaskImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-glass-mask.png' );

  // constants
  var SHOW_ORIGIN = true; // draws a red circle at the origin, for debugging
  var BULB_TO_BATTERY_WIRE_LENGTH = 40;
  var OPACITY_MAX = 0.15;
  var BRIGHTNESS_TO_OPACITY = new LinearFunction( 0, 1, OPACITY_MAX, 0 ); //
  var BULB_SCALE = 0.33; // scale applied to all bulb images

  function ConductivityTest( conductivityTestModel ) {

    var self = this;

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
    var battery = new Image( batteryImage, { scale: 0.6, x: BULB_TO_BATTERY_WIRE_LENGTH, centerY: 0 } );

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

    // wire from base of bulb (origin) to negative probe
    var negativeWire = new ConductivityTestWire(
      conductivityTestModel.location.x - 5, conductivityTestModel.location.y - 10,
      conductivityTestModel.negativeProbeLocation.value.x, conductivityTestModel.negativeProbeLocation.value.y - conductivityTestModel.probeSize.height,
      { endPointOnRight: false } );

    // wire from battery terminal to positive probe
    var positiveWire = new ConductivityTestWire(
      battery.getGlobalBounds().right, battery.getGlobalBounds().centerY,
      conductivityTestModel.positiveProbeLocation.value.x, conductivityTestModel.positiveProbeLocation.value.y - conductivityTestModel.probeSize.height,
      { endPointOnRight: true } );

    // probes
    var negativeProbe = new ConductivityTestProbe( conductivityTestModel.negativeProbeLocation, conductivityTestModel.probeDragYRange, conductivityTestModel.probeSize, { isPositive: false } );
    var positiveProbe = new ConductivityTestProbe( conductivityTestModel.positiveProbeLocation, conductivityTestModel.probeDragYRange, conductivityTestModel.probeSize, { isPositive: true } );

    Node.call( this, { children: [ negativeWire, positiveWire, negativeProbe, positiveProbe, apparatusNode ] } );

    // update wires if end point was changed
    conductivityTestModel.positiveProbeLocation.link( function( location ) {
      positiveWire.setEndPoint( location.x, location.y - conductivityTestModel.probeSize.height );
    } );
    conductivityTestModel.negativeProbeLocation.link( function( location ) {
      negativeWire.setEndPoint( location.x, location.y - conductivityTestModel.probeSize.height );
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
