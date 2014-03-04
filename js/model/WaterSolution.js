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
    AqueousSolution = require( './AqueousSolution' ),

  // constants
    CONSTANTS = require( 'model/Constants/Constants' );

  function WaterSolution() {
    var self = this;

    // set default strength, concentration and add common properties
    AqueousSolution.call( this, 0, 0 );

    // set links between concentrations
    this.property( 'H3OConcentration' ).link( function( value ) {
      self.OHConcentration = value; // [OH]=[H3O]
    } );

    // default values
    this.H3OConcentration = Math.sqrt( CONSTANTS.WATER_EQUILIBRIUM_CONSTANT );
    this.H2OConcentration = CONSTANTS.WATER_CONCENTRATION;
  }

  return inherit( AqueousSolution, WaterSolution );
} );
