// Copyright 2014-2015, University of Colorado Boulder

/**
 *  An aqueous solution whose solute is a strong base.
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
  function StrongBaseSolution() {
    AqueousSolution.call( this,
      SolutionType.STRONG_BASE, ABSConstants.STRONG_STRENGTH, ABSConstants.CONCENTRATION_RANGE.defaultValue,
      [
        // molecules found in this solution
        { key: 'MOH', concentrationFunctionName: 'getSoluteConcentration' },
        { key: 'M', concentrationFunctionName: 'getProductConcentration' },
        { key: 'OH', concentrationFunctionName: 'getOHConcentration' }
      ] );
  }

  acidBaseSolutions.register( 'StrongBaseSolution', StrongBaseSolution );

  return inherit( AqueousSolution, StrongBaseSolution, {

    // @override @public [MOH] = 0
    getSoluteConcentration: function() {
      return 0;
    },

    // @override @public [M+] = c
    getProductConcentration: function() {
      return this.getConcentration();
    },

    // @override @public [H3O+] = Kw / [OH-]
    getH3OConcentration: function() {
      return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / this.getOHConcentration();
    },

    // @override @public [OH-] = c
    getOHConcentration: function() {
      return this.getConcentration();
    },

    //@override [H2O] = W
    getH2OConcentration: function() {
      return ABSConstants.WATER_CONCENTRATION;
    },

    // @override @protected Strong strength is a constant.
    isValidStrength: function( strength ) {
      return ( strength === ABSConstants.STRONG_STRENGTH );
    }
  } );
} );
