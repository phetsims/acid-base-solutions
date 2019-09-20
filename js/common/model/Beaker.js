// Copyright 2014-2019, University of Colorado Boulder

/**
 * Model for the beaker in 'Acid-Base Solutions' sim.
 * Origin is at bottom center.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Beaker( options ) {

    options = _.extend( {
      size: new Dimension2( 360, 270 ),
      location: new Vector2( 230, 410 )
    }, options );

    this.size = options.size; // @public
    this.location = options.location; // @public

    // @public convenience coordinates
    this.left = this.location.x - this.size.width / 2;
    this.right = this.left + this.size.width;
    this.bottom = this.location.y;
    this.top = this.bottom - this.size.height;

    this.bounds = new Bounds2( this.left, this.top, this.right, this.bottom ); // @public
  }

  acidBaseSolutions.register( 'Beaker', Beaker );

  return Beaker;
} );