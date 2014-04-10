// Copyright 2002-2014, University of Colorado Boulder

/**
 *  An aqueous solution whose solute is a strong base.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );
  var AqueousSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/AqueousSolution' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );

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

  return inherit( AqueousSolution, StrongBaseSolution, {

    // [MOH] = 0
    getSoluteConcentration: function() {
      return 0;
    },

    // [M+] = c
    getProductConcentration: function() {
      return this.getConcentration();
    },

    // [H3O+] = Kw / [OH-]
    getH3OConcentration: function() {
      return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / this.getOHConcentration();
    },

    // [OH-] = c
    getOHConcentration: function() {
      return this.getConcentration();
    },

    // [H2O] = W
    getH2OConcentration: function() {
      return ABSConstants.WATER_CONCENTRATION;
    },

    // Strong strength is a constant.
    isValidStrength: function( strength ) {
      return ( strength === ABSConstants.STRONG_STRENGTH );
    }
  } );
} );
