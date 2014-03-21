// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the strength slider in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' ),
    Range = require( 'DOT/Range' ),
    Util = require( 'DOT/Util' );

  // constants
  var WEAK_STRENGTH_RANGE = require( 'model/Constants/Constants' ).WEAK_STRENGTH_RANGE;

  /**
   * @param {Property<Number>} strengthProperty
   * @param {Property<Boolean>} isWeakProperty
   * @constructor
   */
  function StrengthSliderModel( strengthProperty, isWeakProperty ) {
    var self = this;

    // strength of solution
    this.strength = strengthProperty;

    // range of slider values
    this.range = new Range( Util.log10( WEAK_STRENGTH_RANGE.min ), Util.log10( WEAK_STRENGTH_RANGE.max ), Util.log10( WEAK_STRENGTH_RANGE.defaultValue ) );

    // property for slider's value
    this.sliderValueProperty = new Property( this.range.defaultValue );

    // visibility of slider
    this.visibleProperty = new Property( isWeakProperty.value );

    isWeakProperty.link( function( isWeak ) {
      self.visibleProperty.value = isWeak;
    } );

    this.sliderValueProperty.link( function( value ) {
      self.strength.value = Math.pow( 10, value );
    } );
  }

  StrengthSliderModel.prototype = {
    reset: function() {
      this.sliderValueProperty.reset();
      this.visibleProperty.reset();
    }
  };

  return StrengthSliderModel;
} );