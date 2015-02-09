// Copyright 2002-2015, University of Colorado Boulder

/**
 * Conductivity tester, adapts the model to scenery-phet.ConductivityTesterNode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ConductivityTesterNode = require( 'SCENERY_PHET/ConductivityTesterNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );

  /**
   * @param {ConductivityTester} conductivityTester
   * @constructor
   */
  function ABSConductivityTesterNode( conductivityTester ) {
    ConductivityTesterNode.call( this,
      conductivityTester.brightnessProperty,
      new Property( conductivityTester.bulbLocation ),
      conductivityTester.positiveProbeLocationProperty,
      conductivityTester.negativeProbeLocationProperty, {
        probeSize: conductivityTester.probeSize,
        probeDragYRange: new Range(
          conductivityTester.probeDragYRange.min - conductivityTester.bulbLocation.y,
          conductivityTester.probeDragYRange.max - conductivityTester.bulbLocation.y
        )
      }
    );
  }

  return inherit( ConductivityTesterNode, ABSConductivityTesterNode );
} );
