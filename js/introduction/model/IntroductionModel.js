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
    AcidBaseSolutionsModel = require( 'ACID_BASE_SOLUTIONS/common/model/AcidBaseSolutionsModel' ),
    BarChartModel = require( 'ACID_BASE_SOLUTIONS/model/BarChartModel' ),
    SolutionTypes = require( 'ACID_BASE_SOLUTIONS/model/Constants/SolutionTypes' ),
    WaterSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WaterSolution' ),
    StrongAcidSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/StrongAcidSolution' ),
    WeakAcidSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WeakAcidSolution' ),
    StrongBaseSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/StrongBaseSolution' ),
    WeakBaseSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WeakBaseSolution' );

  function IntroductionModel() {
    AcidBaseSolutionsModel.call( this,
      [
        new WaterSolution(),
        new StrongAcidSolution(),
        new WeakAcidSolution(),
        new StrongBaseSolution(),
        new WeakBaseSolution()
      ],
      SolutionTypes.WATER );

    // concentration bar chart model
    this.barChart = new BarChartModel( this.beaker, this.solutions, this.property( 'solutionType' ), this.property( 'viewMode' ), this.property( 'testMode' ) );
  }

  return inherit( AcidBaseSolutionsModel, IntroductionModel );

} );