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
    Range = require( 'DOT/Range' );

  function AqueousSolution( strength, concentration ) {
    PropertySet.call( this, {
      strength: strength,
      concentration: concentration,
      solute: 0, // solute concentration
      product: 0, // product concentration
      H3O: 0, // H3O concentration
      OH: 0, // H3O concentration
      H2O: 0, // H2O concentration
      isValidStrength: false
    } );

    this.CONSTANTS = {
      WATER_EQUILIBRIUM_CONSTANT: 1E-14,
      WATER_CONCENTRATION: 55.6, // water concentration when it's used as a solvent, mol/L
      CONCENTRATION_RANGE: new Range( 1E-3, 1, 1E-2 ),
      WEAK_STRENGTH_RANGE: new Range( 1E-10, 1E2, 1E-7 )
    };
  }

  return inherit( PropertySet, AqueousSolution );
} );
