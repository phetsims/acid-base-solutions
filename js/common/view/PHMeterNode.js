// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation for pH meter in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var patternLabelValue = require( 'string!ACID_BASE_SOLUTIONS/pattern.0label.1value' );
  var pHString = require( 'string!ACID_BASE_SOLUTIONS/pH' );

  // constants
  var SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
  var DECIMAL_PLACES = 2;
  var FONT = new PhetFont( { size: 15, weight: 'bold' } );
  var X_MARGIN = 12;
  var Y_MARGIN = 8;
  var BACKGROUND_FILL = 'rgb(225,225,225)';
  var BACKGROUND_STROKE = 'rgb(64,64,64)';

  // format a pH value for display.
  var formatText = function( pH ) {
    if ( pH === null ) {
      return StringUtils.format( patternLabelValue, pHString, '' );
    }
    else {
      return StringUtils.format( patternLabelValue, pHString, Util.toFixed( pH, DECIMAL_PLACES ) );
    }
  };

  /**
   * pH Probe, consists of a shaft attached to a tip.
   * @param {number} shaftWidth
   * @param {number} shaftHeight
   * @param {number} tipWidth
   * @param {number} tipHeight
   * @constructor
   */
  function ProbeNode( shaftWidth, shaftHeight, tipWidth, tipHeight ) {

    var overlap = 1; // overlap, to hide seam

    // probe shaft
    var shaftNode = new Rectangle( 0, 0, shaftWidth, shaftHeight + overlap,
      { fill: 'rgb(192,192,192)', stroke: 'rgb(160,160,160)', lineWidth: 0.5 } );

    // probe tip: clockwise from tip of probe, origin at upper-left of shape
    var cornerRadius = tipHeight / 9;
    var tipNode = new Path( new Shape()
        .moveTo( tipWidth / 2, tipHeight )
        .lineTo( 0, 0.6 * tipHeight )
        .lineTo( 0, cornerRadius )
        .arc( cornerRadius, cornerRadius, cornerRadius, Math.PI, 1.5 * Math.PI )
        .lineTo( cornerRadius, 0 )
        .lineTo( tipWidth - cornerRadius, 0 )
        .arc( tipWidth - cornerRadius, cornerRadius, cornerRadius, -0.5 * Math.PI, 0 )
        .lineTo( tipWidth, 0.6 * tipHeight )
        .close(),
      { fill: 'black', centerX: shaftNode.centerX, top: shaftNode.bottom - overlap }
    );

    Node.call( this, { children: [ shaftNode, tipNode ] } );
  }

  inherit( Node, ProbeNode );

  /**
   * @param {PHMeter} pHMeter
   * @constructor
   */
  function PHMeterNode( pHMeter ) {

    var self = this;
    Node.call( this, { cursor: 'pointer' } );

    // probe
    var probeNode = new ProbeNode( 5, 50, 14, 36 );

    // text, initialized with widest value for layout
    var textNode = new Text( formatText( ABSConstants.PH_RANGE.max ), { font: FONT, centerX: 34, centerY: 0 } );

    // background sized to fit text
    var backgroundNode = new Rectangle( 0, 0, textNode.width + ( 2 * X_MARGIN ), textNode.height + ( 2 * Y_MARGIN ), 5, 5,
      { fill: BACKGROUND_FILL, stroke: BACKGROUND_STROKE, lineWidth: 1.5 } );

    // layout, origin at probe tip
    probeNode.centerX = 0;
    probeNode.bottom = 0;
    backgroundNode.left = probeNode.centerX - ( 0.25 * backgroundNode.width );
    backgroundNode.bottom = probeNode.top + 1; // hide seam
    textNode.center = backgroundNode.center;

    // rendering order
    this.addChild( probeNode );
    this.addChild( backgroundNode );
    this.addChild( textNode );
    if ( SHOW_ORIGIN ) {
      this.addChild( new Circle( 2, { fill: 'red' } ) );
    }

    // Constrained dragging
    this.addInputListener( new SimpleDragHandler( {

      clickYOffset: 0,

      start: function( e ) {
        this.clickYOffset = self.globalToParentPoint( e.pointer.point ).y - e.currentTarget.y;
      },

      drag: function( e ) {
        var y = self.globalToParentPoint( e.pointer.point ).y - this.clickYOffset;
        pHMeter.locationProperty.value = new Vector2( pHMeter.locationProperty.value.x, Util.clamp( y, pHMeter.dragYRange.min, pHMeter.dragYRange.max ) );
      }
    } ) );

    var updateText = function() {
      textNode.text = pHMeter.inSolution() ? formatText( pHMeter.pHProperty.value ) : formatText( null );
    };
    pHMeter.pHProperty.link( updateText.bind( this ) );
    pHMeter.locationProperty.link( updateText.bind( this ) );

    pHMeter.locationProperty.link( function( location ) {
      self.translation = location;
    } );
  }

  return inherit( Node, PHMeterNode, {}, {

    /**
     * Creates an icon for the pH meter.
     * @static
     * @return {Node}
     */
    createIcon: function() {
      var probeNode = new ProbeNode( 2, 10, 5, 12 );
      var backgroundNode = new Rectangle( 0, 0, 30, 10, 2, 2, {
        fill: BACKGROUND_FILL,
        stroke: BACKGROUND_STROKE,
        lineWidth: 0.5,
        left:   probeNode.centerX - 7,
        bottom: probeNode.top + 1
      } );
      return new Node( { children: [ probeNode, backgroundNode ] } );
    }
  } );
} );
