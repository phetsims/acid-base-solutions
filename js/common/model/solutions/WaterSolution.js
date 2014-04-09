// Copyright 2002-2014, University of Colorado Boulder

/**
 *  A solution of pure water, contains no solute.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );
  var AqueousSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/AqueousSolution' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );

  var getSoluteConcentration = function() {
    return 0;
  };

  var getProductConcentration = function() {
    return 0;
  };

  // [H3O] = sqrt(Kw)
  var getH3OConcentration = function() {
    return Math.sqrt( ABSConstants.WATER_EQUILIBRIUM_CONSTANT ); // Kw = [H30] * [OH-]
  };

  // [OH] = [H3O]
  var getOHConcentration = function( H3OConcentration ) {
    return H3OConcentration;
  };

  // [H2O] = W
  var getH2OConcentration = function() {
    return ABSConstants.WATER_CONCENTRATION;
  };

  // initial values for solution properties
  var STRENGTH_DEFAULT = 0,
    CONCENTRATION_DEFAULT = 0,
    SOLUTE_CONCENTRATION_DEFAULT = getSoluteConcentration(),
    PRODUCT_CONCENTRATION_DEFAULT = getProductConcentration(),
    H3O_CONCENTRATION_DEFAULT = getH3OConcentration(),
    OH_CONCENTRATION_DEFAULT = getOHConcentration( H3O_CONCENTRATION_DEFAULT ),
    H2O_CONCENTRATION_DEFAULT = getH2OConcentration();

  function WaterSolution() {
    var self = this;

    // set default strength, concentration and add common properties
    AqueousSolution.call( this, SolutionType.WATER,
      [
        // molecules found in this solution
        {key: 'H2O', concentrationPropertyName: 'H2OConcentration'},
        {key: 'H3O', concentrationPropertyName: 'H3OConcentration'},
        {key: 'OH', concentrationPropertyName: 'OHConcentration'}
      ],
      {
        // initial values for solution properties
        strength: STRENGTH_DEFAULT,
        concentration: CONCENTRATION_DEFAULT,
        soluteConcentration: SOLUTE_CONCENTRATION_DEFAULT,
        productConcentration: PRODUCT_CONCENTRATION_DEFAULT,
        H3OConcentration: H3O_CONCENTRATION_DEFAULT,
        OHConcentration: OH_CONCENTRATION_DEFAULT,
        H2OConcentration: H2O_CONCENTRATION_DEFAULT
      } );

    // set links between concentrations
    this.property( 'H3OConcentration' ).link( function( value ) {
      self.OHConcentration = getOHConcentration( value );
    } );

    // default values
    this.H3OConcentration = Math.sqrt( ABSConstants.WATER_EQUILIBRIUM_CONSTANT );
    this.H2OConcentration = ABSConstants.WATER_CONCENTRATION;
  }

  return inherit( AqueousSolution, WaterSolution );
} );
