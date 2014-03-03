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
    PropertySet = require( 'AXON/PropertySet' );

  function AqueousSolution( CONSTANTS ) {
    var self = this;
    this.CONSTANTS = CONSTANTS;

    PropertySet.call( this, {
      strength: 0,
      concentration: 0,
      solute: 0, // solute concentration
      product: 0, // product concentration
      H3O: 0, // H3O concentration
      OH: 0, // OH concentration
      H2O: 0, // H2O concentration
      pH: 0, // pH of the solution at equilibrium
      isValidStrength: false
    } );

    this.property( 'H3O' ).link( function( value ) {
      self.pH = -Math.round( 100 * Math.log( value ) / Math.LN10 ) / 100;
    } );

    // arbitrary, but needs to be greater than weak range
    this.CONSTANTS.STRONG_STRENGTH = this.CONSTANTS.WEAK_STRENGTH_RANGE.max + 1;
  }

  return inherit( PropertySet, AqueousSolution, {
    init: function() {}
  } );
} );
