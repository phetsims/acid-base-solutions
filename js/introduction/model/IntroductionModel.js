// Copyright 2014-2020, University of Colorado Boulder

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
  const SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );
  const StrongAcidSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/StrongAcidSolution' );
  const StrongBaseSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/StrongBaseSolution' );
  const WaterSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WaterSolution' );
  const WeakAcidSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WeakAcidSolution' );
  const WeakBaseSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WeakBaseSolution' );

  class IntroductionModel extends ABSModel {

    constructor() {

      const solutions = [
        new WaterSolution(),
        new StrongAcidSolution(),
        new WeakAcidSolution(),
        new StrongBaseSolution(),
        new WeakBaseSolution()
      ];

      super( solutions, SolutionType.WATER );
    }
  }

  return acidBaseSolutions.register( 'IntroductionModel', IntroductionModel );
} );