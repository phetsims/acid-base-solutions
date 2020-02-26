// Copyright 2014-2020, University of Colorado Boulder

/**
 *  Conductivity tester model.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const Range = require( 'DOT/Range' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  // constants
  const NEUTRAL_PH = 7;
  const NEUTRAL_BRIGHTNESS = 0.05;

  class ConductivityTester {

    /**
     * @param {Beaker} beaker
     * @param {Property.<number>} pHProperty
     */
    constructor( beaker, pHProperty ) {

      this.probeDragYRange = new Range( beaker.top - 20, beaker.top + 50 ); // @public

      this.probeSize = new Dimension2( 20, 68 ); // @public

      // @public bottom-center of bulb's base
      this.bulbPosition = new Vector2( beaker.position.x - 45, beaker.top - 30 );

      // @public probe positions
      const probeXOffset = 0.175 * beaker.size.width; // offset from edge of beaker
      const probeY = this.probeDragYRange.min + 10;
      this.positiveProbePositionProperty = new Vector2Property( new Vector2( beaker.right - probeXOffset, probeY ) );
      this.negativeProbePositionProperty = new Vector2Property( new Vector2( beaker.left + probeXOffset, probeY ) );

      // @public brightness of bulb varies from 0 (off) to 1 (full on)
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
        } );
    }

    // @public
    reset() {
      this.positiveProbePositionProperty.reset();
      this.negativeProbePositionProperty.reset();
    }
  }

  return acidBaseSolutions.register( 'ConductivityTester', ConductivityTester );
} );