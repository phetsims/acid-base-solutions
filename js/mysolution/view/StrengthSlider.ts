// Copyright 2014-2023, University of Colorado Boulder

/**
 * StrengthSlider is a logarithmic slider for controlling strength of the solution.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import LogSlider from '../../common/view/LogSlider.js';

// constants
const TICK_LABEL_OPTIONS = {
  font: new PhetFont( 12 ),
  maxWidth: 80 // determined empirically
};

// These values are regrettably hardcoded, see https://github.com/phetsims/acid-base-solutions/issues/212
// LogSlider's linearValueRange is [-10,2] in this case, with tick marks only at min and max, so...
const PAGE_KEYBOARD_STEP = 4; // page up/down will provide 3 steps over the range
const KEYBOARD_STEP = 1; // up/down interval
const SHIFT_KEYBOARD_STEP = 0.25;  // shift up/down interval
const NUMBER_OF_MIDDLE_THRESHOLDS = 23; // number of sounds when dragging between min and max

export default class StrengthSlider extends LogSlider {

  public constructor( strengthProperty: Property<number>,
                      strengthRange: RangeWithValue,
                      isWeakProperty: Property<boolean>,
                      tandem: Tandem ) {

    super( strengthProperty, strengthRange, {
      isDisposable: false,
      visibleProperty: isWeakProperty, // visible only for weak solutions
      trackSize: new Dimension2( 125, 4 ),
      thumbSize: new Dimension2( 12, 24 ),
      majorTickLength: 12,
      thumbTouchAreaXDilation: 6,
      thumbTouchAreaYDilation: 6,
      keyboardStep: KEYBOARD_STEP,
      shiftKeyboardStep: SHIFT_KEYBOARD_STEP,
      pageKeyboardStep: PAGE_KEYBOARD_STEP,
      valueChangeSoundGeneratorOptions: {
        numberOfMiddleThresholds: NUMBER_OF_MIDDLE_THRESHOLDS
      },
      tandem: tandem
    } );

    // tick marks
    this.addMajorTick( strengthRange.min, new Text( AcidBaseSolutionsStrings.weakerStringProperty, TICK_LABEL_OPTIONS ) );
    this.addMajorTick( strengthRange.max, new Text( AcidBaseSolutionsStrings.strongerStringProperty, TICK_LABEL_OPTIONS ) );
  }
}

acidBaseSolutions.register( 'StrengthSlider', StrengthSlider );