// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the strength slider in 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' ),

  // constants
    CONSTANTS = require( 'model/Constants/Constants' );

  function StrengthSliderModel( strengthProperty, isWeakProperty ) {
    var self = this;

    // strength of solution
    this.strength = strengthProperty;

    // range of slider
    this.range = CONSTANTS.WEAK_STRENGTH_RANGE;

    // visibility of slider
    this.visibility = new Property( isWeakProperty.get() );

    isWeakProperty.link( function( isWeak ) {
      self.visibility.value = isWeak;
    } );
  }

  return StrengthSliderModel;
} );