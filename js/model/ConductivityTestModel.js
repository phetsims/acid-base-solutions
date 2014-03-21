// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the pH meter in 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' ),
    TestModes = require( 'model/Constants/TestModes' ),

    WIRES_INITIAL_Y = 60,

    wireOptions = {
      positive: {
        start: {x: 125, y: 84},
        end: {x: 163, y: WIRES_INITIAL_Y}
      },
      negative: {
        start: {x: 16, y: 75},
        end: {x: -22, y: WIRES_INITIAL_Y}
      }
    };

  function ConductivityTestModel( beakerModel, testModeProperty, brightnessProperty ) {
    var self = this;

    // conductivity test location
    this.location = beakerModel.location.plusXY( -60, -beakerModel.height - 130 );

    // drag range of pH meter
    //this.dragRange = new Range( this.location.value.y - 10, this.location.value.y + 75 );

    // water surface level
    this.waterSurface = beakerModel.location.y - beakerModel.height - 60;

    // positive probe y-coordinate
    this.positiveProbeY = new Property( wireOptions.positive.end.y );

    // negative probe y-coordinate
    this.negativeProbeY = new Property( wireOptions.negative.end.y );

    // test mode property
    this.testMode = testModeProperty;

    // visibility of conductivity test
    this.visibility = new Property( testModeProperty.value === TestModes.CONDUCTIVITY );

    // property for indicating closing of electric circuit
    this.isClosed = new Property( false );

    // brightness property
    this.brightness = brightnessProperty;

    testModeProperty.link( function( testMode ) {
      self.visibility.value = (testMode === TestModes.CONDUCTIVITY);
    } );

    // if both probes in water: isClosed === true
    var checkContact = function() {
      self.isClosed.value = ( self.positiveProbeY.value > self.waterSurface && self.negativeProbeY.value > self.waterSurface );
    };
    this.positiveProbeY.link( checkContact );
    this.negativeProbeY.link( checkContact );
  }

  ConductivityTestModel.prototype = {
    reset: function() {
      this.visibility.reset();
      this.isClosed.reset();
      this.positiveProbeY.reset();
      this.negativeProbeY.reset();
    },
    getWireOptions: function() {
      return wireOptions;
    }
  };

  return ConductivityTestModel;
} );