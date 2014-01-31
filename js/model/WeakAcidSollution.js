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
    AqueousSolution = require( './AqueousSolution' );

  var setSoluteConcentration = function() {
    this.solute = this.concentration - this.H3O; // [HA] = c - [H3O+]
  };

  // [H3O+] = ( -Ka + sqrt( Ka*Ka + 4*Ka*c ) ) / 2
  var setH3OConcentration = function() {
    var Ka = this.strength,
      c = this.concentration;
    this.H3O = ( -Ka + Math.sqrt( ( Ka * Ka ) + ( 4 * Ka * c ) ) ) / 2;
  };

  function WeakAcidSolution( strength, concentration ) {
    var self = this;
    AqueousSolution.call( this, strength, concentration );

    // set links between concentrations
    this.property( 'H3O' ).link( setSoluteConcentration.bind( this ) );
    this.property( 'concentration' ).link( setSoluteConcentration.bind( this ) );

    this.property( 'strength' ).link( setH3OConcentration.bind( this ) );
    this.property( 'concentration' ).link( setH3OConcentration.bind( this ) );

    this.property( 'H3O' ).link( function( value ) {
      self.product = value; // [A-] = [H3O+]
      self.OH = self.CONSTANTS.WATER_EQUILIBRIUM_CONSTANT / value; // [OH-] = Kw / [H3O+]
    } );

    this.property( 'product' ).link( function( value ) {
      self.H2O = self.CONSTANTS.WATER_CONCENTRATION - value; // [H2O] = W - [A-]
    } );

    this.property( 'strength' ).link( function( strength ) {
      self.isValidStrength = self.CONSTANTS.WEAK_STRENGTH_RANGE.contains( strength );
    } );
  }

  return inherit( AqueousSolution, WeakAcidSolution );
} );
