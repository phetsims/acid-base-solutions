// Copyright 2002-2014, University of Colorado Boulder

/**
 * Conductivity tester. Light bulb connected to a battery, with draggable probes.
 * When the probes are both immersed in solution, the circuit is completed, and the bulb glows.
 * This node assumes that it is located at (0,0), and its components are positioned in the world coordinate frame.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LightBulbNode = require( 'SCENERY_PHET/LightBulbNode' );
  var MinusNode = require( 'SCENERY_PHET/MinusNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PlusNode = require( 'SCENERY_PHET/PlusNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Util = require( 'DOT/Util' );

  // images
  var batteryImage = require( 'image!ACID_BASE_SOLUTIONS/battery.png' );

  // constants
  var SHOW_TESTER_ORIGIN = false; // draws a red circle at the tester's origin, for debugging
  var SHOW_PROBE_ORIGIN = false; // draws a red circle at the origin of probes, for debugging
  var BULB_TO_BATTERY_WIRE_LENGTH = 40;

  // constructor options and their default values
  var DEFAULT_OPTIONS = {
    // wires
    wireStroke: 'black',
    wireLineWidth: 1.5,
    // common to both probes
    probeCursor: 'pointer',
    probeLineWidth: 0.5,
    // positive probe
    positiveProbeFill: 'red',
    positiveProbeStroke: 'black',
    positiveLabelFill: 'white',
    // negative probe
    negativeProbeFill: 'black',
    negativeProbeStroke: 'black',
    negativeLabelFill: 'white'
  };

  /**
   * @param {ConductivityTester} conductivityTester
   * @constructor
   */
  function ConductivityTesterNode( conductivityTester, options ) {

    options = _.extend( DEFAULT_OPTIONS, options );

    this.conductivityTester = conductivityTester; // @private

    // @private bulb, origin at bottom center of base
    this.lightBulbNode = new LightBulbNode( conductivityTester.brightnessProperty, {
      centerX: 0,
      bottom: 0
    } );

    // battery
    var battery = new Image( batteryImage, {
      scale: 0.6,
      x: BULB_TO_BATTERY_WIRE_LENGTH,
      centerY: 0
    } );

    // wire from bulb base to battery
    var bulbBatteryWire = new Path( new Shape().moveTo( 0, 0 ).lineTo( BULB_TO_BATTERY_WIRE_LENGTH, 0 ), {
      stroke: options.wireStroke,
      lineWidth: options.wireLineWidth
    } );

    // apparatus (bulb + battery), origin at tip of bulb's base
    var apparatusNode = new Node( {
      translation: conductivityTester.bulbLocation,
      children: [
        bulbBatteryWire,
        battery,
        this.lightBulbNode
      ]} );
    if ( SHOW_TESTER_ORIGIN ) {
      apparatusNode.addChild( new Circle( 2, { fill: 'red' } ) );
    }

    // wire from base of bulb (origin) to negative probe
    var negativeWire = new WireNode(
        conductivityTester.bulbLocation.x - 5, conductivityTester.bulbLocation.y - 10,
      conductivityTester.negativeProbeX, conductivityTester.probeYProperty.value - conductivityTester.probeSize.height,
      { stroke: options.wireStroke, lineWidth: options.wireLineWidth } );

    // wire from battery terminal to positive probe
    var positiveWire = new WireNode(
      battery.getGlobalBounds().right, battery.getGlobalBounds().centerY,
      conductivityTester.positiveProbeX, conductivityTester.probeYProperty.value - conductivityTester.probeSize.height,
      { stroke: options.wireStroke, lineWidth: options.wireLineWidth });

    // drag handler for probes, so that both probes can't be dragged simultaneously
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

    // probes
    var negativeProbe = new ProbeNode( conductivityTester.probeSize, probeDragHandler, new MinusNode( { fill: options.negativeLabelFill } ), {
      fill: options.negativeProbeFill,
      stroke: options.negativeProbeStroke,
      lineWidth: options.probeLineWidth,
      cursor: options.probeCursor,
      x: conductivityTester.negativeProbeX
    } );
    var positiveProbe = new ProbeNode( conductivityTester.probeSize, probeDragHandler, new PlusNode( { fill: options.positiveLabelFill } ), {
      fill: options.positiveProbeFill,
      stroke: options.positiveProbeStroke,
      lineWidth: options.probeLineWidth,
      cursor: options.probeCursor,
      x: conductivityTester.positiveProbeX
    } );

    Node.call( this, { children: [ negativeWire, positiveWire, negativeProbe, positiveProbe, apparatusNode ] } );

    // @private update wires if end point was changed
    this.probeYObserver = function( probeY ) {
      negativeProbe.y = positiveProbe.y = probeY;
      negativeWire.setEndPoint( conductivityTester.negativeProbeX, probeY - conductivityTester.probeSize.height );
      positiveWire.setEndPoint( conductivityTester.positiveProbeX, probeY - conductivityTester.probeSize.height );
    };
    this.probeYProperty = conductivityTester.probeYProperty; // @private
    this.probeYProperty.link( this.probeYObserver );
  }

  inherit( Node, ConductivityTesterNode, {

    // Ensures that this object is eligible for GC
    dispose: function() {

      // unlink from axon properties
      this.probeYProperty.unlink( this.probeYObserver );

      // dispose of sub-components
      this.lightBulbNode.dispose();
      this.lightBulbNode = null;
    },

    // @override
    setVisible: function( visible ) {
      Node.prototype.setVisible.call( this, visible );
      this.lightBulbNode.visible = visible; // to prevent light from updating when invisible
    }
  } );

  /**
   * Conductivity probe.
   *
   * @param {Dimension2} probeSize
   * @param {SimpleDragHandler} probeDragHandler
   * @param {Node} labelNode
   * @param {Object} [options]
   * @constructor
   */
  function ProbeNode( probeSize, probeDragHandler, labelNode, options ) {

    options = _.extend( {
      isPositive: true,
      fill: 'white',
      stroke: 'black',
      lineWidth: 1.5,
      cursor: 'pointer'
    }, options );

    Node.call( this );

    // plate
    var plateNode = new Rectangle( -probeSize.width / 2, -probeSize.height, probeSize.width, probeSize.height, {
      fill: options.fill,
      stroke: options.stroke,
      lineWidth: options.lineWidth
    } );

    // scale the label to fix, place it towards bottom center
    labelNode.setScaleMagnitude( 0.5 * probeSize.width / labelNode.width );
    labelNode.centerX = plateNode.centerX;
    labelNode.bottom = plateNode.bottom - 10;

    // rendering order
    this.addChild( plateNode );
    this.addChild( labelNode );
    if ( SHOW_PROBE_ORIGIN ) {
      this.addChild( new Circle( 2, { fill: 'red' } ) );
    }

    // expand touch area
    this.touchArea = this.localBounds.dilatedXY( 10, 10 );

    // interactivity
    this.addInputListener( probeDragHandler );

    this.mutate( options );
  }

  inherit( Node, ProbeNode );

  /**
   * Wires that connect to the probes.
   *
   * @param startX
   * @param startY
   * @param endX
   * @param endY
   * @param {Object} [options]
   * @constructor
   */
  function WireNode( startX, startY, endX, endY, options ) {

    Path.call( this );

    this.startPoint = { x: startX, y: startY }; // @private
    // control point offsets for when probe is to left of light bulb
    this.controlPointOffset = { x: 30, y: -50 }; // @private
    if ( endX < startX ) {
      // probe is to right of light bulb, flip sign on control point x-offset
      this.controlPointOffset.x = -this.controlPointOffset.x;
    }

    this.setEndPoint( endX, endY );

    this.mutate( options );
  }

  inherit( Path, WireNode, {

    // Sets the end point coordinates, the point attached to the probe.
    setEndPoint: function( endX, endY ) {

      var startX = this.startPoint.x;
      var startY = this.startPoint.y;
      var controlPointXOffset = this.controlPointOffset.x;
      var controlPointYOffset = this.controlPointOffset.y;

      this.setShape( new Shape()
          .moveTo( startX, startY )
          .cubicCurveTo( startX + controlPointXOffset, startY, endX, endY + controlPointYOffset, endX, endY )
      );
    }
  } );

  return ConductivityTesterNode;
} );
