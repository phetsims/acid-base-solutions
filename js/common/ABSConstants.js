// Copyright 2014-2020, University of Colorado Boulder

/**
 * Constants for simulation 'Acid-Base Solutions'.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import Range from '../../../dot/js/Range.js';
import RangeWithValue from '../../../dot/js/RangeWithValue.js';
import acidBaseSolutions from '../acidBaseSolutions.js';

// constants
const WEAK_STRENGTH_MAX = 1E2;

const ABSConstants = {
  CONCENTRATION_RANGE: new RangeWithValue( 1E-3, 1, 1E-2 ),
  PH_RANGE: new Range( 0, 14 ),
  WATER_EQUILIBRIUM_CONSTANT: 1E-14,
  WATER_CONCENTRATION: 55.6, // water concentration when it's used as a solvent, mol/L
  WEAK_STRENGTH_RANGE: new RangeWithValue( 1E-10, WEAK_STRENGTH_MAX, 1E-7 ),
  STRONG_STRENGTH: WEAK_STRENGTH_MAX + 1 // arbitrary, but needs to be greater than weak max
};

acidBaseSolutions.register( 'ABSConstants', ABSConstants );
export default ABSConstants;