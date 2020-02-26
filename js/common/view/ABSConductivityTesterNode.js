// Copyright 2015-2020, University of Colorado Boulder

/**
 * Conductivity tester, adapts the model to scenery-phet.ConductivityTesterNode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const ConductivityTesterNode = require( 'SCENERY_PHET/ConductivityTesterNode' );
  const Property = require( 'AXON/Property' );
  const Range = require( 'DOT/Range' );

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

  return acidBaseSolutions.register( 'ABSConductivityTesterNode', ABSConductivityTesterNode );
} );
