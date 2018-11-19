// Copyright 2014-2018, University of Colorado Boulder

/**
 * Base type for solutions.
 *
 * A solution is a homogeneous mixture composed of two or more substances.
 * In such a mixture, a solute is dissolved in another substance, known as a solvent.
 * In an aqueous solution, the solvent is water. The substance that is produced as
 * the result of the solute dissolving is called the product.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Util = require( 'DOT/Util' );

  /**
   * @param {SolutionType} solutionType
   * @param strength the strength of the solute
   * @param concentration the initial concentration of the solute, at the start of the reaction
   * @param {Array} molecules see this.molecules below
   * @constructor
   */
  function AqueousSolution( solutionType, strength, concentration, molecules ) {

    var self = this;

    this.type = solutionType; // @public

    /*
     * Description of molecules that make up this solution.
     * Each element in the array has this structure:
     *
     * {
     *   {string} key: string used to identify the molecule, used to look up color or view constructor
     *   {string} concentrationFunctionName: name of function that computes concentration of the molecule
     * }
     *
     * The order of elements in this array determines the left-to-right order of bars in the graph,
     * and the front-to-back rendering order of molecules in the magnifier.
     */
    this.molecules = molecules; // @public

    this.strengthProperty = new NumberProperty( strength ); // @public
    this.concentrationProperty = new NumberProperty( concentration ); // @public

    // @public
    this.pHProperty = new DerivedProperty( [ this.strengthProperty, this.concentrationProperty ],
      function( strength, concentration ) {
        return -Math.round( 100 * Util.log10( self.getH3OConcentration() ) ) / 100;
      } );
  }

  acidBaseSolutions.register( 'AqueousSolution', AqueousSolution );

  return inherit( Object, AqueousSolution, {

    // @public
    reset: function() {
      this.strengthProperty.reset();
      this.concentrationProperty.reset();
    },

    // @protected convenience function
    getConcentration: function() {
      return this.concentrationProperty.get();
    },

    // @protected convenience function
    getStrength: function() {
      return this.strengthProperty.get();
    },

    // @public These functions must be implemented by subtypes.
    getSoluteConcentration: function() { throw new Error( 'must be implemented by subtype' ); },
    getProductConcentration: function() { throw new Error( 'must be implemented by subtype' ); },
    getH3OConcentration: function() { throw new Error( 'must be implemented by subtype' ); },
    getOHConcentration: function() { throw new Error( 'must be implemented by subtype' ); },
    getH2OConcentration: function() { throw new Error( 'must be implemented by subtype' ); },
    isValidStrength: function() { throw new Error( 'must be implemented by subtype' ); }
  } );
} );
