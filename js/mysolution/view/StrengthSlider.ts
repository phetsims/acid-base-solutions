// Copyright 2014-2022, University of Colorado Boulder

/**
 * Slider for controlling strength.
 * Adapts a linear slider to a logarithmic strength range.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import Utils from '../../../../dot/js/Utils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import HSlider from '../../../../sun/js/HSlider.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import { SolutionType } from '../../common/enum/SolutionType.js';

// constants
const TICK_LABEL_OPTIONS = {
  font: new PhetFont( 12 ),
  maxWidth: 80 // constrain for i18n, determined empirically
};

export default class StrengthSlider extends HSlider {

  public constructor( solutionTypeProperty: Property<SolutionType>,
                      strengthProperty: Property<number>,
                      strengthRange: RangeWithValue ) {

    const model = new SliderModel( solutionTypeProperty, strengthProperty, strengthRange );

    super( model.sliderValueProperty, model.sliderValueRange, {
      trackSize: new Dimension2( 125, 4 ),
      thumbSize: new Dimension2( 12, 24 ),
      majorTickLength: 12,
      thumbTouchAreaXDilation: 6,
      thumbTouchAreaYDilation: 6
    } );

    // add ticks
    this.addMajorTick( model.sliderValueRange.min, new Text( AcidBaseSolutionsStrings.weakerStringProperty, TICK_LABEL_OPTIONS ) );
    this.addMajorTick( model.sliderValueRange.max, new Text( AcidBaseSolutionsStrings.strongerStringProperty, TICK_LABEL_OPTIONS ) );
  }
}

/**
 * Model for the strength slider. Maps between the linear slider and the logarithmic range of strength.
 * Implemented as an inner type because this is internal to the slider.
 */
class SliderModel {

  public readonly sliderValueRange: RangeWithValue;
  public readonly sliderValueProperty: Property<number>;

  public constructor( solutionTypeProperty: Property<SolutionType>,
                      strengthProperty: Property<number>,
                      strengthRange: RangeWithValue ) {

    this.sliderValueRange = new RangeWithValue(
      Utils.log10( strengthRange.min ),
      Utils.log10( strengthRange.max ),
      Utils.log10( strengthRange.defaultValue ) );

    this.sliderValueProperty = new NumberProperty( Utils.log10( strengthProperty.value ), {
      reentrant: true
    } );

    // map between linear and logarithmic
    this.sliderValueProperty.link( sliderValue => {
      if ( strengthIsMutable( solutionTypeProperty.value ) ) {
        strengthProperty.value = Math.pow( 10, sliderValue );
      }
    } );
    strengthProperty.link( strength => {
      if ( strengthIsMutable( solutionTypeProperty.value ) ) {
        this.sliderValueProperty.value = Utils.log10( strength );
      }
    } );
  }
}

// issues #94: strength can be changed only for weak solutions, use this as a guard
function strengthIsMutable( solutionType: SolutionType ): boolean {
  return ( solutionType === 'weakAcid' || solutionType === 'weakBase' );
}

acidBaseSolutions.register( 'StrengthSlider', StrengthSlider );