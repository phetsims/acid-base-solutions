// Copyright 2014-2023, University of Colorado Boulder

/**
 * InitialConcentrationSlider is a logarithmic slider for controlling concentration.
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
import LogSlider from '../../common/view/LogSlider.js';

const TICK_LABEL_OPTIONS = {
  font: new PhetFont( 10 )
};

export default class InitialConcentrationSlider extends LogSlider {

  public constructor( concentrationProperty: Property<number>, concentrationRange: RangeWithValue, tandem: Tandem ) {

    super( concentrationProperty, concentrationRange, {
      trackSize: new Dimension2( 125, 4 ),
      thumbSize: new Dimension2( 12, 24 ),
      thumbTouchAreaXDilation: 6,
      thumbTouchAreaYDilation: 6,
      majorTickLength: 12,
      tickLabelSpacing: 2,
      tandem: tandem
    } );

    // tick marks - note that these are hard-coded to a specific range and values
    assert && assert( concentrationRange.min === 0.001 && concentrationRange.max === 1 );
    const tickValues = [ 0.001, 0.01, 0.1, 1 ];
    tickValues.forEach( tickValue => this.addMajorTick( tickValue, new Text( tickValue, TICK_LABEL_OPTIONS ) ) );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

acidBaseSolutions.register( 'InitialConcentrationSlider', InitialConcentrationSlider );