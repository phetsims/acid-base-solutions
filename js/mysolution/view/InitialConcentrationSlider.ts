// Copyright 2014-2022, University of Colorado Boulder

/**
 * Concentration slider.
 * Adapts a linear slider to a logarithmic concentration range.
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
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

export default class InitialConcentrationSlider extends HSlider {

  public constructor( concentrationProperty: Property<number>, concentrationRange: RangeWithValue, tandem: Tandem ) {

    const model = new SliderModel( concentrationProperty, concentrationRange );

    super( model.sliderValueProperty, model.sliderValueRange, {
      trackSize: new Dimension2( 125, 4 ),
      thumbSize: new Dimension2( 12, 24 ),
      thumbTouchAreaXDilation: 6,
      thumbTouchAreaYDilation: 6,
      majorTickLength: 12,
      tickLabelSpacing: 2,
      tandem: tandem
    } );

    // add labels tick marks
    const numberOfTicks = 4;
    for ( let i = 0, step = model.sliderValueRange.getLength() / ( numberOfTicks - 1 ); i < numberOfTicks; i++ ) {
      this.addMajorTick( model.sliderValueRange.min + step * i, new Text( concentrationRange.min * Math.pow( 10, i ), { font: new PhetFont( 10 ) } ) );
    }
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

/**
 * Model for the concentration slider.
 * Maps between the linear slider and the logarithmic range of concentration.
 * Implemented as an inner type because this is internal to the slider.
 */
class SliderModel {

  private readonly concentrationProperty: Property<number>;
  public readonly sliderValueRange: RangeWithValue;
  public readonly sliderValueProperty: Property<number>;

  public constructor( concentrationProperty: Property<number>, concentrationRange: RangeWithValue ) {

    this.concentrationProperty = concentrationProperty;

    this.sliderValueRange = new RangeWithValue(
      Utils.log10( concentrationRange.min ),
      Utils.log10( concentrationRange.max ),
      Utils.log10( concentrationRange.defaultValue ) );

    this.sliderValueProperty = new NumberProperty( Utils.log10( concentrationProperty.value ), {
      reentrant: true
    } );

    // map between linear and logarithmic
    this.sliderValueProperty.link( sliderValue => {
      // See https://github.com/phetsims/acid-base-solutions/issues/73
      this.concentrationProperty.value = Utils.toFixedNumber( Math.pow( 10, sliderValue ), 10 );
    } );
    concentrationProperty.link( concentration => {
      this.sliderValueProperty.value = Utils.log10( concentration );
    } );
  }

  public dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
  }
}

acidBaseSolutions.register( 'InitialConcentrationSlider', InitialConcentrationSlider );