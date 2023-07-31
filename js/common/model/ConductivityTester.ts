// Copyright 2014-2023, University of Colorado Boulder

/**
 * ConductivityTester is the model for the conductivity tester.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSConstants from '../ABSConstants.js';
import Beaker from './Beaker.js';

// constants
const NEUTRAL_PH = 7;
const NEUTRAL_BRIGHTNESS = 0.05;
const BRIGHTNESS_RANGE = new Range( 0, 1 );

export default class ConductivityTester extends PhetioObject {

  public readonly probeDragYRange: Range;
  public readonly probeSize: Dimension2;
  public readonly bulbPosition: Vector2; // bottom-center of bulb's base

  // probe positions
  public readonly positiveProbePositionProperty: Property<Vector2>;
  public readonly negativeProbePositionProperty: Property<Vector2>;

  // brightness of bulb varies from 0 (off) to 1 (full on)
  public readonly brightnessProperty: TReadOnlyProperty<number>;

  public constructor( beaker: Beaker, pHProperty: ReadOnlyProperty<number>, tandem: Tandem ) {

    super( {
      isDisposable: false,
      tandem: tandem,
      phetioState: false
    } );

    this.probeDragYRange = new Range( beaker.top - 20, beaker.top + 50 );

    this.probeSize = new Dimension2( 20, 68 );

    this.bulbPosition = new Vector2( beaker.position.x - 45, beaker.top - 30 );

    const probeXOffset = 0.175 * beaker.size.width; // offset from edge of beaker
    const probeY = this.probeDragYRange.min + 10;

    const probesTandem = tandem.createTandem( 'probes' );

    this.positiveProbePositionProperty = new Vector2Property( new Vector2( beaker.right - probeXOffset, probeY ), {
      tandem: probesTandem.createTandem( 'positiveProbePositionProperty' ),
      phetioReadOnly: true // because position is constrained to probeDragYRange
    } );

    this.negativeProbePositionProperty = new Vector2Property( new Vector2( beaker.left + probeXOffset, probeY ), {
      tandem: probesTandem.createTandem( 'negativeProbePositionProperty' ),
      phetioReadOnly: true // because position is constrained to probeDragYRange
    } );

    this.brightnessProperty = new DerivedProperty(
      [ pHProperty, this.positiveProbePositionProperty, this.negativeProbePositionProperty ],
      ( pH, positiveProbePosition, negativeProbePosition ) => {
        if ( beaker.bounds.containsPoint( positiveProbePosition ) && beaker.bounds.containsPoint( negativeProbePosition ) ) {
          // closed circuit, probes are in solution
          return NEUTRAL_BRIGHTNESS + ( 1 - NEUTRAL_BRIGHTNESS ) *
                 ( pH < NEUTRAL_PH ?
                   ( NEUTRAL_PH - pH ) / ( NEUTRAL_PH - ABSConstants.PH_RANGE.min ) :
                   ( pH - NEUTRAL_PH ) / ( ABSConstants.PH_RANGE.max - NEUTRAL_PH ) );
        }
        else {
          // open circuit
          return 0;
        }
      }, {
        tandem: tandem.createTandem( 'brightnessProperty' ),
        phetioValueType: NumberIO,
        isValidValue: brightness => BRIGHTNESS_RANGE.contains( brightness )
      } );

    this.addLinkedElement( pHProperty );
  }

  public reset(): void {
    this.positiveProbePositionProperty.reset();
    this.negativeProbePositionProperty.reset();
  }
}

acidBaseSolutions.register( 'ConductivityTester', ConductivityTester );