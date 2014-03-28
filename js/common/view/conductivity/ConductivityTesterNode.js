// Copyright 2002-2014, University of Colorado Boulder

/**
 * Conductivity tester. Light bulb connected to a battery, with draggable probes.
 * When the probes are both immersed in solution, the circuit is completed at
 * the battery glows and emits light rays. The light bulb is made to 'glow' by
 * modulating the opacity of the bulb.
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
  var WireNode = require( 'ACID_BASE_SOLUTIONS/common/view/conductivity/WireNode' );
  var ProbeNode = require( 'ACID_BASE_SOLUTIONS/common/view/conductivity/ProbeNode' );
  var LightRaysNode = require( 'ACID_BASE_SOLUTIONS/common/view/conductivity/LightRaysNode' );
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
  var MIN_OPACITY = 0.85;
  var BRIGHTNESS_TO_OPACITY = new LinearFunction( 0, 1, MIN_OPACITY, 1 );
  var BULB_SCALE = 0.33; // scale applied to all bulb images

  /**
   * @param {ConductivityTester} conductivityTester
   * @constructor
   */
  function ConductivityTesterNode( conductivityTester ) {

    var self = this;

    // origin at bottom center of bulb's base
    var baseNode = new Image( lightBulbBaseImage,
      { scale: BULB_SCALE, centerX: 0, bottom: 0 } );

    // glass centered above base
    var glassNode = new Image( lightBulbGlassImage,
      { scale: BULB_SCALE, centerX: 0, bottom: baseNode.top } );

    // mask that sits behind the glass
    var glassMaskNode = new Image( lightBulbGlassMaskImage,
      { scale: BULB_SCALE, translation: glassNode.translation } );

    // light rays centered on the bulb
    var bulbRadius = glassNode.width / 2;
    var raysNode = new LightRaysNode( conductivityTester.brightnessProperty, conductivityTester.isClosedProperty, bulbRadius,
      { centerX: glassNode.centerX, y: glassNode.top + bulbRadius } );

    // wire from bulb base to battery
    var bulbBatteryWire = new Path( new Shape().moveTo( 0, 0 ).lineTo( BULB_TO_BATTERY_WIRE_LENGTH, 0 ), { stroke: 'black', lineWidth: 1.5 } );

    // battery
    var battery = new Image( batteryImage, { scale: 0.6, x: BULB_TO_BATTERY_WIRE_LENGTH, centerY: 0 } );

    // apparatus (bulb + battery), origin at tip of bulb's base
    var apparatusNode = new Node( {
      translation: conductivityTester.location,
      children: [
        bulbBatteryWire,
        battery,
        raysNode,
        baseNode,
        glassMaskNode,
        glassNode
      ]} );
    if ( SHOW_ORIGIN ) {
      apparatusNode.addChild( new Circle( 2, { fill: 'red' } ) );
    }

    // wire from base of bulb (origin) to negative probe
    var negativeWire = new WireNode(
      conductivityTester.location.x - 5, conductivityTester.location.y - 10,
      conductivityTester.negativeProbeLocation.value.x, conductivityTester.negativeProbeLocation.value.y - conductivityTester.probeSize.height );

    // wire from battery terminal to positive probe
    var positiveWire = new WireNode(
      battery.getGlobalBounds().right, battery.getGlobalBounds().centerY,
      conductivityTester.positiveProbeLocation.value.x, conductivityTester.positiveProbeLocation.value.y - conductivityTester.probeSize.height );

    // probes
    var negativeProbe = new ProbeNode( conductivityTester.negativeProbeLocation, conductivityTester.probeDragYRange, conductivityTester.probeSize, { isPositive: false } );
    var positiveProbe = new ProbeNode( conductivityTester.positiveProbeLocation, conductivityTester.probeDragYRange, conductivityTester.probeSize, { isPositive: true } );

    Node.call( this, { children: [ negativeWire, positiveWire, negativeProbe, positiveProbe, apparatusNode ] } );

    // update wires if end point was changed
    conductivityTester.positiveProbeLocation.link( function( location ) {
      positiveWire.setEndPoint( location.x, location.y - conductivityTester.probeSize.height );
    } );
    conductivityTester.negativeProbeLocation.link( function( location ) {
      negativeWire.setEndPoint( location.x, location.y - conductivityTester.probeSize.height );
    } );

    // make the glass glow by changing its opacity
    var setBrightness = function() {
      glassNode.opacity = ( conductivityTester.isClosedProperty.value ? BRIGHTNESS_TO_OPACITY( conductivityTester.brightnessProperty.value ) : MIN_OPACITY );
    };
    conductivityTester.brightnessProperty.link( setBrightness );
    conductivityTester.isClosedProperty.link( setBrightness );

    // visibility observer
    conductivityTester.visibleProperty.link( function( visible ) {
      self.setVisible( visible );
    } );
  }

  return inherit( Node, ConductivityTesterNode );
} );
