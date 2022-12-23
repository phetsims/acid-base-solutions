// Copyright 2014-2022, University of Colorado Boulder

/**
 * StrengthSlider is a logarithmic slider for controlling strength.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import { WeakStrongType } from './MySolutionPanel.js';
import LogSlider from '../../common/view/LogSlider.js';

// constants
const TICK_LABEL_OPTIONS = {
  font: new PhetFont( 12 ),
  maxWidth: 80 // determined empirically
};

export default class StrengthSlider extends LogSlider {

  public constructor( strengthProperty: Property<number>,
                      strengthRange: RangeWithValue,
                      weakStrongProperty: StringUnionProperty<WeakStrongType>,
                      tandem: Tandem ) {

    super( strengthProperty, strengthRange, {
      visibleProperty: new DerivedProperty( [ weakStrongProperty ], weakStrong => ( weakStrong === 'weak' ), {
        tandem: tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      trackSize: new Dimension2( 125, 4 ),
      thumbSize: new Dimension2( 12, 24 ),
      majorTickLength: 12,
      thumbTouchAreaXDilation: 6,
      thumbTouchAreaYDilation: 6,
      tandem: tandem
    } );

    // tick marks
    this.addMajorTick( strengthRange.min, new Text( AcidBaseSolutionsStrings.weakerStringProperty, TICK_LABEL_OPTIONS ) );
    this.addMajorTick( strengthRange.max, new Text( AcidBaseSolutionsStrings.strongerStringProperty, TICK_LABEL_OPTIONS ) );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

acidBaseSolutions.register( 'StrengthSlider', StrengthSlider );