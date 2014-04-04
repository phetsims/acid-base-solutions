// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for the 'Introduction' screen in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var AcidBaseSolutionsModel = require( 'ACID_BASE_SOLUTIONS/common/model/AcidBaseSolutionsModel' );
  var ConcentrationGraph = require( 'ACID_BASE_SOLUTIONS/common/model/ConcentrationGraph' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );
  var StrongAcidSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/StrongAcidSolution' );
  var StrongBaseSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/StrongBaseSolution' );
  var WaterSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WaterSolution' );
  var WeakAcidSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WeakAcidSolution' );
  var WeakBaseSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WeakBaseSolution' );

  function IntroductionModel() {
    AcidBaseSolutionsModel.call( this,
      [
        new WaterSolution(),
        new StrongAcidSolution(),
        new WeakAcidSolution(),
        new StrongBaseSolution(),
        new WeakBaseSolution()
      ],
      SolutionType.WATER );

    // concentration graph
    this.graph = new ConcentrationGraph( this.beaker, this.solutions, this.property( 'solutionType' ) );
  }

  return inherit( AcidBaseSolutionsModel, IntroductionModel );

} );