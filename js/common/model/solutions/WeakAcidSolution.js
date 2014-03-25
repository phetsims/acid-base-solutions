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
    SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' ),
    AqueousSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/AqueousSolution' ),
    ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );

  // [H3O+] = ( -Ka + sqrt( Ka*Ka + 4*Ka*c ) ) / 2
  var getH3OConcentration = function( Ka, c ) {
    return ( -Ka + Math.sqrt( ( Ka * Ka ) + ( 4 * Ka * c ) ) ) / 2;
  };

  // [A-] = [H3O+]
  var getProductConcentration = function( H3OConcentration ) {
    return H3OConcentration;
  };

  // [OH-] = Kw / [H3O+]
  var getOHConcentration = function( H3OConcentration ) {
    return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / H3OConcentration;
  };

  // [H2O] = W - [A-]
  var getH2OConcentration = function( productConcentration ) {
    return (ABSConstants.WATER_CONCENTRATION - productConcentration);
  };

  // [HA] = c - [H3O+]
  var getSoluteConcentration = function( concentration, H3OConcentration ) {
    return (concentration - H3OConcentration);
  };

  var isValidStrength = function( strength ) {
    return ABSConstants.WEAK_STRENGTH_RANGE.contains( strength );
  };

  // constants
  var STRENGTH_DEFAULT = ABSConstants.WEAK_STRENGTH_RANGE.defaultValue,
    CONCENTRATION_DEFAULT = ABSConstants.CONCENTRATION_RANGE.defaultValue,
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
    AqueousSolution.call( this, SolutionType.WEAK_ACID,
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
        productConcentration: PRODUCT_CONCENTRATION_DEFAULT,
        H3OConcentration: H3O_CONCENTRATION_DEFAULT,
        OHConcentration: OH_CONCENTRATION_DEFAULT,
        H2OConcentration: H2O_CONCENTRATION_DEFAULT,
        isValidStrength: IS_VALID_STRENGTH_DEFAULT
      } );

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

  return inherit( AqueousSolution, WeakAcidSolution );
} );
