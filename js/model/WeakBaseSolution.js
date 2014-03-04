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
    AqueousSolution = require( './AqueousSolution' ),

  // constants
    CONSTANTS = require( 'model/Constants/Constants' );

  var setSoluteConcentration = function() {
    this.soluteConcentration = this.concentration - this.productConcentration; // [B] = c - [BH+]
  };

  var setProductConcentration = function() {
    var Kb = this.strength,
      c = this.concentration;
    this.productConcentration = (-Kb + Math.sqrt( ( Kb * Kb ) + ( 4 * Kb * c ) ) ) / 2;   // [BH+] = ( -Kb + sqrt( Kb*Kb + 4*Kb*c ) ) / 2
  };

  function WeakBaseSolution() {
    var self = this;

    // set default strength and add common properties
    AqueousSolution.call( this, CONSTANTS.WEAK_STRENGTH_RANGE.defaultValue );

    // set links between concentrations
    this.property( 'concentration' ).link( function( value ) {
      self.OHConcentration = value; // [OH-] = c
    } );

    this.property( 'OHConcentration' ).link( function( value ) {
      self.H3OConcentration = CONSTANTS.WATER_EQUILIBRIUM_CONSTANT / value; // [H3O+] = Kw / [OH-]
    } );

    this.property( 'productConcentration' ).link( function( value ) {
      self.OHConcentration = value; // [OH-] = [BH+]
      self.H2OConcentration = CONSTANTS.WATER_CONCENTRATION - value; // [H2O] = W - [BH+]
    } );

    this.property( 'productConcentration' ).link( setSoluteConcentration.bind( this ) );
    this.property( 'concentration' ).link( setSoluteConcentration.bind( this ) );

    this.property( 'strength' ).link( setProductConcentration.bind( this ) );
    this.property( 'concentration' ).link( setProductConcentration.bind( this ) );

    this.property( 'strength' ).link( function( strength ) {
      self.isValidStrength = CONSTANTS.WEAK_STRENGTH_RANGE.contains( strength );
    } );
  }

  return inherit( AqueousSolution, WeakBaseSolution );
} );
