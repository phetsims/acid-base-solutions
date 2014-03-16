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
    Solutions = require( 'model/Solutions' ),
    AqueousSolutionAbstract = require( './AqueousSolutionAbstract' ),

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
    AqueousSolutionAbstract.call( this, CONSTANTS.WEAK_STRENGTH_RANGE.defaultValue );

    this.type = Solutions.WEAK_BASE;

    this.relations = [
      {type: 'B', property: 'soluteConcentration'},
      {type: 'H2O', property: 'H2OConcentration'},
      {type: 'BH', property: 'productConcentration'},
      {type: 'OH', property: 'OHConcentration'}
    ];

    // set links between concentrations
    this.property( 'OHConcentration' ).lazyLink( function( value ) {
      self.H3OConcentration = CONSTANTS.WATER_EQUILIBRIUM_CONSTANT / value; // [H3O+] = Kw / [OH-]
    } );

    this.property( 'productConcentration' ).lazyLink( function( value ) {
      self.OHConcentration = value; // [OH-] = [BH+]
      self.H2OConcentration = CONSTANTS.WATER_CONCENTRATION - value; // [H2O] = W - [BH+]
    } );

    this.property( 'productConcentration' ).lazyLink( setSoluteConcentration.bind( this ) );
    this.property( 'concentration' ).lazyLink( setSoluteConcentration.bind( this ) );

    this.property( 'strength' ).lazyLink( setProductConcentration.bind( this ) );
    this.property( 'concentration' ).link( setProductConcentration.bind( this ) );

    this.property( 'strength' ).link( function( strength ) {
      self.isValidStrength = CONSTANTS.WEAK_STRENGTH_RANGE.contains( strength );
    } );
  }

  return inherit( AqueousSolutionAbstract, WeakBaseSolution );
} );
