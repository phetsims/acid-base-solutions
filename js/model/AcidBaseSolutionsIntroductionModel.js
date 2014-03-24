// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the 'Introduction' screen in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    AcidBaseSolutionsModel = require( 'ACID_BASE_SOLUTIONS/model/AcidBaseSolutionsModel' ),
    BarChartModel = require( 'ACID_BASE_SOLUTIONS/model/BarChartModel' ),
    SolutionTypes = require( 'ACID_BASE_SOLUTIONS/model/Constants/SolutionTypes' ),
    WaterSolution = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/WaterSolution' ),
    StrongAcidSolution = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/StrongAcidSolution' ),
    WeakAcidSolution = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/WeakAcidSolution' ),
    StrongBaseSolution = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/StrongBaseSolution' ),
    WeakBaseSolution = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/WeakBaseSolution' ),
    SolutionsMenuModel = require( 'ACID_BASE_SOLUTIONS/model/SolutionsMenuModel' ),
    ViewModesMenuModel = require( 'ACID_BASE_SOLUTIONS/model/ViewModesMenuModel' ),
    TestModesMenuModel = require( 'ACID_BASE_SOLUTIONS/model/TestModesMenuModel' );

  // constants
  var DEFAULT_SOLUTION_TYPE = SolutionTypes.WATER;

  function AcidBaseSolutionsIntroductionModel() {
    AcidBaseSolutionsModel.call( this,
      [
        new WaterSolution(),
        new StrongAcidSolution(),
        new WeakAcidSolution(),
        new StrongBaseSolution(),
        new WeakBaseSolution()
      ],
      DEFAULT_SOLUTION_TYPE );

    // models for control panel
    this.controlPanel = [
      new SolutionsMenuModel( this.property( 'solutionType' ) ),
      new ViewModesMenuModel( this.property( 'viewMode' ), this.property( 'solventVisible' ) ),
      new TestModesMenuModel( this.property( 'testMode' ) )
    ];

    // concentration bar chart model
    this.barChart = new BarChartModel( this.beaker, this.solutions, this.property( 'solutionType' ), this.property( 'viewMode' ), this.property( 'testMode' ) );
  }

  return inherit( AcidBaseSolutionsModel, AcidBaseSolutionsIntroductionModel );

} );