// Copyright 2002-2014, University of Colorado Boulder

/**
 *  Conductivity tester model.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var NEUTRAL_PH = 7;
  var NEUTRAL_BRIGHTNESS = 0.05;

  /**
   * @param {Beaker} beaker
   * @param {Property<Number>} pHProperty
   * @constructor
   */
  function ConductivityTester( beaker, pHProperty ) {

    this.probeDragYRange = new Range( beaker.top - 20, beaker.top + 50 );

    this.probeSize = new Dimension2( 20, 68 );

    // bulb and battery location
    this.location = new Vector2( beaker.location.x - 45, beaker.top - 30 );

    // probe locations
    var probeXOffset = 0.2 * beaker.size.width; // offset from edge of beaker
    this.positiveProbeLocationProperty = new Property( new Vector2( beaker.right - probeXOffset, this.probeDragYRange.min + 10 ) );
    this.negativeProbeLocationProperty = new Property( new Vector2( beaker.left + probeXOffset, this.probeDragYRange.min + 10 ) );

    // the circuit is closed if both probes are in the solution
    this.isClosedProperty = new DerivedProperty( [ this.positiveProbeLocationProperty, this.negativeProbeLocationProperty ],
      function( positiveProbeLocation, negativeProbeLocation ) {
        return ( beaker.containsPoint( positiveProbeLocation ) && beaker.containsPoint( negativeProbeLocation ) );
      } );

    // brightness of bulb is derived from pH, varies from 0 (off) to 1 (full on)
    this.brightnessProperty = new DerivedProperty( [ pHProperty ],
      function( pH ) {
        return NEUTRAL_BRIGHTNESS + ( 1 - NEUTRAL_BRIGHTNESS ) * (pH < NEUTRAL_PH ? ( NEUTRAL_PH - pH ) / ( NEUTRAL_PH - ABSConstants.PH_RANGE.min ) : ( pH - NEUTRAL_PH ) / ( ABSConstants.PH_RANGE.max - NEUTRAL_PH ) );
      } );
  }

  ConductivityTester.prototype = {

    reset: function() {
      this.positiveProbeLocationProperty.reset();
      this.negativeProbeLocationProperty.reset();
    }
  };

  return ConductivityTester;
} );