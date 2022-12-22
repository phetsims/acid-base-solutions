// Copyright 2014-2022, University of Colorado Boulder

/**
 * Concentration slider.
 * Adapts a linear slider to a logarithmic concentration range.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import Utils from '../../../../dot/js/Utils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

export default class InitialConcentrationSlider extends HSlider {

  public constructor( concentrationProperty: Property<number>, concentrationRange: RangeWithValue, tandem: Tandem ) {

    // Property that maps between concentration (log) and sliderValue (linear)
    const sliderValueProperty = new DynamicProperty( new Property( concentrationProperty ), {
      bidirectional: true,
      reentrant: true, // Necessary because bidirectional:true
      map: ( concentration: number ) => logToLinear( concentration ),
      inverseMap: ( sliderValue: number ) => linearToLog( sliderValue )
    } );

    // Convert range from concentration (log)  to sliderValue (linear)
    const sliderValueRange = new Range( logToLinear( concentrationRange.min ), logToLinear( concentrationRange.max ) );

    super( sliderValueProperty, sliderValueRange, {
      trackSize: new Dimension2( 125, 4 ),
      thumbSize: new Dimension2( 12, 24 ),
      thumbTouchAreaXDilation: 6,
      thumbTouchAreaYDilation: 6,
      majorTickLength: 12,
      tickLabelSpacing: 2,
      tandem: tandem
    } );

    // Tick marks
    //TODO this is hardcoded to a specific range
    assert && assert( concentrationRange.min === 0.001 && concentrationRange.max === 1 );
    const numberOfTicks = 4;
    for ( let i = 0, step = sliderValueRange.getLength() / ( numberOfTicks - 1 ); i < numberOfTicks; i++ ) {
      this.addMajorTick( sliderValueRange.min + step * i, new Text( concentrationRange.min * Math.pow( 10, i ), { font: new PhetFont( 10 ) } ) );
    }
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

function logToLinear( value: number ): number {
  return Utils.log10( value );
}

function linearToLog( value: number ): number {
  return Utils.toFixedNumber( Math.pow( 10, value ), 10 );
}

acidBaseSolutions.register( 'InitialConcentrationSlider', InitialConcentrationSlider );