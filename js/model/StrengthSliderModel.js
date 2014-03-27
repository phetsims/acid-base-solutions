// Copyright 2002-2014, University of Colorado Boulder

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
    ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' ),
    Util = require( 'DOT/Util' );

  // constants
  var WEAK_STRENGTH_RANGE = ABSConstants.WEAK_STRENGTH_RANGE;

  /**
   * @param {Property<Number>} strengthProperty
   * @param {Property<Boolean>} isWeakProperty
   * @constructor
   */
  function StrengthSliderModel( strengthProperty, isWeakProperty ) {
    var self = this;

    // strength of solution
    this.strengthProperty = strengthProperty;

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
      self.strengthProperty.value = Math.pow( 10, value );
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