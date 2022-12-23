// Copyright 2022, University of Colorado Boulder

/**
 * LogSlider takes a logarithmic model Property, and adapts it to a linear Property as required by Slider.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import Utils from '../../../../dot/js/Utils.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Slider, { SliderOptions } from '../../../../sun/js/Slider.js';
import { Node } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

type SelfOptions = EmptySelfOptions;

export type LogSliderOptions = SelfOptions & SliderOptions & PickRequired<SliderOptions, 'tandem'>;

export default class LogSlider extends Slider {

  private readonly disposeLogSlider: () => void;

  /**
   * @param logValueProperty - the logarithmic Property
   * @param logValueRange - the logarithmic range of logValueProperty
   * @param providedOptions
   */
  public constructor( logValueProperty: Property<number>, logValueRange: RangeWithValue, providedOptions: LogSliderOptions ) {

    // Property that maps between log and linear scales
    const linearValueProperty = new DynamicProperty( new Property( logValueProperty ), {
      bidirectional: true,
      reentrant: true, // necessary because bidirectional:true
      map: ( concentration: number ) => LogSlider.logToLinear( concentration ),
      inverseMap: ( sliderValue: number ) => LogSlider.linearToLog( sliderValue )
    } );

    // Convert range from concentration (log)  to sliderValue (linear)
    const linearValueRange = new Range( LogSlider.logToLinear( logValueRange.min ), LogSlider.logToLinear( logValueRange.max ) );

    super( linearValueProperty, linearValueRange, providedOptions );

    // Because linearValueProperty is adapting between linear and log scales, link logValueProperty so that
    // this looks like a standard PhET-iO Slider.
    this.addLinkedElement( logValueProperty, {
      tandem: providedOptions.tandem.createTandem( 'valueProperty' )
    } );

    this.disposeLogSlider = () => {
      linearValueProperty.dispose();
    };
  }

  public override dispose(): void {
    this.disposeLogSlider();
    super.dispose();
  }

  public override addMajorTick( logValue: number, label?: Node ): void {
    super.addMajorTick( LogSlider.logToLinear( logValue ), label );
  }

  public override addMinorTick( logValue: number, label?: Node ): void {
    super.addMinorTick( LogSlider.logToLinear( logValue ), label );
  }

  public static logToLinear( value: number ): number {
    return Utils.log10( value );
  }

  public static linearToLog( value: number ): number {
    return Utils.toFixedNumber( Math.pow( 10, value ), 10 );
  }
}

acidBaseSolutions.register( 'LogSlider', LogSlider );