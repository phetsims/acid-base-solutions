// Copyright 2002-2013, University of Colorado Boulder

/**
 *  A solution of pure water, contains no solute.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    AqueousSolution = require( './AqueousSolution' );

  function WaterSolution( strength, concentration ) {
    var self = this;
    AqueousSolution.call( this, strength, concentration );

    // set links between concentrations
    this.property( 'H3O' ).link( function( value ) {
      self.OH = value; // [OH]=[H3O]
    } );

    // default values
    this.H3O = Math.sqrt( this.CONSTANTS.WATER_EQUILIBRIUM_CONSTANT );
    this.H2O = this.CONSTANTS.WATER_CONCENTRATION;
  }

  return inherit( AqueousSolution, WaterSolution );
} );
