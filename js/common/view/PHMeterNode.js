// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation for pH meter in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
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

  // strings
  var patternLabelValue = require( 'string!ACID_BASE_SOLUTIONS/pattern.0label.1value' );
  var pHString = require( 'string!ACID_BASE_SOLUTIONS/pH' );

  // constants
  var SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
  var DECIMAL_PLACES = 2;
  var FONT = new PhetFont( { size: 15, weight: 'bold' } );
  var TIP_WIDTH = 14;
  var TIP_HEIGHT = 36;
  var SHAFT_WIDTH = 5;
  var SHAFT_HEIGHT = 50;
  var X_MARGIN = 12;
  var Y_MARGIN = 8;

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
   * @param {PHMeter} pHMeter
   * @constructor
   */
  function PHMeterNode( pHMeter ) {

    var self = this;
    Node.call( this, {cursor: 'pointer'} );

    // probe tip: clockwise from tip of probe, origin at upper-left of shape
    var cornerRadius = 4;
    var tipNode = new Path( new Shape()
      .moveTo( TIP_WIDTH / 2, TIP_HEIGHT )
      .lineTo( 0, 0.6 * TIP_HEIGHT )
      .lineTo( 0, cornerRadius )
      .arc( cornerRadius, cornerRadius, cornerRadius, Math.PI, 1.5 * Math.PI )
      .lineTo( cornerRadius, 0 )
      .lineTo( TIP_WIDTH - cornerRadius, 0 )
      .arc( TIP_WIDTH - cornerRadius, cornerRadius, cornerRadius, -0.5 * Math.PI, 0 )
      .lineTo( TIP_WIDTH, 0.6 * TIP_HEIGHT )
      .close(),
      { fill: 'black' }
    );

    // probe shaft
    var shaftNode = new Rectangle( 0, 0, SHAFT_WIDTH, SHAFT_HEIGHT,
      { fill: 'rgb(192,192,192)', stroke: 'rgb(160,160,160)', lineWidth: 0.5 } );

    // text, initialized with widest value for layout
    var textNode = new Text( formatText( ABSConstants.MAX_PH ), {font: FONT, centerX: 34, centerY: 0} );

    // background sized to fit text
    var backgroundNode = new Rectangle( 0, 0, textNode.width + ( 2 * X_MARGIN ), textNode.height + ( 2 * Y_MARGIN ), 5, 5,
      {fill: 'rgb(192,192,192)', stroke: 'rgb(64,64,64)', lineWidth: 1.5} );

    // layout, origin at probe tip
    var overlap = 1; // to hide seams
    tipNode.centerX = shaftNode.centerX = 0;
    tipNode.bottom = 0;
    shaftNode.bottom = tipNode.top + overlap;
    backgroundNode.left = shaftNode.centerX - ( 0.25 * backgroundNode.width );
    backgroundNode.bottom = shaftNode.top + overlap;
    textNode.center = backgroundNode.center;

    // rendering order
    this.addChild( shaftNode );
    this.addChild( tipNode );
    this.addChild( backgroundNode );
    this.addChild( textNode );
    if ( SHOW_ORIGIN ) {
      this.addChild( new Circle( 4, { fill: 'red' } ) );
    }

    // init drag
    var clickYOffset;
    this.addInputListener( new SimpleDragHandler( {
      start: function( e ) {
        // get offset
        clickYOffset = self.globalToParentPoint( e.pointer.point ).y - e.currentTarget.y;
      },
      drag: function( e ) {
        // new y-coordinate
        pHMeter.moveY( self.globalToParentPoint( e.pointer.point ).y - clickYOffset );
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

    pHMeter.visibleProperty.link( function( visible ) {
      self.visible = visible;
    } );
  }

  return inherit( Node, PHMeterNode );
} );
