// Copyright 2002-2014, University of Colorado Boulder

/**
 *  An aqueous solution whose solute is a weak base.
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

  function WeakBaseSolution() {
    AqueousSolution.call( this,
      SolutionType.WEAK_BASE, ABSConstants.WEAK_STRENGTH_RANGE.defaultValue, ABSConstants.CONCENTRATION_RANGE.defaultValue,
      [
        // molecules found in this solution
        { key: 'B', concentrationFunctionName: 'getSoluteConcentration' },
        { key: 'H2O', concentrationFunctionName: 'getH2OConcentration' },
        { key: 'BH', concentrationFunctionName: 'getProductConcentration' },
        { key: 'OH', concentrationFunctionName: 'getOHConcentration' }
      ] );
  }

  return inherit( AqueousSolution, WeakBaseSolution, {

    //@override [B] = c - [BH+]
    getSoluteConcentration: function() {
      return ( this.getConcentration() - this.getProductConcentration() );
    },

    //@override [BH+] = ( -Kb + sqrt( Kb*Kb + 4*Kb*c ) ) / 2
    getProductConcentration: function() {
      var Kb = this.getStrength();
      var c = this.getConcentration();
      return (-Kb + Math.sqrt( ( Kb * Kb ) + ( 4 * Kb * c ) ) ) / 2;
    },

    //@override [H3O+] = Kw / [OH-]
    getH3OConcentration: function() {
      return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / this.getOHConcentration();
    },

    //@override [OH-] = [BH+]
    getOHConcentration: function() {
      return this.getProductConcentration();
    },

    //@override [H2O] = W - [BH+]
    getH2OConcentration: function() {
      return ( ABSConstants.WATER_CONCENTRATION - this.getProductConcentration() );
    },

    //@override @protected Is strength in the weak range?
    isValidStrength: function( strength ) {
      return ABSConstants.WEAK_STRENGTH_RANGE.contains( strength )
    }
  } );
} );
