// Copyright 2002-2014, University of Colorado Boulder

/**
 *  An aqueous solution whose solute is a strong acid.
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

  return inherit( AqueousSolution, StrongAcidSolution, {

    //@override [HA] = 0
    getSoluteConcentration: function() {
      return 0;
    },

    //@override [A-] = c
    getProductConcentration: function() {
      return this.getConcentration();
    },

    //@override [H3O+] = c
    getH3OConcentration: function() {
      return this.getConcentration();
    },

    //@override [OH-] = Kw / [H3O+]
    getOHConcentration: function() {
      return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / this.getH3OConcentration();
    },

    //@override [H2O] = W - c
    getH2OConcentration: function() {
      return ABSConstants.WATER_CONCENTRATION - this.getConcentration();
    },

    //@override @protected Strong strength is a constant.
    isValidStrength: function( strength ) {
      return ( strength === ABSConstants.STRONG_STRENGTH );
    }
  } );
} );
