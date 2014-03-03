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

  // constants
    CONSTANTS = require( 'model/Constants/Constants' );

  function AqueousSolution() {
    var self = this;

    PropertySet.call( this, {
      strength: 0,
      concentration: 0,
      soluteConcentration: 0, // solute concentration
      productConcentration: 0, // product concentration
      H3OConcentration: 0, // H3O concentration
      OHConcentration: 0, // OH concentration
      H2OConcentration: 0, // H2O concentration
      pH: 0, // pH of the solution at equilibrium
      isValidStrength: false
    } );

    this.property( 'H3OConcentration' ).link( function( value ) {
      self.pH = -Math.round( 100 * Math.log( value ) / Math.LN10 ) / 100;
    } );

    // arbitrary, but needs to be greater than weak range
    CONSTANTS.STRONG_STRENGTH = CONSTANTS.WEAK_STRENGTH_RANGE.max + 1;
  }

  return inherit( PropertySet, AqueousSolution, {
    init: function() {}
  } );
} );
