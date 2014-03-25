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
    ViewMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ViewMode' ),
    TestMode = require( 'ACID_BASE_SOLUTIONS/common/enum/TestMode' );

  /**
   * @param {Beaker} beaker
   * @param {Array<AqueousSolution>} solutions
   * @param {Property<SolutionType>} solutionTypeProperty
   * @param {Property<ViewMode>} viewModeProperty
   * @param {Property<TestMode>} testModeProperty
   * @param {Property<Number>} concentrationProperty optional, provided for custom solutions
   * @param {Property<Number>} strengthProperty optional, provided for custom solutions
   * @constructor
   */
  function BarChartModel( beaker, solutions, solutionTypeProperty, viewModeProperty, testModeProperty, concentrationProperty, strengthProperty ) {
    // bar chart width
    this.width = beaker.size.width / 2;

    // bar chart height
    this.height = beaker.size.height / 1.125;

    // bar chart location
    this.location = beaker.location.plusXY( (this.width - beaker.size.width) / 2, -(beaker.size.height + this.height) / 2 );

    // solution property
    this.solutionTypeProperty = solutionTypeProperty;

    // associative array of possible solutions, indexed by solutionType
    this.solutions = solutions;

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
      return (this.viewModeProperty.value === ViewMode.GRAPH && this.testModeProperty.value !== TestMode.CONDUCTIVITY);
    },

    setVisibility: function() {
      this.visibleProperty.value = this.findVisibility();
    }
  };

  return BarChartModel;
} );