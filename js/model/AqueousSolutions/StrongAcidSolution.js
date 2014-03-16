// Copyright 2002-2013, University of Colorado Boulder

/**
 *  An aqueous solution whose solute is a strong acid.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Solutions = require( 'model/Solutions' ),
    AqueousSolutionAbstract = require( './AqueousSolutionAbstract' ),

  // constants
    CONSTANTS = require( 'model/Constants/Constants' );

  function StrongAcidSolution() {
    var self = this;

    // set default strength and add common properties
    AqueousSolutionAbstract.call( this, CONSTANTS.STRONG_STRENGTH );

    this.type = Solutions.STRONG_ACID;

    this.relations = [
      {type: 'HA', property: 'soluteConcentration'},
      {type: 'H2O', property: 'H2OConcentration'},
      {type: 'A', property: 'productConcentration'},
      {type: 'H3O', property: 'H3OConcentration'}
    ];

    // set links between concentrations
    this.property( 'concentration' ).link( function( value ) {
      self.productConcentration = value; // [A-] = c
      self.H3OConcentration = value; // [H3O+] = c
      self.H2OConcentration = CONSTANTS.WATER_CONCENTRATION - value; // [H2O] = W - c
    } );

    this.property( 'H3OConcentration' ).link( function( value ) {
      self.OHConcentration = CONSTANTS.WATER_EQUILIBRIUM_CONSTANT / value; // [OH-] = Kw / [H3O+]
    } );

    this.property( 'strength' ).link( function( strength ) {
      self.isValidStrength = strength > CONSTANTS.CONCENTRATION_RANGE.max;
    } );
  }

  return inherit( AqueousSolutionAbstract, StrongAcidSolution );
} );
