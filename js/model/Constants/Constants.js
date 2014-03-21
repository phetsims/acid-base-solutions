// Copyright 2002-2013, University of Colorado Boulder

/**
 * Constants for simulation 'Acid Base Solutions'.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var Range = require( 'DOT/Range' ),

  // constants
    WEAK_STRENGTH_RANGE = new Range( 1E-10, 1E2, 1E-7 ),
    STRONG_STRENGTH = WEAK_STRENGTH_RANGE.max + 1; // arbitrary, but needs to be greater than weak range

  return {
    CONCENTRATION_RANGE: new Range( 1E-3, 1, 1E-2 ),
    FORMULAS_FONT_SIZE: 13,
    FORMULAS_HBOX_SPACING: 4,
    FORMULAS_VBOX_SPACING: 2,
    MAX_PH: 14,
    MIN_PH: 0,
    NEUTRAL_BRIGHTNESS: 0.05, // brightness when pH == NEUTRAL_PH
    NEUTRAL_PH: 7,
    PH_COLOR_KEY_RECT_HEIGHT: 28, // height of single color key rectangle
    PH_COLOR_KEY_RECT_WIDTH: 14, // width of single color key rectangle
    STRONG_STRENGTH: STRONG_STRENGTH,
    WATER_EQUILIBRIUM_CONSTANT: 1E-14,
    WATER_CONCENTRATION: 55.6, // water concentration when it's used as a solvent, mol/L
    WEAK_STRENGTH_RANGE: WEAK_STRENGTH_RANGE
  };
} );