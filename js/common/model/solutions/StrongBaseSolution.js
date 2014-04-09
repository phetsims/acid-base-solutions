// Copyright 2002-2014, University of Colorado Boulder

/**
 *  An aqueous solution whose solute is a strong base.
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

  // [MOH] = 0
  var getSoluteConcentration = function() {
    return 0;
  };

  // [M+] = c
  var getProductConcentration = function( concentration ) {
    return concentration;
  };

  // [H3O+] = Kw / [OH-]
  var getH3OConcentration = function( OHConcentration ) {
    return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / OHConcentration;
  };

  // [OH-] = c
  var getOHConcentration = function( concentration ) {
    return concentration;
  };

  // [H2O] = W
  var getH2OConcentration = function() {
    return ABSConstants.WATER_CONCENTRATION;
  };

  // initial values for solution properties
  var STRENGTH_DEFAULT = ABSConstants.STRONG_STRENGTH,
    CONCENTRATION_DEFAULT = ABSConstants.CONCENTRATION_RANGE.defaultValue,
    SOLUTE_CONCENTRATION_DEFAULT = getSoluteConcentration(),
    PRODUCT_CONCENTRATION_DEFAULT = getProductConcentration( CONCENTRATION_DEFAULT ),
    OH_CONCENTRATION_DEFAULT = getOHConcentration( CONCENTRATION_DEFAULT ),
    H3O_CONCENTRATION_DEFAULT = getH3OConcentration( OH_CONCENTRATION_DEFAULT ),
    H2O_CONCENTRATION_DEFAULT = getH2OConcentration();

  function StrongBaseSolution() {
    var self = this;

    // set default strength and add common properties
    AqueousSolution.call( this, SolutionType.STRONG_BASE,
      [
        // molecules found in this solution
        {key: 'MOH', concentrationPropertyName: 'soluteConcentration'},
        {key: 'M', concentrationPropertyName: 'productConcentration'},
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
    this.property( 'concentration' ).link( function( value ) {
      self.productConcentration = getProductConcentration( value );
      self.OHConcentration = getOHConcentration( value );
    } );

    this.property( 'OHConcentration' ).link( function( value ) {
      self.H3OConcentration = getH3OConcentration( value );
    } );

    this.property( 'strength' ).link( function( strength ) {
      // strength must be a constant for strong acids
      if ( strength !== ABSConstants.STRONG_STRENGTH ) {
        throw new Error( 'invalid strength for strong base: ' + strength );
      }
    } );
  }

  return inherit( AqueousSolution, StrongBaseSolution );
} );
