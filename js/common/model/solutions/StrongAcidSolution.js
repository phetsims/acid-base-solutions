// Copyright 2014-2020, University of Colorado Boulder

/**
 *  An aqueous solution whose solute is a strong acid.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const AqueousSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/AqueousSolution' );
  const SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );

  class StrongAcidSolution extends AqueousSolution {

    constructor() {
      super( SolutionType.STRONG_ACID, ABSConstants.STRONG_STRENGTH, ABSConstants.CONCENTRATION_RANGE.defaultValue,
        [
          // molecules found in this solution
          { key: 'HA', concentrationFunctionName: 'getSoluteConcentration' },
          { key: 'H2O', concentrationFunctionName: 'getH2OConcentration' },
          { key: 'A', concentrationFunctionName: 'getProductConcentration' },
          { key: 'H3O', concentrationFunctionName: 'getH3OConcentration' }
        ]
      );
    }

    // @override @public [HA] = 0
    getSoluteConcentration() {
      return 0;
    }

    // @override @public [A-] = c
    getProductConcentration() {
      return this.getConcentration();
    }

    // @override @public [H3O+] = c
    getH3OConcentration() {
      return this.getConcentration();
    }

    // @override @public [OH-] = Kw / [H3O+]
    getOHConcentration() {
      return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / this.getH3OConcentration();
    }

    // @override @public [H2O] = W - c
    getH2OConcentration() {
      return ABSConstants.WATER_CONCENTRATION - this.getConcentration();
    }

    // @override @protected Strong strength is a constant.
    isValidStrength( strength ) {
      return ( strength === ABSConstants.STRONG_STRENGTH );
    }
  }

  return acidBaseSolutions.register( 'StrongAcidSolution', StrongAcidSolution );
} );
