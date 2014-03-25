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
    SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' ),
    AqueousSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/AqueousSolution' ),
    ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );

  // [OH]=[H3O]
  var getOHConcentration = function( H3OConcentration ) {
    return H3OConcentration;
  };

  // constants
  var H2O_CONCENTRATION_DEFAULT = ABSConstants.WATER_CONCENTRATION,
    H3O_CONCENTRATION_DEFAULT = Math.sqrt( ABSConstants.WATER_EQUILIBRIUM_CONSTANT ),
    OH_CONCENTRATION_DEFAULT = getOHConcentration( H3O_CONCENTRATION_DEFAULT );

  function WaterSolution() {
    var self = this;

    // set default strength, concentration and add common properties
    AqueousSolution.call( this, SolutionType.WATER,
      [
        // molecules found in this solution
        {key: 'H2O', concentrationPropertyName: 'H2OConcentration'},
        {key: 'H3O', concentrationPropertyName: 'H3OConcentration'},
        {key: 'OH', concentrationPropertyName: 'OHConcentration'}
      ],
      {
        // initial values for solution properties
        concentration: 0,
        OHConcentration: OH_CONCENTRATION_DEFAULT,
        H2OConcentration: H2O_CONCENTRATION_DEFAULT,
        H3OConcentration: H3O_CONCENTRATION_DEFAULT
      } );

    // set links between concentrations
    this.property( 'H3OConcentration' ).link( function( value ) {
      self.OHConcentration = getOHConcentration( value );
    } );

    // default values
    this.H3OConcentration = Math.sqrt( ABSConstants.WATER_EQUILIBRIUM_CONSTANT );
    this.H2OConcentration = ABSConstants.WATER_CONCENTRATION;
  }

  return inherit( AqueousSolution, WaterSolution );
} );
