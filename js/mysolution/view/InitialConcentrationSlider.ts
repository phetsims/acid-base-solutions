// Copyright 2014-2023, University of Colorado Boulder

/**
 * InitialConcentrationSlider is a logarithmic slider for controlling concentration of the solution.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import LogSlider from '../../common/view/LogSlider.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';

const TICK_LABEL_OPTIONS = {
  font: new PhetFont( 10 )
};

// These values are regrettably hardcoded, see https://github.com/phetsims/acid-base-solutions/issues/212
// LogSlider's linearValueRange is [-3,0] in this case, with a tick mark at each integer value, so...
const PAGE_KEYBOARD_STEP = 3; // page up/down will jump to min and max
const KEYBOARD_STEP = 0.5; // up/down, 2 intervals per tick mark
const SHIFT_KEYBOARD_STEP = 0.2; // shift-up/down, 5 intervals per tick mark
const NUMBER_OF_MIDDLE_THRESHOLDS = ( PAGE_KEYBOARD_STEP / SHIFT_KEYBOARD_STEP ) - 1;

export default class InitialConcentrationSlider extends LogSlider {

  public constructor( concentrationProperty: NumberProperty, tandem: Tandem ) {

    super( concentrationProperty, concentrationProperty.range, {
      isDisposable: false,
      trackSize: new Dimension2( 125, 4 ),
      thumbSize: new Dimension2( 12, 24 ),
      thumbTouchAreaXDilation: 6,
      thumbTouchAreaYDilation: 6,
      majorTickLength: 12,
      tickLabelSpacing: 2,
      keyboardStep: KEYBOARD_STEP,
      shiftKeyboardStep: SHIFT_KEYBOARD_STEP,
      pageKeyboardStep: PAGE_KEYBOARD_STEP,
      valueChangeSoundGeneratorOptions: {
        numberOfMiddleThresholds: NUMBER_OF_MIDDLE_THRESHOLDS
      },
      tandem: tandem
    } );

    // tick marks - note that these are hard-coded to a specific range and values
    assert && assert( concentrationProperty.range.min === 0.001 && concentrationProperty.range.max === 1 );
    const tickValues = [ 0.001, 0.01, 0.1, 1 ];
    tickValues.forEach( tickValue => this.addMajorTick( tickValue, new Text( tickValue, TICK_LABEL_OPTIONS ) ) );
  }
}

acidBaseSolutions.register( 'InitialConcentrationSlider', InitialConcentrationSlider );