// Copyright 2014-2023, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
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
import StrictOmit from '../../../phet-core/js/types/StrictOmit.js';
import { ABSwitchOptions } from '../../../sun/js/ABSwitch.js';
import { KeyboardDragListenerOptions } from '../../../scenery/js/imports.js';

const WEAK_STRENGTH_MAX = 1E2;

// Strong acids and bases have constant strength. This value is arbitrary, but needs to be greater than WEAK_STRENGTH_MAX.
const STRONG_STRENGTH = WEAK_STRENGTH_MAX + 1;
assert && assert( STRONG_STRENGTH > WEAK_STRENGTH_MAX );

const WATER_CONCENTRATION = 55.6; // concentration of pure water, mol/L
const WATER_STRENGTH = 0;

const CONTROL_FONT = new PhetFont( 12 );

const AB_SWITCH_OPTIONS: StrictOmit<ABSwitchOptions, 'tandem'> = {
  toggleSwitchOptions: {
    size: new Dimension2( 40, 20 ),
    thumbTouchAreaXDilation: 6,
    thumbTouchAreaYDilation: 6
  }
};

const KEYBOARD_DRAG_LISTENER_OPTIONS: KeyboardDragListenerOptions = {
  dragVelocity: 300, // velocity of the Node being dragged, in view coordinates per second
  shiftDragVelocity: 20 // velocity with the Shift key pressed, typically slower than dragVelocity
};

const PANEL_OPTIONS: PanelOptions = {
  fill: ABSColors.controlPanelFillProperty,
  xMargin: 15,
  yMargin: 6,
  align: 'left'
};

const ABSConstants = {

  PH_RANGE: new Range( 0, 14 ),

  // Acids and Bases
  CONCENTRATION_RANGE: new RangeWithValue( 1E-3, 1, 1E-2 ), // mol/L
  STRONG_STRENGTH_RANGE: new RangeWithValue( STRONG_STRENGTH, STRONG_STRENGTH, STRONG_STRENGTH ), // constant
  WEAK_STRENGTH_RANGE: new RangeWithValue( 1E-10, WEAK_STRENGTH_MAX, 1E-7 ),

  // Water
  WATER_CONCENTRATION: WATER_CONCENTRATION,
  WATER_CONCENTRATION_RANGE: new RangeWithValue( WATER_CONCENTRATION, WATER_CONCENTRATION, WATER_CONCENTRATION ), // constant
  WATER_STRENGTH_RANGE: new RangeWithValue( WATER_STRENGTH, WATER_STRENGTH, WATER_STRENGTH ), // constant
  WATER_EQUILIBRIUM_CONSTANT: 1E-14,

  // Fonts
  TITLE_FONT: new PhetFont( { size: 14, weight: 'bold' } ),
  SUBTITLE_FONT: new PhetFont( 12 ),
  CONTROL_FONT: CONTROL_FONT,

  // options
  AB_SWITCH_OPTIONS: AB_SWITCH_OPTIONS,
  KEYBOARD_DRAG_LISTENER_OPTIONS: KEYBOARD_DRAG_LISTENER_OPTIONS,
  PANEL_OPTIONS: PANEL_OPTIONS
};

acidBaseSolutions.register( 'ABSConstants', ABSConstants );
export default ABSConstants;