// Copyright 2002-2014, University of Colorado Boulder

/**
 *  An aqueous solution whose solute is a strong acid.
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

  // [HA] = 0
  var getSoluteConcentration = function() {
    return 0;
  };

  // [A-] = c
  var getProductConcentration = function( concentration ) {
    return concentration;
  };

  // [H3O+] = c
  var getH3OConcentration = function( concentration ) {
    return concentration;
  };

  // [OH-] = Kw / [H3O+]
  var getOHConcentration = function( H3OConcentration ) {
    return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / H3OConcentration;
  };

  // [H2O] = W - c
  var getH2OConcentration = function( concentration ) {
    return ABSConstants.WATER_CONCENTRATION - concentration;
  };

  // initial values for solution properties
  var STRENGTH_DEFAULT = ABSConstants.STRONG_STRENGTH,
    CONCENTRATION_DEFAULT = ABSConstants.CONCENTRATION_RANGE.defaultValue,
    SOLUTE_CONCENTRATION_DEFAULT = getSoluteConcentration(),
    PRODUCT_CONCENTRATION_DEFAULT = getProductConcentration( CONCENTRATION_DEFAULT ),
    H3O_CONCENTRATION_DEFAULT = getH3OConcentration( CONCENTRATION_DEFAULT ),
    OH_CONCENTRATION_DEFAULT = getOHConcentration( H3O_CONCENTRATION_DEFAULT ),
    H2O_CONCENTRATION_DEFAULT = getH2OConcentration( CONCENTRATION_DEFAULT );

  function StrongAcidSolution() {
    var self = this;

    // set default strength and add common properties
    AqueousSolution.call( this, SolutionType.STRONG_ACID,
      [
        // molecules found in this solution
        {key: 'HA', concentrationPropertyName: 'soluteConcentration'},
        {key: 'H2O', concentrationPropertyName: 'H2OConcentration'},
        {key: 'A', concentrationPropertyName: 'productConcentration'},
        {key: 'H3O', concentrationPropertyName: 'H3OConcentration'}
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
      self.H3OConcentration = getH3OConcentration( value );
      self.H2OConcentration = getH2OConcentration( value );
    } );

    this.property( 'H3OConcentration' ).link( function( value ) {
      self.OHConcentration = getOHConcentration( value );
    } );

    this.property( 'strength' ).link( function( strength ) {
      // strength must be a constant for strong acids
      if ( strength !== ABSConstants.STRONG_STRENGTH ) {
        throw new Error( 'invalid strength for strong acid: ' + strength );
      }
    } );
  }

  return inherit( AqueousSolution, StrongAcidSolution );
} );
