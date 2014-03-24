// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the beaker in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );

  function Beaker( options ) {

    options = _.extend( {
      size: new Dimension2( 400, 300 ),
      location: new Vector2( 265, 440 )
    } );

    this.width = options.size.width;
    this.height = options.size.height;
    this.location = options.location;
  }

  return Beaker;
} );