// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for the concentration bar chart in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  var ViewMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ViewMode' );

  /**
   * @param {Beaker} beaker
   * @param {Array<AqueousSolution>} solutions
   * @param {Property<SolutionType>} solutionTypeProperty
   * @param {Property<ViewMode>} viewModeProperty
   * @param {Property<ToolMode>} toolModeProperty
   * @param {Property<Number>} concentrationProperty optional, provided for custom solutions
   * @param {Property<Number>} strengthProperty optional, provided for custom solutions
   * @constructor
   */
  function BarChartModel( beaker, solutions, solutionTypeProperty, viewModeProperty, toolModeProperty, concentrationProperty, strengthProperty ) {

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

    // strength property
    this.strengthProperty = strengthProperty;

    // concentration property
    this.concentrationProperty = concentrationProperty;

    // visibility of bar charts
    this.visibleProperty = new DerivedProperty( [ viewModeProperty, toolModeProperty ],
      function( viewMode, toolMode ) {
        return ( viewMode === ViewMode.GRAPH && toolMode !== ToolMode.CONDUCTIVITY );
      } );
  }

  return BarChartModel;
} );