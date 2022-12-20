// Copyright 2014-2022, University of Colorado Boulder

/**
 * Constants for simulation 'Acid-Base Solutions'.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../dot/js/Dimension2.js';
import Range from '../../../dot/js/Range.js';
import RangeWithValue from '../../../dot/js/RangeWithValue.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import { PanelOptions } from '../../../sun/js/Panel.js';
import acidBaseSolutions from '../acidBaseSolutions.js';
import ABSColors from './ABSColors.js';
import { StringSwitchOptions } from '../mysolution/view/StringSwitch.js';
import StrictOmit from '../../../phet-core/js/types/StrictOmit.js';

const WEAK_STRENGTH_MAX = 1E2;

const CONTROL_FONT = new PhetFont( 12 );

const STRING_SWITCH_OPTIONS: StrictOmit<StringSwitchOptions, 'tandem'> = {
  textOptions: {
    font: CONTROL_FONT,
    maxWidth: 50
  },
  toggleSwitchOptions: {
    size: new Dimension2( 40, 20 ),
    thumbTouchAreaXDilation: 6,
    thumbTouchAreaYDilation: 6
  }
};

const PANEL_OPTIONS: PanelOptions = {
  fill: ABSColors.CONTROL_PANEL_BACKGROUND,
  xMargin: 15,
  yMargin: 6,
  align: 'left'
};

const ABSConstants = {

  // Model values
  CONCENTRATION_RANGE: new RangeWithValue( 1E-3, 1, 1E-2 ),
  PH_RANGE: new Range( 0, 14 ),
  WATER_EQUILIBRIUM_CONSTANT: 1E-14,
  WATER_CONCENTRATION: 55.6, // water concentration when it's used as a solvent, mol/L
  WEAK_STRENGTH_RANGE: new RangeWithValue( 1E-10, WEAK_STRENGTH_MAX, 1E-7 ),
  STRONG_STRENGTH: WEAK_STRENGTH_MAX + 1, // arbitrary, but needs to be greater than weak max

  // Fonts
  TITLE_FONT: new PhetFont( { size: 14, weight: 'bold' } ),
  SUBTITLE_FONT: new PhetFont( 12 ),
  CONTROL_FONT: CONTROL_FONT,

  // options
  STRING_SWITCH_OPTIONS: STRING_SWITCH_OPTIONS,
  PANEL_OPTIONS: PANEL_OPTIONS
};

acidBaseSolutions.register( 'ABSConstants', ABSConstants );
export default ABSConstants;