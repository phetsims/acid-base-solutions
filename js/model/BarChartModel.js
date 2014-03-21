// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the concentration bar chart in 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' ),
    ViewModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/ViewModes' ),
    TestModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/TestModes' );

  function BarChartModel( beakerModel, solutions, components, solutionProperty, viewModeProperty, testModeProperty, concentrationProperty, strengthProperty ) {
    // bar chart width
    this.width = beakerModel.width / 2;

    // bar chart height
    this.height = beakerModel.height / 1.125;

    // bar chart location
    this.location = beakerModel.location.plusXY( (this.width - beakerModel.width) / 2, -(beakerModel.height + this.height) / 2 );

    // solution property
    this.solution = solutionProperty;

    // array of possible solutions
    this.solutions = solutions;

    // object for easy access to solutions
    this.components = components;

    // view mode property
    this.viewMode = viewModeProperty;

    // test mode property
    this.testMode = testModeProperty;

    // strength property
    this.strength = strengthProperty;

    // concentration property
    this.concentration = concentrationProperty;

    // visibility of bar charts
    this.visibility = new Property( this.findVisibility() );

    // add observers
    var setVisibilityBinded = this.setVisibility.bind( this );
    viewModeProperty.link( setVisibilityBinded );
    testModeProperty.link( setVisibilityBinded );
  }

  BarChartModel.prototype = {
    findVisibility: function() {
      return (this.viewMode.value === ViewModes.EQUILIBRIUM && this.testMode.value !== TestModes.CONDUCTIVITY);
    },
    setVisibility: function() {
      this.visibility.value = this.findVisibility();
    }
  };

  return BarChartModel;
} );