// Copyright 2002-2014, University of Colorado Boulder

/**
 * Light bulb, made to 'glow' by modulating opacity of the 'on' image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Util = require( 'DOT/Util' );

  // images
  var onImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-on.png' );
  var offImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-off.png' );

  // constants
  var BULB_IMAGE_SCALE = 0.33;
  var MIN_RAYS = 8;
  var MAX_RAYS = 60;
  var MIN_RAY_LENGTH = 0;
  var MAX_RAY_LENGTH = 200;
  var RAYS_START_ANGLE = 3 * Math.PI / 4;
  var RAYS_ARC_ANGLE = 3 * Math.PI / 2;
  var RAY_STROKE_BIG = 1.5;
  var RAY_STROKE_MEDIUM = 1;
  var RAY_STROKE_SMALL = 0.5;

  /**
   * @param {Property.<number>} brightnessProperty 0 (off) to 1 (full brightness)
   * @param {Object} [options]
   * @constructor
   */
  function LightBulbNode( brightnessProperty, options ) {

    options = _.extend( {
      //TODO
    }, options );

    var thisNode = this;

    thisNode.onNode = new Image( onImage, { scale: BULB_IMAGE_SCALE } );

    var offNode = new Image( offImage, {
      scale: BULB_IMAGE_SCALE,
      centerX: thisNode.onNode.centerX,
      bottom: thisNode.onNode.bottom
    } );

    var bulbRadius = offNode.width / 2; // use 'off' node, the 'on' node is wider because it has a glow around it.

    // @private
    thisNode.raysNode = new LightRaysNode( bulbRadius, {
      x: this.onNode.centerX,
      y: offNode.top + bulbRadius
    } );

    options.children = [ thisNode.raysNode, offNode, thisNode.onNode ];
    Node.call( thisNode, options );

    thisNode.brightnessObserver = function( brightness ) { thisNode.update(); };
    thisNode.brightnessProperty = brightnessProperty; // @private
    thisNode.brightnessProperty.link( this.brightnessObserver );
  }

  inherit( Node, LightBulbNode, {

    // Ensures that this object is eligible for GC
    dispose: function() {
      this.brightnessProperty.unlink( this.brightnessObserver );
    },

    // @private
    update: function() {
      if ( this.visible ) {
        var brightness = this.brightnessProperty.value;
        this.onNode.visible = ( brightness > 0 );
        if ( this.onNode.visible ) {
          this.onNode.opacity = Util.linear( 0, 1, 0.3, 1, brightness );
        }
        this.raysNode.setBrightness( brightness );
      }
    },

    // @override update when this node becomes visible
    setVisible: function( visible ) {
      var wasVisible = this.visible;
      Node.prototype.setVisible.call( this, visible );
      if ( !wasVisible && visible ) {
        this.update();
      }
    }
  } );

  /**
   * Rays of light that come out of the light bulb.
   * @param {number} bulbRadius
   * @param {Object} [options]
   * @constructor
   */
  function LightRaysNode( bulbRadius, options ) {

    Node.call( this, options );

    this.bulbRadius = bulbRadius; //@private

    // @private pre-calculate reusable rays (lines)
    this.cachedLines = [];
    for ( var i = MAX_RAYS; i--; ) {
      this.cachedLines[i] = new Line( 0, 0, 0, 0, { stroke: 'yellow', lineWidth: 1 } );
      this.addChild( this.cachedLines[i] );
    }
  }

  inherit( Node, LightRaysNode, {

    // updates light rays based on brightness, which varies from 0 to 1.
    setBrightness: function( brightness ) {

      // number of rays is a function of brightness
      var numberOfRays = ( brightness === 0 ) ? 0 : MIN_RAYS + Math.round( brightness * ( MAX_RAYS - MIN_RAYS ) );
      // ray length is a function of brightness
      var rayLength = MIN_RAY_LENGTH + ( brightness * ( MAX_RAY_LENGTH - MIN_RAY_LENGTH ) );

      var angle = RAYS_START_ANGLE;
      var deltaAngle = RAYS_ARC_ANGLE / ( numberOfRays - 1 );
      var lineWidth;

      // Pick one of 3 pre-allocated ray widths.
      lineWidth = RAY_STROKE_SMALL;
      if ( rayLength > ( MAX_RAY_LENGTH * 0.6 ) ) {
        lineWidth = RAY_STROKE_BIG;
      }
      else if ( rayLength > ( MAX_RAY_LENGTH * 0.3 ) ) {
        lineWidth = RAY_STROKE_MEDIUM;
      }

      // rays fill part of a circle, incrementing clockwise
      for ( var i = 0, x1, x2, y1, y2; i < MAX_RAYS; i++ ) {
        if ( i < numberOfRays ) {
          // determine the end points of the ray
          x1 = Math.cos( angle ) * this.bulbRadius;
          y1 = Math.sin( angle ) * this.bulbRadius;
          x2 = Math.cos( angle ) * ( this.bulbRadius + rayLength );
          y2 = Math.sin( angle ) * ( this.bulbRadius + rayLength );

          // set properties of line from the cache
          this.cachedLines[i].setVisible( true );
          this.cachedLines[i].setLine( x1, y1, x2, y2 );
          this.cachedLines[i].setLineWidth( lineWidth );

          // increment the angle
          angle += deltaAngle;
        }
        else {
          // hide unusable lined
          this.cachedLines[i].setVisible( false );
        }
      }
    }
  } );

  return LightBulbNode;
} );
