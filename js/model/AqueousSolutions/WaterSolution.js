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
    SolutionTypes = require( 'model/Constants/SolutionTypes' ),
    AqueousSolutionAbstract = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/AqueousSolutionAbstract' ),
    Constants = require( 'ACID_BASE_SOLUTIONS/model/Constants/Constants' );

  // [OH]=[H3O]
  var getOHConcentration = function( H3OConcentration ) {
    return H3OConcentration;
  };

  // constants
  var H2O_CONCENTRATION_DEFAULT = Constants.WATER_CONCENTRATION,
    H3O_CONCENTRATION_DEFAULT = Math.sqrt( Constants.WATER_EQUILIBRIUM_CONSTANT ),
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

    this.type = SolutionTypes.WATER;

    /*
     * Description of molecules that make up this solution.
     * key: string used to identify the molecule, used to look up color or view constructor
     * concentrationPropertyName: name of property that determines concentration of molecule
     */
    this.molecules = [
      {key: 'H2O', concentrationPropertyName: 'H2OConcentration'},
      {key: 'H3O', concentrationPropertyName: 'H3OConcentration'},
      {key: 'OH', concentrationPropertyName: 'OHConcentration'}
    ];

    // set links between concentrations
    this.property( 'H3OConcentration' ).link( function( value ) {
      self.OHConcentration = getOHConcentration( value );
    } );

    // default values
    this.H3OConcentration = Math.sqrt( Constants.WATER_EQUILIBRIUM_CONSTANT );
    this.H2OConcentration = Constants.WATER_CONCENTRATION;
  }

  return inherit( AqueousSolutionAbstract, WaterSolution );
} );
