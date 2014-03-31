// Copyright 2002-2014, University of Colorado Boulder

/**
 * Light rays in the conductivity tester.
 * Origin is at the center of the light bulb.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    LinearFunction = require( 'DOT/LinearFunction' ),
    Line = require( 'SCENERY/nodes/Line' );

  // constants
  var BRIGHTNESS_TO_INTENSITY_FUNCTION = new LinearFunction( 0, 1, 0, 1 ), // intensity of the light rays
    MIN_RAYS = 8,
    MAX_RAYS = 60,
    MIN_RAY_LENGTH = 0,
    MAX_RAY_LENGTH = 200,
    RAYS_START_ANGLE = 3 * Math.PI / 4,
    RAYS_ARC_ANGLE = 3 * Math.PI / 2,
    RAY_STROKE_BIG = 1.5,
    RAY_STROKE_MEDIUM = 1,
    RAY_STROKE_SMALL = 0.5;

  /**
   * @param {Number} bulbRadius
   * @param {*} options
   * @constructor
   */
  function LightRaysNode( bulbRadius, options ) {

    Node.call( this, options );

    this.bulbRadius = bulbRadius;

    // pre-calculate reusable objects
    this.createCacheLines( MAX_RAYS );
  }

  return inherit( Node, LightRaysNode, {

    // @private
    createCacheLines: function( numberOfLines ) {
      this.cachedLines = [];
      for ( var i = numberOfLines; i--; ) {
        this.cachedLines[i] = new Line( 0, 0, 0, 0, {stroke: 'yellow', lineWidth: 1} );
        this.addChild( this.cachedLines[i] );
      }
    },

    // updates light rays based on brightness, which varies from 0 to 1.
    setBrightness: function( brightness ) {

      var intensity = BRIGHTNESS_TO_INTENSITY_FUNCTION( brightness );

      // number of rays is a function of intensity
      var numberOfRays = ( brightness === 0 )? 0 : MIN_RAYS + Math.round( intensity * ( MAX_RAYS - MIN_RAYS ) );
      // ray length is a function of intensity
      var rayLength = MIN_RAY_LENGTH + ( intensity * ( MAX_RAY_LENGTH - MIN_RAY_LENGTH ) );

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
} );