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
    Solutions = require( 'model/Constants/Solutions' ),
    AqueousSolutionAbstract = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/AqueousSolutionAbstract' ),

  // [OH]=[H3O]
    getOHConcentration = function( H3OConcentration ) {
      return H3OConcentration;
    },

  // constants
    CONSTANTS = require( 'model/Constants/Constants' ),
    H2O_CONCENTRATION_DEFAULT = CONSTANTS.WATER_CONCENTRATION,
    H3O_CONCENTRATION_DEFAULT = Math.sqrt( CONSTANTS.WATER_EQUILIBRIUM_CONSTANT ),
    OH_CONCENTRATION_DEFAULT = getOHConcentration( H3O_CONCENTRATION_DEFAULT );

  function WaterSolution() {
    var self = this;

    // set default strength, concentration and add common properties
    AqueousSolutionAbstract.call( this, {
      concentration: 0,
      OHConcentration: OH_CONCENTRATION_DEFAULT,
      H2OConcentration: H2O_CONCENTRATION_DEFAULT,
      H3OConcentration: H3O_CONCENTRATION_DEFAULT
    } );

    this.type = Solutions.WATER;

    /* array with molecules which will be shown in magnifier and concentration chart bar
     *
     * type: type of molecule. Need to determine color or necessary view constructor
     * property: name of property for observing concentration of molecule
     */
    this.relations = [
      {type: 'H2O', property: 'H2OConcentration'},
      {type: 'H3O', property: 'H3OConcentration'},
      {type: 'OH', property: 'OHConcentration'}
    ];

    // set links between concentrations
    this.property( 'H3OConcentration' ).link( function( value ) {
      self.OHConcentration = getOHConcentration( value );
    } );

    // default values
    this.H3OConcentration = Math.sqrt( CONSTANTS.WATER_EQUILIBRIUM_CONSTANT );
    this.H2OConcentration = CONSTANTS.WATER_CONCENTRATION;
  }

  return inherit( AqueousSolutionAbstract, WaterSolution );
} );
