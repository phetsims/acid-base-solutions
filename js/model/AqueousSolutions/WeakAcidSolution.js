// Copyright 2002-2013, University of Colorado Boulder

/**
 *  An aqueous solution whose solute is a weak acid.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Solutions = require( 'model/Constants/Solutions' ),
    AqueousSolutionAbstract = require( './AqueousSolutionAbstract' ),

  // [H3O+] = ( -Ka + sqrt( Ka*Ka + 4*Ka*c ) ) / 2
    getH3OConcentration = function( Ka, c ) {
      return ( -Ka + Math.sqrt( ( Ka * Ka ) + ( 4 * Ka * c ) ) ) / 2;
    },

  // [A-] = [H3O+]
    getProductConcentration = function( H3OConcentration ) {
      return H3OConcentration;
    },

  // [OH-] = Kw / [H3O+]
    getOHConcentration = function( H3OConcentration ) {
      return CONSTANTS.WATER_EQUILIBRIUM_CONSTANT / H3OConcentration;
    },

  // [H2O] = W - [A-]
    getH2OConcentration = function( productConcentration ) {
      return (CONSTANTS.WATER_CONCENTRATION - productConcentration);
    },

  // [HA] = c - [H3O+]
    getSoluteConcentration = function( concentration, H3OConcentration ) {
      return (concentration - H3OConcentration);
    },

    isValidStrength = function( strength ) {
      return CONSTANTS.WEAK_STRENGTH_RANGE.contains( strength );
    },

  // constants
    CONSTANTS = require( 'model/Constants/Constants' ),
    STRENGTH_DEFAULT = CONSTANTS.WEAK_STRENGTH_RANGE.defaultValue,
    CONCENTRATION_DEFAULT = CONSTANTS.CONCENTRATION_RANGE.defaultValue,
    H3O_CONCENTRATION_DEFAULT = getH3OConcentration( STRENGTH_DEFAULT, CONCENTRATION_DEFAULT ),
    PRODUCT_CONCENTRATION_DEFAULT = getProductConcentration( H3O_CONCENTRATION_DEFAULT ),
    OH_CONCENTRATION_DEFAULT = getOHConcentration( H3O_CONCENTRATION_DEFAULT ),
    H2O_CONCENTRATION_DEFAULT = getH2OConcentration( PRODUCT_CONCENTRATION_DEFAULT ),
    IS_VALID_STRENGTH_DEFAULT = isValidStrength( STRENGTH_DEFAULT );

  var setSoluteConcentration = function() {
    this.soluteConcentration = getSoluteConcentration( this.concentration, this.H3OConcentration );
  };

  var setH3OConcentration = function() {
    this.H3OConcentration = getH3OConcentration( this.strength, this.concentration );
  };

  function WeakAcidSolution() {
    var self = this;

    // set default strength and add common properties
    AqueousSolutionAbstract.call( this, {
      strength: STRENGTH_DEFAULT,
      concentration: CONCENTRATION_DEFAULT,
      productConcentration: PRODUCT_CONCENTRATION_DEFAULT,
      H3OConcentration: H3O_CONCENTRATION_DEFAULT,
      OHConcentration: OH_CONCENTRATION_DEFAULT,
      H2OConcentration: H2O_CONCENTRATION_DEFAULT,
      isValidStrength: IS_VALID_STRENGTH_DEFAULT
    } );

    this.type = Solutions.WEAK_ACID;

    this.relations = [
      {type: 'HA', property: 'soluteConcentration'},
      {type: 'H2O', property: 'H2OConcentration'},
      {type: 'A', property: 'productConcentration'},
      {type: 'H3O', property: 'H3OConcentration'}
    ];

    // set links between concentrations
    this.property( 'H3OConcentration' ).link( setSoluteConcentration.bind( this ) );
    this.property( 'concentration' ).link( setSoluteConcentration.bind( this ) );

    this.property( 'strength' ).link( setH3OConcentration.bind( this ) );
    this.property( 'concentration' ).link( setH3OConcentration.bind( this ) );

    this.property( 'H3OConcentration' ).link( function( value ) {
      self.productConcentration = getProductConcentration( value );
      self.OHConcentration = getOHConcentration( value );
    } );

    this.property( 'productConcentration' ).link( function( value ) {
      self.H2OConcentration = getH2OConcentration( value );
    } );

    this.property( 'strength' ).link( function( strength ) {
      self.isValidStrength = isValidStrength( strength );
    } );
  }

  return inherit( AqueousSolutionAbstract, WeakAcidSolution );
} );
