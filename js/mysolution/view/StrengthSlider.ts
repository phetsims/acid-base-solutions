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
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import Utils from '../../../../dot/js/Utils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import { WeakStrongType } from './MySolutionPanel.js';

// constants
const TICK_LABEL_OPTIONS = {
  font: new PhetFont( 12 ),
  maxWidth: 80 // constrain for i18n, determined empirically
};

export default class StrengthSlider extends HSlider {

  public constructor( strengthProperty: Property<number>,
                      strengthRange: RangeWithValue,
                      weakStrongProperty: StringUnionProperty<WeakStrongType>,
                      tandem: Tandem ) {

    const model = new StrengthSliderModel( strengthProperty, strengthRange, weakStrongProperty );

    super( model.sliderValueProperty, model.sliderValueRange, {
      trackSize: new Dimension2( 125, 4 ),
      thumbSize: new Dimension2( 12, 24 ),
      majorTickLength: 12,
      thumbTouchAreaXDilation: 6,
      thumbTouchAreaYDilation: 6,
      tandem: tandem
    } );

    // add ticks
    this.addMajorTick( model.sliderValueRange.min, new Text( AcidBaseSolutionsStrings.weakerStringProperty, TICK_LABEL_OPTIONS ) );
    this.addMajorTick( model.sliderValueRange.max, new Text( AcidBaseSolutionsStrings.strongerStringProperty, TICK_LABEL_OPTIONS ) );

    // Because StrengthSliderModel is adapting between linear and log scales, link strengthProperty so that
    // this looks like a standard PhET-iO Slider.
    this.addLinkedElement( strengthProperty, {
      tandem: tandem.createTandem( 'valueProperty' )
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

/**
 * StrengthSliderModel is the model for the strength slider.
 * It maps between a linear Slider and the logarithmic range of strengthProperty.
 */
class StrengthSliderModel {

  public readonly sliderValueRange: RangeWithValue;
  public readonly sliderValueProperty: Property<number>;

  public constructor( strengthProperty: Property<number>,
                      strengthRange: RangeWithValue,
                      weakStrongProperty: StringUnionProperty<WeakStrongType> ) {

    this.sliderValueRange = new RangeWithValue(
      Utils.log10( strengthRange.min ),
      Utils.log10( strengthRange.max ),
      Utils.log10( strengthRange.defaultValue ) );

    this.sliderValueProperty = new NumberProperty( Utils.log10( strengthProperty.value ), {
      reentrant: true
    } );

    // map between linear and logarithmic
    this.sliderValueProperty.link( sliderValue => {
      if ( weakStrongProperty.value === 'weak' ) {
        strengthProperty.value = Math.pow( 10, sliderValue );
      }
    } );
    strengthProperty.link( strength => {
      if ( weakStrongProperty.value === 'weak' ) {
        this.sliderValueProperty.value = Utils.log10( strength );
      }
    } );
  }

  public dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
  }
}

acidBaseSolutions.register( 'StrengthSlider', StrengthSlider );