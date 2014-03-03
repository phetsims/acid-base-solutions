// Copyright 2002-2013, University of Colorado Boulder

/**
 *  An aqueous solution whose solute is a strong base.
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

  function StrongBaseSolution( strength, concentration ) {
    var self = this;
    AqueousSolution.call( this, strength, concentration );

    // set links between concentrations
    this.property( 'concentration' ).link( function( value ) {
      self.productConcentration = value; // [M+] = c
      self.OHConcentration = value; // [OH-] = c
    } );

    this.property( 'OHConcentration' ).link( function( value ) {
      self.H3OConcentration = CONSTANTS.WATER_EQUILIBRIUM_CONSTANT / value; // [H3O+] = Kw / [OH-]
    } );

    this.property( 'strength' ).link( function( strength ) {
      self.isValidStrength = strength > CONSTANTS.CONCENTRATION_RANGE.max;
    } );
  }

  return inherit( AqueousSolution, StrongBaseSolution, {
    init: function() {
      this.strength = CONSTANTS.STRONG_STRENGTH;
      this.concentration = CONSTANTS.CONCENTRATION_RANGE.defaultValue;
    }
  } );
} );
