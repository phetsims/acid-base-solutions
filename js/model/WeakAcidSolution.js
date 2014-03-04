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
    AqueousSolution = require( './AqueousSolution' ),

  // constants
    CONSTANTS = require( 'model/Constants/Constants' );

  var setSoluteConcentration = function() {
    this.soluteConcentration = this.concentration - this.H3OConcentration; // [HA] = c - [H3O+]
  };

  // [H3O+] = ( -Ka + sqrt( Ka*Ka + 4*Ka*c ) ) / 2
  var setH3OConcentration = function() {
    var Ka = this.strength,
      c = this.concentration;
    this.H3OConcentration = ( -Ka + Math.sqrt( ( Ka * Ka ) + ( 4 * Ka * c ) ) ) / 2;
  };

  function WeakAcidSolution() {
    var self = this;

    // set default strength and add common properties
    AqueousSolution.call( this, CONSTANTS.WEAK_STRENGTH_RANGE.defaultValue );

    // set links between concentrations
    this.property( 'H3OConcentration' ).link( setSoluteConcentration.bind( this ) );
    this.property( 'concentration' ).link( setSoluteConcentration.bind( this ) );

    this.property( 'strength' ).link( setH3OConcentration.bind( this ) );
    this.property( 'concentration' ).link( setH3OConcentration.bind( this ) );

    this.property( 'H3OConcentration' ).link( function( value ) {
      self.productConcentration = value; // [A-] = [H3O+]
      self.OHConcentration = CONSTANTS.WATER_EQUILIBRIUM_CONSTANT / value; // [OH-] = Kw / [H3O+]
    } );

    this.property( 'productConcentration' ).link( function( value ) {
      self.H2OConcentration = CONSTANTS.WATER_CONCENTRATION - value; // [H2O] = W - [A-]
    } );

    this.property( 'strength' ).link( function( strength ) {
      self.isValidStrength = CONSTANTS.WEAK_STRENGTH_RANGE.contains( strength );
    } );
  }

  return inherit( AqueousSolution, WeakAcidSolution );
} );
