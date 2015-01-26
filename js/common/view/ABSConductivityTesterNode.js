// Copyright 2002-2015, University of Colorado Boulder

/**
 * Conductivity tester, adapts the model to scenery-phet.ConductivityTesterNode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ConductivityTesterNode = require( 'ACID_BASE_SOLUTIONS/common/view/conductivity/ConductivityTesterNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  /**
   * @param {ConductivityTester} conductivityTester
   * @constructor
   */
  function ABSConductivityTesterNode( conductivityTester ) {
    ConductivityTesterNode.call( this,
      conductivityTester.brightnessProperty,
      new Property( conductivityTester.bulbLocation ),
      conductivityTester.positiveProbeLocationProperty,
      conductivityTester.negativeProbeLocationProperty,
      {
        probeSize: conductivityTester.probeSize,
        probeDragYRange: conductivityTester.probeDragYRange
      }
    );
  }

  return inherit( ConductivityTesterNode, ABSConductivityTesterNode );
} );
