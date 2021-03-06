// Copyright 2014-2021, University of Colorado Boulder

/**
 * Concentration slider.
 * Adapts a linear slider to a logarithmic concentration range.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import Utils from '../../../../dot/js/Utils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import HSlider from '../../../../sun/js/HSlider.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

class ConcentrationSlider extends HSlider {

  /**
   * @param {Property.<number>} concentrationProperty
   * @param {Range} concentrationRange
   */
  constructor( concentrationProperty, concentrationRange ) {

    const model = new SliderModel( concentrationProperty, concentrationRange );

    super( model.sliderValueProperty, model.sliderValueRange, {
      trackSize: new Dimension2( 125, 4 ),
      thumbSize: new Dimension2( 12, 24 ),
      thumbTouchAreaXDilation: 6,
      thumbTouchAreaYDilation: 6,
      majorTickLength: 12,
      tickLabelSpacing: 2
    } );

    // add labels tick marks
    const numberOfTicks = 4;
    for ( let i = 0, step = model.sliderValueRange.getLength() / ( numberOfTicks - 1 ); i < numberOfTicks; i++ ) {
      this.addMajorTick( model.sliderValueRange.min + step * i, new Text( concentrationRange.min * Math.pow( 10, i ), { font: new PhetFont( 10 ) } ) );
    }
  }
}

acidBaseSolutions.register( 'ConcentrationSlider', ConcentrationSlider );

/**
 * Model for the concentration slider.
 * Maps between the linear slider and the logarithmic range of concentration.
 * Implemented as an inner type because this is internal to the slider.
 */
class SliderModel {

  /**
   * @param {Property.<number>} concentrationProperty
   * @param {RangeWithValue} concentrationRange
   */
  constructor( concentrationProperty, concentrationRange ) {

    this.concentrationProperty = concentrationProperty; // @private

    // @public range of slider
    this.sliderValueRange = new RangeWithValue(
      Utils.log10( concentrationRange.min ),
      Utils.log10( concentrationRange.max ),
      Utils.log10( concentrationRange.defaultValue ) );

    // @public property for slider value
    this.sliderValueProperty = new NumberProperty( Utils.log10( concentrationProperty.get() ), {
      reentrant: true
    } );

    this.sliderValueProperty.link( sliderValue => {
      this.concentrationProperty.set( Utils.toFixedNumber( Math.pow( 10, sliderValue ), 10 ) ); // see issue#73
    } );
    concentrationProperty.link( concentration => {
      this.sliderValueProperty.set( Utils.log10( concentration ) );
    } );
  }
}

export default ConcentrationSlider;