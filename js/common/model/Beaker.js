// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the beaker in 'Acid-Base Solutions' sim.
 * Origin is at bottom center.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

define( function( require ) {
  'use strict';

  // imports
  var Bounds2 = require( 'DOT/Bounds2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );

  function Beaker( options ) {

    options = _.extend( {
      size: new Dimension2( 400, 300 ),
      location: new Vector2( 265, 440 )
    } );

    this.size = options.size;
    this.location = options.location;

    // convenience coordinates
    this.left = this.location.x - this.size.width / 2;
    this.right = this.left + this.size.width;
    this.bottom = this.location.y;
    this.top = this.bottom - this.size.height;

    this.bounds = new Bounds2( this.left, this.top, this.right, this.bottom );
  }

  Beaker.prototype = {

    // Does the beaker contain {Vector2} point?
    containsPoint: function( point ) {
      return this.bounds.containsPoint( point );
    }
  };

  return Beaker;
} );