// Copyright 2002-2014, University of Colorado Boulder

/**
 * Base type for solutions.
 * <p>
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
    Util = require( 'DOT/Util' ),
    ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );

  /**
   * @param {SolutionType} solutionType
   * @param {Array} molecules see this.molecules below
   * @param {*} defaultValues initial values for solution properties
   * @constructor
   */
  function AqueousSolution( solutionType, molecules, defaultValues ) {
    var self = this;

    this.type = solutionType;

    /*
     * Description of molecules that make up this solution.
     * This is an array of objects with these fields.
     * key: string used to identify the molecule, used to look up color or view constructor
     * concentrationPropertyName: name of property that determines concentration of molecule
     */
    this.molecules = molecules;

    PropertySet.call( this, {
      strength: defaultValues.strength || 0,
      // for water concentration is equal to 0, so we should use typeof checking
      concentration: ( typeof (defaultValues.concentration) === 'undefined' ? ABSConstants.CONCENTRATION_RANGE.defaultValue : defaultValues.concentration ),
      soluteConcentration: defaultValues.soluteConcentration || 0, // solute concentration
      productConcentration: defaultValues.productConcentration || 0, // product concentration
      H3OConcentration: defaultValues.H3OConcentration || 0, // H3O concentration
      OHConcentration: defaultValues.OHConcentration || 0, // OH concentration
      H2OConcentration: defaultValues.H2OConcentration || 0, // H2O concentration
      pH: (typeof (defaultValues.H3OConcentration) === 'undefined' ? 0 : getPH( defaultValues.H3OConcentration )), // pH of the solution at equilibrium
      //TODO issue #94 this is never used!
      isValidStrength: defaultValues.isValidStrength || false
    } );

    this.property( 'H3OConcentration' ).link( function( H3OConcentrationValue ) {
      self.pH = getPH( H3OConcentrationValue );
    } );
  }

  var getPH = function( H3OConcentrationValue ) {
    return -Math.round( 100 * Util.log10( H3OConcentrationValue ) ) / 100;
  };

  return inherit( PropertySet, AqueousSolution );
} );
