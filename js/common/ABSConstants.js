// Copyright 2014-2020, University of Colorado Boulder

/**
 * Constants for simulation 'Acid-Base Solutions'.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import Range from '../../../dot/js/Range.js';
import RangeWithValue from '../../../dot/js/RangeWithValue.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import acidBaseSolutions from '../acidBaseSolutions.js';
import ABSColors from './ABSColors.js';

// constants
const WEAK_STRENGTH_MAX = 1E2;

const ABSConstants = {
  CONCENTRATION_RANGE: new RangeWithValue( 1E-3, 1, 1E-2 ),
  PH_RANGE: new Range( 0, 14 ),
  WATER_EQUILIBRIUM_CONSTANT: 1E-14,
  WATER_CONCENTRATION: 55.6, // water concentration when it's used as a solvent, mol/L
  WEAK_STRENGTH_RANGE: new RangeWithValue( 1E-10, WEAK_STRENGTH_MAX, 1E-7 ),
  STRONG_STRENGTH: WEAK_STRENGTH_MAX + 1, // arbitrary, but needs to be greater than weak max
  PANEL_OPTIONS: {
    resize: true,
    fill: ABSColors.CONTROL_PANEL_BACKGROUND,
    xMargin: 15,
    yMargin: 6,
    align: 'left'
  },
  TITLE_FONT: new PhetFont( { size: 14, weight: 'bold' } )
};

acidBaseSolutions.register( 'ABSConstants', ABSConstants );
export default ABSConstants;