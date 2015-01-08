// Copyright 2002-2014, University of Colorado Boulder

/**
 * Conductivity tester. Light bulb connected to a battery, with draggable probes.
 * When the probes are both immersed in solution, the circuit is completed, and the bulb glows.
 * <p>
 * This node assumes that it is located at (0,0), and its components are
 * positioned in the world coordinate frame.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var WireNode = require( 'ACID_BASE_SOLUTIONS/common/view/conductivity/WireNode' );
  var ProbeNode = require( 'ACID_BASE_SOLUTIONS/common/view/conductivity/ProbeNode' );
  var LightBulbNode = require( 'ACID_BASE_SOLUTIONS/common/view/conductivity/LightBulbNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Util = require( 'DOT/Util' );

  // images
  var batteryImage = require( 'image!ACID_BASE_SOLUTIONS/battery.png' );

  // constants
  var SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
  var BULB_TO_BATTERY_WIRE_LENGTH = 40;
  var LIGHT_BULB_SCALE = 0.33;

  /**
   * @param {ConductivityTester} conductivityTester
   * @constructor
   */
  function ConductivityTesterNode( conductivityTester ) {

    this.conductivityTester = conductivityTester; // @private

    // @private origin at bottom center of bulb's base
    this.lightBulbNode = new LightBulbNode( conductivityTester.brightnessProperty, {
      scale: LIGHT_BULB_SCALE,
      centerX: 0,
      bottom: 0
    } );

    // wire from bulb base to battery
    var bulbBatteryWire = new Path( new Shape().moveTo( 0, 0 ).lineTo( BULB_TO_BATTERY_WIRE_LENGTH, 0 ), {
      stroke: 'black',
      lineWidth: 1.5
    } );

    // battery
    var battery = new Image( batteryImage, {
      scale: 0.6,
      x: BULB_TO_BATTERY_WIRE_LENGTH,
      centerY: 0
    } );

    // apparatus (bulb + battery), origin at tip of bulb's base
    var apparatusNode = new Node( {
      translation: conductivityTester.bulbLocation,
      children: [
        bulbBatteryWire,
        battery,
        this.lightBulbNode
      ]} );
    if ( SHOW_ORIGIN ) {
      apparatusNode.addChild( new Circle( 2, { fill: 'red' } ) );
    }

    // wire from base of bulb (origin) to negative probe
    var negativeWire = new WireNode(
      conductivityTester.bulbLocation.x - 5, conductivityTester.bulbLocation.y - 10,
      conductivityTester.negativeProbeX, conductivityTester.probeYProperty.value - conductivityTester.probeSize.height );

    // wire from battery terminal to positive probe
    var positiveWire = new WireNode(
      battery.getGlobalBounds().right, battery.getGlobalBounds().centerY,
      conductivityTester.positiveProbeX, conductivityTester.probeYProperty.value - conductivityTester.probeSize.height );

    // probes, share one drag handler so that both probes can't be dragged simultaneously
    var probeDragHandler = new SimpleDragHandler( {

      clickYOffset: 0,

      start: function( e ) {
        this.clickYOffset = e.currentTarget.globalToParentPoint( e.pointer.point ).y - e.currentTarget.y;
      },

      drag: function( e ) {
        var y = e.currentTarget.globalToParentPoint( e.pointer.point ).y - this.clickYOffset;
        conductivityTester.probeYProperty.value = Util.clamp( y, conductivityTester.probeDragYRange.min, conductivityTester.probeDragYRange.max );
      }
    } );
    var negativeProbe = new ProbeNode( conductivityTester.probeSize, conductivityTester.probeYProperty, probeDragHandler,
      { x: conductivityTester.negativeProbeX, isPositive: false } );
    var positiveProbe = new ProbeNode( conductivityTester.probeSize, conductivityTester.probeYProperty, probeDragHandler,
      { x: conductivityTester.positiveProbeX, isPositive: true } );

    Node.call( this, { children: [ negativeWire, positiveWire, negativeProbe, positiveProbe, apparatusNode ] } );

    // @private update wires if end point was changed
    this.probeYObserver = function( probeY ) {
      positiveWire.setEndPoint( conductivityTester.positiveProbeX, probeY - conductivityTester.probeSize.height );
      negativeWire.setEndPoint( conductivityTester.negativeProbeX, probeY - conductivityTester.probeSize.height );
    };
    this.probeYProperty = conductivityTester.probeYProperty; // @private
    this.probeYProperty.link( this.probeYObserver );
  }

  return inherit( Node, ConductivityTesterNode, {

    // Ensures that this object is eligible for GC
    dispose: function() {
      this.probeYProperty.unlink( this.probeYObserver );
      this.lightBulbNode.dispose();
      this.lightBulbNode = null;
    },

    // @override
    setVisible: function( visible ) {
      Node.prototype.setVisible.call( this, visible );
      this.lightBulbNode.visible = visible; // to prevent light from updating when invisible
    }
  } );
} );
