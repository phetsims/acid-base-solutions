// Copyright 2002-2013, University of Colorado Boulder

/**
 * Constants for simulation 'Acid Base Solutions'.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  var Range = require( 'DOT/Range' );

  var WEAK_STRENGTH_RANGE = new Range( 1E-10, 1E2, 1E-7 ),
  // arbitrary, but needs to be greater than weak range
    STRONG_STRENGTH = WEAK_STRENGTH_RANGE.max + 1;

  return {
    CONCENTRATION_RANGE: new Range( 1E-3, 1, 1E-2 ),
    MAX_PH: 14,
    MIN_PH: 0,
    NEUTRAL_BRIGHTNESS: 0.05, // brightness when pH == NEUTRAL_PH
    NEUTRAL_PH: 7,
    STRONG_STRENGTH: STRONG_STRENGTH,
    WATER_EQUILIBRIUM_CONSTANT: 1E-14,
    WATER_CONCENTRATION: 55.6, // water concentration when it's used as a solvent, mol/L
    WEAK_STRENGTH_RANGE: WEAK_STRENGTH_RANGE
  };
} );