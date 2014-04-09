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
  var ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Util = require( 'DOT/Util' );

  var computePH = function( H3OConcentrationValue ) {
    return -Math.round( 100 * Util.log10( H3OConcentrationValue ) ) / 100;
  };

  /**
   * @param {SolutionType} solutionType
   * @param {Array} molecules see this.molecules below
   * @param {*} initialValues initial values for solution properties
   * @constructor
   */
  function AqueousSolution( solutionType, molecules, initialValues ) {

    this.type = solutionType;

    /*
     * Description of molecules that make up this solution.
     * This is an array of objects with these fields.
     * key: string used to identify the molecule, used to look up color or view constructor
     * concentrationPropertyName: name of property that determines concentration of molecule
     */
    this.molecules = molecules;

    // all initial values are required! see issue #99
    assert && assert( initialValues.hasOwnProperty( 'strength' ) );
    assert && assert( initialValues.hasOwnProperty( 'concentration' ) );
    assert && assert( initialValues.hasOwnProperty( 'soluteConcentration' ) );
    assert && assert( initialValues.hasOwnProperty( 'productConcentration' ) );
    assert && assert( initialValues.hasOwnProperty( 'H3OConcentration' ) );
    assert && assert( initialValues.hasOwnProperty( 'OHConcentration' ) );
    assert && assert( initialValues.hasOwnProperty( 'H2OConcentration' ) );

    PropertySet.call( this, {
      strength: initialValues.strength,
      concentration: initialValues.concentration,
      soluteConcentration: initialValues.soluteConcentration,
      productConcentration: initialValues.productConcentration,
      H3OConcentration: initialValues.H3OConcentration,
      OHConcentration: initialValues.OHConcentration,
      H2OConcentration: initialValues.H2OConcentration,
      pH: computePH( initialValues.H3OConcentration ) // pH of the solution at equilibrium
    } );

    var self = this;
    this.property( 'H3OConcentration' ).link( function( H3OConcentrationValue ) {
      self.pH = computePH( H3OConcentrationValue );
    } );
  }

  return inherit( PropertySet, AqueousSolution );
} );
