// Copyright 2015-2020, University of Colorado Boulder

/**
 * Conductivity tester, adapts the model to scenery-phet.ConductivityTesterNode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import ConductivityTesterNode from '../../../../scenery-phet/js/ConductivityTesterNode.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

class ABSConductivityTesterNode extends ConductivityTesterNode {

  /**
   * @param {ConductivityTester} conductivityTester
   */
  constructor( conductivityTester ) {
    super( conductivityTester.brightnessProperty,
      new Property( conductivityTester.bulbPosition ),
      conductivityTester.positiveProbePositionProperty,
      conductivityTester.negativeProbePositionProperty, {
        probeSize: conductivityTester.probeSize,
        probeDragYRange: new Range(
          conductivityTester.probeDragYRange.min - conductivityTester.bulbPosition.y,
          conductivityTester.probeDragYRange.max - conductivityTester.bulbPosition.y
        )
      }
    );
  }
}

acidBaseSolutions.register( 'ABSConductivityTesterNode', ABSConductivityTesterNode );
export default ABSConductivityTesterNode;