// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the concentration bar chart in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' ),
    ViewModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/ViewModes' ),
    TestModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/TestModes' );

  /**
   * @param {BeakerModel} beakerModel
   * @param {Array<AqueousSolutionAbstract>} solutions
   * @param {Array<AqueousSolutionAbstract>} components
   * @param {Property<SolutionTypes>} solutionTypeProperty
   * @param {Property<ViewModes>} viewModeProperty
   * @param {Property<TestModes>} testModeProperty
   * @param {Property<Number>} concentrationProperty
   * @param {Property<Number>} strengthProperty
   * @constructor
   */
  function BarChartModel( beakerModel, solutions, components, solutionTypeProperty, viewModeProperty, testModeProperty, concentrationProperty, strengthProperty ) {
    // bar chart width
    this.width = beakerModel.width / 2;

    // bar chart height
    this.height = beakerModel.height / 1.125;

    // bar chart location
    this.location = beakerModel.location.plusXY( (this.width - beakerModel.width) / 2, -(beakerModel.height + this.height) / 2 );

    // solution property
    this.solutionTypeProperty = solutionTypeProperty;

    // array of possible solutions
    this.solutions = solutions;

    // object for easy access to solutions
    this.components = components;

    // view mode property
    this.viewModeProperty = viewModeProperty;

    // test mode property
    this.testModeProperty = testModeProperty;

    // strength property
    this.strengthProperty = strengthProperty;

    // concentration property
    this.concentrationProperty = concentrationProperty;

    // visibility of bar charts
    this.visibleProperty = new Property( this.findVisibility() );

    // add observers
    var setVisibilityBinded = this.setVisibility.bind( this );
    viewModeProperty.link( setVisibilityBinded );
    testModeProperty.link( setVisibilityBinded );
  }

  BarChartModel.prototype = {

    findVisibility: function() {
      return (this.viewModeProperty.value === ViewModes.EQUILIBRIUM && this.testModeProperty.value !== TestModes.CONDUCTIVITY);
    },

    setVisibility: function() {
      this.visibleProperty.value = this.findVisibility();
    }
  };

  return BarChartModel;
} );