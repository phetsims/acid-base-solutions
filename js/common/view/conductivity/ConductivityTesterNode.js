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
  var SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
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

    this.conductivityTester = conductivityTester; // @private

    // origin at bottom center of bulb's base
    var baseNode = new Image( lightBulbBaseImage,
      { scale: BULB_SCALE, centerX: 0, bottom: 0 } );

    // @private glass centered above base
    this.glassNode = new Image( lightBulbGlassImage,
      { scale: BULB_SCALE, centerX: 0, bottom: baseNode.top } );
    var bulbRadius = this.glassNode.width / 2;

    // mask that sits behind the glass
    var glassMaskNode = new Image( lightBulbGlassMaskImage,
      { scale: BULB_SCALE, translation: this.glassNode.translation } );

    // @private light rays centered on the bulb
    this.raysNode = new LightRaysNode( bulbRadius,
      { centerX: this.glassNode.centerX, y: this.glassNode.top + bulbRadius } );

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
        this.raysNode,
        baseNode,
        glassMaskNode,
        this.glassNode
      ]} );
    if ( SHOW_ORIGIN ) {
      apparatusNode.addChild( new Circle( 2, { fill: 'red' } ) );
    }

    // wire from base of bulb (origin) to negative probe
    var negativeWire = new WireNode(
      conductivityTester.location.x - 5, conductivityTester.location.y - 10,
      conductivityTester.negativeProbeLocationProperty.value.x, conductivityTester.negativeProbeLocationProperty.value.y - conductivityTester.probeSize.height );

    // wire from battery terminal to positive probe
    var positiveWire = new WireNode(
      battery.getGlobalBounds().right, battery.getGlobalBounds().centerY,
      conductivityTester.positiveProbeLocationProperty.value.x, conductivityTester.positiveProbeLocationProperty.value.y - conductivityTester.probeSize.height );

    // probes
    var negativeProbe = new ProbeNode( conductivityTester.negativeProbeLocationProperty, conductivityTester.probeDragYRange, conductivityTester.probeSize, { isPositive: false } );
    var positiveProbe = new ProbeNode( conductivityTester.positiveProbeLocationProperty, conductivityTester.probeDragYRange, conductivityTester.probeSize, { isPositive: true } );

    Node.call( this, { children: [ negativeWire, positiveWire, negativeProbe, positiveProbe, apparatusNode ] } );

    // update wires if end point was changed
    conductivityTester.positiveProbeLocationProperty.link( function( location ) {
      positiveWire.setEndPoint( location.x, location.y - conductivityTester.probeSize.height );
    } );
    conductivityTester.negativeProbeLocationProperty.link( function( location ) {
      negativeWire.setEndPoint( location.x, location.y - conductivityTester.probeSize.height );
    } );

    conductivityTester.brightnessProperty.link( this.updateBrightness.bind( this ) );
    conductivityTester.isClosedProperty.link( this.updateBrightness.bind( this ) );
  }

  return inherit( Node, ConductivityTesterNode, {

    //@private
    updateBrightness: function() {
      if ( this.visible ) {
        // make the glass glow by changing its opacity
        this.glassNode.opacity = ( this.conductivityTester.isClosedProperty.value ? BRIGHTNESS_TO_OPACITY( this.conductivityTester.brightnessProperty.value ) : MIN_OPACITY );
        // adjust light rays
        this.raysNode.setBrightness( this.conductivityTester.isClosedProperty.value ? this.conductivityTester.brightnessProperty.value : 0 );
      }
    },

    //@override update when this node becomes visible
    setVisible: function( visible ) {
      var wasVisible = this.visible;
      Node.prototype.setVisible.call( this, visible );
      if ( !wasVisible && visible ) {
          this.updateBrightness();
      }
    }
  } );
} );
