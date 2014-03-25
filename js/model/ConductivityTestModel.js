// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the pH meter in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' ),
    TestModes = require( 'ACID_BASE_SOLUTIONS/common/enum/TestModes' );

  // constants
  var WIRES_INITIAL_Y = 60,
    WIRE_OPTIONS = {
      positive: {
        start: {x: 125, y: 84},
        end: {x: 163, y: WIRES_INITIAL_Y}
      },
      negative: {
        start: {x: 16, y: 75},
        end: {x: -22, y: WIRES_INITIAL_Y}
      }
    };

  /**
   * @param {Beaker} beaker
   * @param {Property<TestModes>} testModeProperty
   * @param {Property<Number>} brightnessProperty
   * @constructor
   */
  function ConductivityTestModel( beaker, testModeProperty, brightnessProperty ) {
    var self = this;

    // conductivity test location
    this.location = beaker.location.plusXY( -60, -beaker.size.height - 130 );

    // water surface level
    this.waterSurface = beaker.location.y - beaker.size.height - 60;

    // positive probe y-coordinate
    this.positiveProbeYProperty = new Property( WIRE_OPTIONS.positive.end.y );

    // negative probe y-coordinate
    this.negativeProbeYProperty = new Property( WIRE_OPTIONS.negative.end.y );

    // visibility of conductivity test
    this.visibleProperty = new Property( testModeProperty.value === TestModes.CONDUCTIVITY );

    // property for indicating closing of electric circuit
    this.isClosedProperty = new Property( false );

    // brightness property
    this.brightnessProperty = brightnessProperty;

    testModeProperty.link( function( testMode ) {
      self.visibleProperty.value = (testMode === TestModes.CONDUCTIVITY);
    } );

    // if both probes in water: isClosedProperty.value === true
    var checkContact = function() {
      self.isClosedProperty.value = ( self.positiveProbeYProperty.value > self.waterSurface && self.negativeProbeYProperty.value > self.waterSurface );
    };
    this.positiveProbeYProperty.link( checkContact );
    this.negativeProbeYProperty.link( checkContact );
  }

  ConductivityTestModel.prototype = {

    reset: function() {
      this.visibleProperty.reset();
      this.isClosedProperty.reset();
      this.positiveProbeYProperty.reset();
      this.negativeProbeYProperty.reset();
    },

    getWireOptions: function() {
      return WIRE_OPTIONS;
    }
  };

  return ConductivityTestModel;
} );