// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the concentration slider in 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // constants
  var CONSTANTS = require( 'model/Constants/Constants' );

  function ConcentrationSliderModel( concentrationProperty ) {
    // concentration of solution
    this.concentration = concentrationProperty;

    // range of slider
    this.range = CONSTANTS.CONCENTRATION_RANGE;
  }

  return ConcentrationSliderModel;
} );