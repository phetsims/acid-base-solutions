// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the beaker in 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var Vector2 = require( 'DOT/Vector2' );

  function BeakerModel( modelWidth, modelHeight ) {
    // beaker width
    this.width = modelWidth / 1.95;

    // beaker height
    this.height = modelHeight / 1.66;

    // beaker location
    this.location = new Vector2( modelWidth / 3, modelHeight / 1.77 );
  }

  return BeakerModel;
} );