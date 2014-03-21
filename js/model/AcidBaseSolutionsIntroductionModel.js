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
    AcidBaseSolutionsAbstractModel = require( 'ACID_BASE_SOLUTIONS/model/AcidBaseSolutionsAbstractModel' ),
    BarChartModel = require( 'ACID_BASE_SOLUTIONS/model/BarChartModel' ),
    Solutions = require( 'ACID_BASE_SOLUTIONS/model/Constants/Solutions' ),
    GameModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/GameModes' ),

    WaterSolution = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/WaterSolution' ),
    StrongAcidSolution = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/StrongAcidSolution' ),
    WeakAcidSolution = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/WeakAcidSolution' ),
    StrongBaseSolution = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/StrongBaseSolution' ),
    WeakBaseSolution = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/WeakBaseSolution' ),

    SolutionsMenuModel = require( 'ACID_BASE_SOLUTIONS/model/SolutionsMenuModel' ),
    ViewModesMenuModel = require( 'ACID_BASE_SOLUTIONS/model/ViewModesMenuModel' ),
    TestModesMenuModel = require( 'ACID_BASE_SOLUTIONS/model/TestModesMenuModel' ),

  // constants
    DEFAULT_SOLUTION = Solutions.WATER;

  function AcidBaseSolutionsIntroductionModel() {
    AcidBaseSolutionsAbstractModel.call( this,
      GameModes.INTRODUCTION,
      [
        new WaterSolution(),
        new StrongAcidSolution(),
        new WeakAcidSolution(),
        new StrongBaseSolution(),
        new WeakBaseSolution()
      ],
      DEFAULT_SOLUTION );

    // models for control panel
    this.controlPanel = [
      new SolutionsMenuModel( this.property( 'solution' ) ),
      new ViewModesMenuModel( this.property( 'viewMode' ), this.property( 'testMode' ), this.property( 'solvent' ) ),
      new TestModesMenuModel( this.property( 'testMode' ) )
    ];

    // concentration bar chart model
    this.barChart = new BarChartModel( this.beaker, this.SOLUTIONS, this.components, this.property( 'solution' ), this.property( 'viewMode' ), this.property( 'testMode' ) );
  }

  return inherit( AcidBaseSolutionsAbstractModel, AcidBaseSolutionsIntroductionModel );

} );