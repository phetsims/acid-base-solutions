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
    Solutions = require( 'model/Solutions' ),
    AqueousSolutionAbstract = require( './AqueousSolutionAbstract' ),

  // constants
    CONSTANTS = require( 'model/Constants/Constants' );

  function WaterSolution() {
    var self = this;

    // set default strength, concentration and add common properties
    AqueousSolutionAbstract.call( this, 0, 0 );

    this.type = Solutions.WATER;

    this.relations = [
      {type: 'H2O', property: 'H2OConcentration'},
      {type: 'H3O', property: 'H3OConcentration'},
      {type: 'OH', property: 'OHConcentration'}
    ];

    // set links between concentrations
    this.property( 'H3OConcentration' ).link( function( value ) {
      self.OHConcentration = value; // [OH]=[H3O]
    } );

    // default values
    this.H3OConcentration = Math.sqrt( CONSTANTS.WATER_EQUILIBRIUM_CONSTANT );
    this.H2OConcentration = CONSTANTS.WATER_CONCENTRATION;
  }

  return inherit( AqueousSolutionAbstract, WaterSolution );
} );
