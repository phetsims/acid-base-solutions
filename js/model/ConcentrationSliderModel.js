// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the concentration slider in 'Acid-Base Solutions' sim.
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
  var CONCENTRATION_RANGE = require( 'model/Constants/Constants' ).CONCENTRATION_RANGE;

  /**
   * @param {Property<Number>} concentrationProperty
   * @constructor
   */
  function ConcentrationSliderModel( concentrationProperty ) {
    var self = this;

    //TODO add Property suffix
    // concentration of solution
    this.concentrationProperty = concentrationProperty;

    // range of slider
    this.range = new Range( Util.log10( CONCENTRATION_RANGE.min ), Util.log10( CONCENTRATION_RANGE.max ), Util.log10( CONCENTRATION_RANGE.defaultValue ) );

    // concentration step for arrow button
    this.arrowStep = 0.1;

    // property for slider value
    this.sliderValueProperty = new Property( this.range.defaultValue );

    this.sliderValueProperty.link( function( value ) {
      self.concentrationProperty.value = Math.pow( 10, value );
    } );
  }

  ConcentrationSliderModel.prototype = {
    reset: function() {
      this.sliderValueProperty.reset();
    }
  };

  return ConcentrationSliderModel;
} );