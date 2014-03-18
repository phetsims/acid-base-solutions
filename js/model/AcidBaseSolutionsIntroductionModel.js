// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the 'Introduction' screen in 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    AcidBaseSolutionsAbstractModel = require( 'ACID_BASE_SOLUTIONS/model/AcidBaseSolutionsAbstractModel' ),
    Solutions = require( 'model/Constants/Solutions' ),
    GameModes = require( 'model/Constants/GameModes' ),

    WaterSolution = require( 'model/AqueousSolutions/WaterSolution' ),
    StrongAcidSolution = require( 'model/AqueousSolutions/StrongAcidSolution' ),
    WeakAcidSolution = require( 'model/AqueousSolutions/WeakAcidSolution' ),
    StrongBaseSolution = require( 'model/AqueousSolutions/StrongBaseSolution' ),
    WeakBaseSolution = require( 'model/AqueousSolutions/WeakBaseSolution' ),

    SolutionsMenuModel = require( './SolutionsMenuModel' ),
    ViewModesMenuModel = require( './ViewModesMenuModel' ),
    TestModesMenuModel = require( './TestModesMenuModel' ),

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
  }

  return inherit( AcidBaseSolutionsAbstractModel, AcidBaseSolutionsIntroductionModel );

} );