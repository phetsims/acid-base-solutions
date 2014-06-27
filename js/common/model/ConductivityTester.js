// Copyright 2002-2014, University of Colorado Boulder

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
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
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

    var self = this;

    this.probeDragYRange = new Range( beaker.top - 20, beaker.top + 50 );

    this.probeSize = new Dimension2( 20, 68 );

    // bottom-center of bulb's base
    this.bulbLocation = new Vector2( beaker.location.x - 45, beaker.top - 30 );

    // probe locations. x-coordinates are fixed, probes move together vertically.
    var probeXOffset = 0.175 * beaker.size.width; // offset from edge of beaker
    this.positiveProbeX = beaker.right - probeXOffset;
    this.negativeProbeX = beaker.left + probeXOffset;
    this.probeYProperty = new Property( this.probeDragYRange.min + 10 );

    // brightness of bulb varies from 0 (off) to 1 (full on)
    this.brightnessProperty = new DerivedProperty( [ pHProperty, this.probeYProperty ],
      function( pH, probeY ) {
        if ( beaker.bounds.containsCoordinates( self.positiveProbeX, probeY ) &&  beaker.bounds.containsCoordinates( self.negativeProbeX, probeY ) ) {
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

  return inherit( Object, ConductivityTester, {

    reset: function() {
      this.probeYProperty.reset();
    }
  } );
} );