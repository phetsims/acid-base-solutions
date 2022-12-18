// Copyright 2015-2022, University of Colorado Boulder

/**
 * Conductivity tester, adapts the model to scenery-phet.ConductivityTesterNode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ConductivityTesterNode, { ConductivityTesterNodeOptions } from '../../../../scenery-phet/js/ConductivityTesterNode.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ConductivityTester from '../model/ConductivityTester.js';

type SelfOptions = EmptySelfOptions;

type ABSConductivityTesterNodeOptions = SelfOptions & PickRequired<ConductivityTesterNodeOptions, 'tandem' | 'visibleProperty'>;

export default class ABSConductivityTesterNode extends ConductivityTesterNode {

  public constructor( conductivityTester: ConductivityTester, providedOptions: ABSConductivityTesterNodeOptions ) {

    const options = optionize<ABSConductivityTesterNodeOptions, SelfOptions, ConductivityTesterNodeOptions>()( {

      // ConductivityTesterNodeOptions
      probeSize: conductivityTester.probeSize,
      probeDragYRange: new Range(
        conductivityTester.probeDragYRange.min - conductivityTester.bulbPosition.y,
        conductivityTester.probeDragYRange.max - conductivityTester.bulbPosition.y
      )
    }, providedOptions );

    super( conductivityTester.brightnessProperty,
      new Property( conductivityTester.bulbPosition ),
      conductivityTester.positiveProbePositionProperty,
      conductivityTester.negativeProbePositionProperty,
      options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

acidBaseSolutions.register( 'ABSConductivityTesterNode', ABSConductivityTesterNode );