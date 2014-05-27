// Copyright 2002-2014, University of Colorado Boulder

/**
 * Constants for simulation 'Acid-Base Solutions'.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Range = require( 'DOT/Range' );

  // constants
  var WEAK_STRENGTH_MAX = 1E2;

  return {
    CONCENTRATION_RANGE: new Range( 1E-3, 1, 1E-2 ),
    PH_RANGE: new Range( 0, 14 ),
    WATER_EQUILIBRIUM_CONSTANT: 1E-14,
    WATER_CONCENTRATION: 55.6, // water concentration when it's used as a solvent, mol/L
    WEAK_STRENGTH_RANGE: new Range( 1E-10, WEAK_STRENGTH_MAX, 1E-7 ),
    STRONG_STRENGTH: WEAK_STRENGTH_MAX + 1 // arbitrary, but needs to be greater than weak max
  };
} );