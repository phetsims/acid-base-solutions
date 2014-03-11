// Copyright 2002-2013, University of Colorado Boulder

/**
 * A solution is a homogeneous mixture composed of two or more substances.
 * In such a mixture, a solute is dissolved in another substance, known as a solvent.
 * In an aqueous solution, the solvent is water. The substance that is produced as
 * the result of the solute dissolving is called the product.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    PropertySet = require( 'AXON/PropertySet' ),
    Util = require( 'DOT/Util' ),

  // constants
    CONSTANTS = require( 'model/Constants/Constants' );

  function AqueousSolution( strength, concentration ) {
    var self = this;

    PropertySet.call( this, {
      strength: strength || 0,
      // for water concentration is equal to 0, so we should use typeof checking
      concentration: ( typeof (concentration) === 'undefined' ? CONSTANTS.CONCENTRATION_RANGE.defaultValue : concentration ),
      soluteConcentration: 0, // solute concentration
      productConcentration: 0, // product concentration
      H3OConcentration: 0, // H3O concentration
      OHConcentration: 0, // OH concentration
      H2OConcentration: 0, // H2O concentration
      pH: 0, // pH of the solution at equilibrium
      isValidStrength: false
    } );

    this.property( 'H3OConcentration' ).link( function( value ) {
      self.pH = -Math.round( 100 * Util.log10( value ) ) / 100;
    } );

    // default values for properties will be set after first assignment
    this.property( 'soluteConcentration' ).once( function( soluteConcentrationInitValue ) {
      self.property( 'soluteConcentration' ).storeInitialValue( soluteConcentrationInitValue );
    } );

    this.property( 'productConcentration' ).once( function( productConcentrationInitValue ) {
      self.property( 'productConcentration' ).storeInitialValue( productConcentrationInitValue );
    } );

    this.property( 'H3OConcentration' ).once( function( H3OConcentrationInitValue ) {
      self.property( 'H3OConcentration' ).storeInitialValue( H3OConcentrationInitValue );
    } );

    this.property( 'OHConcentration' ).once( function( OHConcentrationInitValue ) {
      self.property( 'OHConcentration' ).storeInitialValue( OHConcentrationInitValue );
    } );

    this.property( 'H2OConcentration' ).once( function( H2OConcentrationInitValue ) {
      self.property( 'H2OConcentration' ).storeInitialValue( H2OConcentrationInitValue );
    } );

    this.property( 'pH' ).once( function( pHInitValue ) {
      self.property( 'pH' ).storeInitialValue( pHInitValue );
    } );

    this.property( 'isValidStrength' ).once( function( isValidStrengthInitValue ) {
      self.property( 'isValidStrength' ).storeInitialValue( isValidStrengthInitValue );
    } );
  }

  return inherit( PropertySet, AqueousSolution );
} );
