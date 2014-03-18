// Copyright 2002-2013, University of Colorado Boulder

/**
 *  An aqueous solution whose solute is a weak base.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Solutions = require( 'model/Constants/Solutions' ),
    AqueousSolutionAbstract = require( './AqueousSolutionAbstract' ),

  // [B] = c - [BH+]
    getSoluteConcentration = function( concentration, productConcentration ) {
      return (concentration - productConcentration);
    },

  // [BH+] = ( -Kb + sqrt( Kb*Kb + 4*Kb*c ) ) / 2
    getProductConcentration = function( Kb, c ) {
      return (-Kb + Math.sqrt( ( Kb * Kb ) + ( 4 * Kb * c ) ) ) / 2;
    },

  // [H3O+] = Kw / [OH-]
    getH3OConcentration = function( OHConcentration ) {
      return CONSTANTS.WATER_EQUILIBRIUM_CONSTANT / OHConcentration;
    },

  // [OH-] = [BH+]
    getOHConcentration = function( productConcentration ) {
      return productConcentration;
    },

  // [H2O] = W - [BH+]
    getH2OConcentration = function( productConcentration ) {
      return (CONSTANTS.WATER_CONCENTRATION - productConcentration);
    },

    isValidStrength = function( strength ) {
      return CONSTANTS.WEAK_STRENGTH_RANGE.contains( strength );
    },

  // constants
    CONSTANTS = require( 'model/Constants/Constants' ),
    STRENGTH_DEFAULT = CONSTANTS.WEAK_STRENGTH_RANGE.defaultValue,
    CONCENTRATION_DEFAULT = CONSTANTS.CONCENTRATION_RANGE.defaultValue,
    PRODUCT_CONCENTRATION_DEFAULT = getProductConcentration( STRENGTH_DEFAULT, CONCENTRATION_DEFAULT ),
    SOLUTE_CONCENTRATION_DEFAULT = getSoluteConcentration( CONCENTRATION_DEFAULT, PRODUCT_CONCENTRATION_DEFAULT ),
    OH_CONCENTRATION_DEFAULT = getOHConcentration( PRODUCT_CONCENTRATION_DEFAULT ),
    H2O_CONCENTRATION_DEFAULT = getH2OConcentration( PRODUCT_CONCENTRATION_DEFAULT ),
    H3O_CONCENTRATION_DEFAULT = getH3OConcentration( OH_CONCENTRATION_DEFAULT ),
    IS_VALID_STRENGTH_DEFAULT = isValidStrength( STRENGTH_DEFAULT );

  var setSoluteConcentration = function() {
    this.soluteConcentration = getSoluteConcentration( this.concentration, this.productConcentration );
  };

  var setProductConcentration = function() {
    this.productConcentration = getProductConcentration( this.strength, this.concentration );
  };

  function WeakBaseSolution() {
    var self = this;

    // set default strength and add common properties
    AqueousSolutionAbstract.call( this, {
      strength: STRENGTH_DEFAULT,
      concentration: CONCENTRATION_DEFAULT,
      soluteConcentration: SOLUTE_CONCENTRATION_DEFAULT,
      productConcentration: PRODUCT_CONCENTRATION_DEFAULT,
      H2OConcentration: H2O_CONCENTRATION_DEFAULT,
      H3OConcentration: H3O_CONCENTRATION_DEFAULT,
      OHConcentration: OH_CONCENTRATION_DEFAULT,
      isValidStrength: IS_VALID_STRENGTH_DEFAULT
    } );

    this.type = Solutions.WEAK_BASE;

    this.relations = [
      {type: 'B', property: 'soluteConcentration'},
      {type: 'H2O', property: 'H2OConcentration'},
      {type: 'BH', property: 'productConcentration'},
      {type: 'OH', property: 'OHConcentration'}
    ];

    // set links between concentrations
    this.property( 'OHConcentration' ).lazyLink( function( value ) {
      self.H3OConcentration = getH3OConcentration( value );
    } );

    this.property( 'productConcentration' ).lazyLink( function( value ) {
      self.OHConcentration = getOHConcentration( value );
      self.H2OConcentration = getH2OConcentration( value );
    } );

    this.property( 'productConcentration' ).lazyLink( setSoluteConcentration.bind( this ) );
    this.property( 'concentration' ).lazyLink( setSoluteConcentration.bind( this ) );

    this.property( 'strength' ).lazyLink( setProductConcentration.bind( this ) );
    this.property( 'concentration' ).link( setProductConcentration.bind( this ) );

    this.property( 'strength' ).link( function( strength ) {
      self.isValidStrength = isValidStrength( strength );
    } );
  }

  return inherit( AqueousSolutionAbstract, WeakBaseSolution );
} );
