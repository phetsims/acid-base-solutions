// Copyright 2014-2018, University of Colorado Boulder

/**
 *  Conductivity tester model.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Range = require( 'DOT/Range' );
  var Vector2 = require( 'DOT/Vector2' );
  var Vector2Property = require( 'DOT/Vector2Property' );

  // constants
  var NEUTRAL_PH = 7;
  var NEUTRAL_BRIGHTNESS = 0.05;

  /**
   * @param {Beaker} beaker
   * @param {Property.<number>} pHProperty
   * @constructor
   */
  function ConductivityTester( beaker, pHProperty ) {

    this.probeDragYRange = new Range( beaker.top - 20, beaker.top + 50 ); // @public

    this.probeSize = new Dimension2( 20, 68 ); // @public

    // @public bottom-center of bulb's base
    this.bulbLocation = new Vector2( beaker.location.x - 45, beaker.top - 30 );

    // @public probe locations
    var probeXOffset = 0.175 * beaker.size.width; // offset from edge of beaker
    var probeY = this.probeDragYRange.min + 10;
    this.positiveProbeLocationProperty = new Vector2Property( new Vector2( beaker.right - probeXOffset, probeY ) );
    this.negativeProbeLocationProperty = new Vector2Property( new Vector2( beaker.left + probeXOffset, probeY ) );

    // @public brightness of bulb varies from 0 (off) to 1 (full on)
    this.brightnessProperty = new DerivedProperty( [ pHProperty, this.positiveProbeLocationProperty, this.negativeProbeLocationProperty ],
      function( pH, positiveProbeLocation, negativeProbeLocation ) {
        if ( beaker.bounds.containsPoint( positiveProbeLocation ) && beaker.bounds.containsPoint( negativeProbeLocation ) ) {
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
      } );
  }

  acidBaseSolutions.register( 'ConductivityTester', ConductivityTester );

  return inherit( Object, ConductivityTester, {

    // @public
    reset: function() {
      this.positiveProbeLocationProperty.reset();
      this.negativeProbeLocationProperty.reset();
    }
  } );
} );