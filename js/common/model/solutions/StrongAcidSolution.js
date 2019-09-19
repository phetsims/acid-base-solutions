// Copyright 2014-2015, University of Colorado Boulder

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
  const inherit = require( 'PHET_CORE/inherit' );
  const SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );

  /**
   * @constructor
   */
  function StrongAcidSolution() {
    AqueousSolution.call( this,
      SolutionType.STRONG_ACID, ABSConstants.STRONG_STRENGTH, ABSConstants.CONCENTRATION_RANGE.defaultValue,
      [
        // molecules found in this solution
        { key: 'HA', concentrationFunctionName: 'getSoluteConcentration' },
        { key: 'H2O', concentrationFunctionName: 'getH2OConcentration' },
        { key: 'A', concentrationFunctionName: 'getProductConcentration' },
        { key: 'H3O', concentrationFunctionName: 'getH3OConcentration' }
      ] );
  }

  acidBaseSolutions.register( 'StrongAcidSolution', StrongAcidSolution );

  return inherit( AqueousSolution, StrongAcidSolution, {

    // @override @public [HA] = 0
    getSoluteConcentration: function() {
      return 0;
    },

    // @override @public [A-] = c
    getProductConcentration: function() {
      return this.getConcentration();
    },

    // @override @public [H3O+] = c
    getH3OConcentration: function() {
      return this.getConcentration();
    },

    // @override @public [OH-] = Kw / [H3O+]
    getOHConcentration: function() {
      return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / this.getH3OConcentration();
    },

    // @override @public [H2O] = W - c
    getH2OConcentration: function() {
      return ABSConstants.WATER_CONCENTRATION - this.getConcentration();
    },

    // @override @protected Strong strength is a constant.
    isValidStrength: function( strength ) {
      return ( strength === ABSConstants.STRONG_STRENGTH );
    }
  } );
} );
