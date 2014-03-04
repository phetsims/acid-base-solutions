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

  function StrongBaseSolution() {
    var self = this;

    // set default strength and add common properties
    AqueousSolution.call( this, CONSTANTS.STRONG_STRENGTH );

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

  return inherit( AqueousSolution, StrongBaseSolution );
} );
