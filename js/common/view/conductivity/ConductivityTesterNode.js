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

  // imports
  var Circle = require( 'SCENERY/nodes/Circle' );
  var WireNode = require( 'ACID_BASE_SOLUTIONS/common/view/conductivity/WireNode' );
  var ProbeNode = require( 'ACID_BASE_SOLUTIONS/common/view/conductivity/ProbeNode' );
  var LightBulbNode = require( 'ACID_BASE_SOLUTIONS/common/view/conductivity/LightBulbNode' );
  var LightRaysNode = require( 'ACID_BASE_SOLUTIONS/common/view/conductivity/LightRaysNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  // images
  var batteryImage = require( 'image!ACID_BASE_SOLUTIONS/battery.png' );

  // constants
  var SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
  var BULB_TO_BATTERY_WIRE_LENGTH = 40;

  /**
   * @param {ConductivityTester} conductivityTester
   * @constructor
   */
  function ConductivityTesterNode( conductivityTester ) {

    this.conductivityTester = conductivityTester; // @private

    // origin at bottom center of bulb's base
    var lightBulbScale = 0.33;
    var lightBulbNode = new LightBulbNode( conductivityTester.brightnessProperty, { scale: lightBulbScale, centerX: 0, bottom: 0 } );
    var lightBulbRadius = lightBulbNode.radius * lightBulbScale;

    // @private light rays centered on the bulb
    this.raysNode = new LightRaysNode( lightBulbRadius,
      { centerX: lightBulbNode.centerX, y: lightBulbNode.top + ( lightBulbNode.glowYOffset * lightBulbScale ) + lightBulbRadius } );

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
        lightBulbNode
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
  }

  return inherit( Node, ConductivityTesterNode, {

    //@private
    updateBrightness: function() {
      if ( this.visible ) {
        this.raysNode.setBrightness( this.conductivityTester.brightnessProperty.value );
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
