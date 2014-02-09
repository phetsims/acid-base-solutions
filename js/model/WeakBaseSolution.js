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
    AqueousSolution = require( './AqueousSolution' );

  var setSoluteConcentration = function() {
    this.solute = this.concentration - this.product; // [B] = c - [BH+]
  };

  var setProductConcentration = function() {
    var Kb = this.strength,
      c = this.concentration;
    this.product = (-Kb + Math.sqrt( ( Kb * Kb ) + ( 4 * Kb * c ) ) ) / 2;   // [BH+] = ( -Kb + sqrt( Kb*Kb + 4*Kb*c ) ) / 2
  };

  function WeakBaseSolution( strength, concentration ) {
    var self = this;
    AqueousSolution.call( this, strength, concentration );

    // set links between concentrations
    this.property( 'concentration' ).link( function( value ) {
      self.OH = value; // [OH-] = c
    } );

    this.property( 'OH' ).link( function( value ) {
      self.H3O = self.CONSTANTS.WATER_EQUILIBRIUM_CONSTANT / value; // [H3O+] = Kw / [OH-]
    } );

    this.property( 'product' ).link( function( value ) {
      self.OH = value; // [OH-] = [BH+]
      self.H2O = self.CONSTANTS.WATER_CONCENTRATION - value; // [H2O] = W - [BH+]
    } );

    this.property( 'product' ).link( setSoluteConcentration.bind( this ) );
    this.property( 'concentration' ).link( setSoluteConcentration.bind( this ) );

    this.property( 'strength' ).link( setProductConcentration.bind( this ) );
    this.property( 'concentration' ).link( setProductConcentration.bind( this ) );

    this.property( 'strength' ).link( function( strength ) {
      self.isValidStrength = self.CONSTANTS.WEAK_STRENGTH_RANGE.contains( strength );
    } );
  }

  return inherit( AqueousSolution, WeakBaseSolution, {
    init: function() {
      this.strength = this.CONSTANTS.WEAK_STRENGTH_RANGE.defaultValue;
      this.concentration = this.CONSTANTS.CONCENTRATION_RANGE.defaultValue;
    }
  } );
} );
