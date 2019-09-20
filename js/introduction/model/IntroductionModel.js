// Copyright 2014-2019, University of Colorado Boulder

/**
 * Model for the 'Introduction' screen in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const ABSModel = require( 'ACID_BASE_SOLUTIONS/common/model/ABSModel' );
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const inherit = require( 'PHET_CORE/inherit' );
  const SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );
  const StrongAcidSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/StrongAcidSolution' );
  const StrongBaseSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/StrongBaseSolution' );
  const WaterSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WaterSolution' );
  const WeakAcidSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WeakAcidSolution' );
  const WeakBaseSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WeakBaseSolution' );

  /**
   * @constructor
   */
  function IntroductionModel() {
    ABSModel.call( this,
      [
        new WaterSolution(),
        new StrongAcidSolution(),
        new WeakAcidSolution(),
        new StrongBaseSolution(),
        new WeakBaseSolution()
      ],
      SolutionType.WATER );
  }

  acidBaseSolutions.register( 'IntroductionModel', IntroductionModel );

  return inherit( ABSModel, IntroductionModel );
} );