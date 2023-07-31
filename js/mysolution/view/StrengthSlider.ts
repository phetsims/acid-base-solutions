// Copyright 2014-2023, University of Colorado Boulder

/**
 * StrengthSlider is a logarithmic slider for controlling strength.
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

export default class StrengthSlider extends LogSlider {

  public constructor( strengthProperty: Property<number>,
                      strengthRange: RangeWithValue,
                      isWeakProperty: Property<boolean>,
                      tandem: Tandem ) {

    super( strengthProperty, strengthRange, {
      visibleProperty: isWeakProperty, // visible only for weak solutions
      trackSize: new Dimension2( 125, 4 ),
      thumbSize: new Dimension2( 12, 24 ),
      majorTickLength: 12,
      thumbTouchAreaXDilation: 6,
      thumbTouchAreaYDilation: 6,
      isDisposable: false,
      tandem: tandem
    } );

    // tick marks
    this.addMajorTick( strengthRange.min, new Text( AcidBaseSolutionsStrings.weakerStringProperty, TICK_LABEL_OPTIONS ) );
    this.addMajorTick( strengthRange.max, new Text( AcidBaseSolutionsStrings.strongerStringProperty, TICK_LABEL_OPTIONS ) );
  }
}

acidBaseSolutions.register( 'StrengthSlider', StrengthSlider );