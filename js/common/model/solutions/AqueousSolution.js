// Copyright 2014-2020, University of Colorado Boulder

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

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import Utils from '../../../../../dot/js/Utils.js';
import acidBaseSolutions from '../../../acidBaseSolutions.js';

class AqueousSolution {

  /**
   * @param {SolutionType} solutionType
   * @param strength the strength of the solute
   * @param concentration the initial concentration of the solute, at the start of the reaction
   * @param {Array} molecules see this.molecules below
   */
  constructor( solutionType, strength, concentration, molecules ) {

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
      ( strength, concentration ) => {
        return -Utils.roundSymmetric( 100 * Utils.log10( this.getH3OConcentration() ) ) / 100;
      } );
  }

  // @public
  reset() {
    this.strengthProperty.reset();
    this.concentrationProperty.reset();
  }

  // @protected convenience function
  getConcentration() {
    return this.concentrationProperty.get();
  }

  // @protected convenience function
  getStrength() {
    return this.strengthProperty.get();
  }

  // @public @abstract These functions must be implemented by subclasses.
  getSoluteConcentration() { throw new Error( 'must be implemented by subtype' ); }

  getProductConcentration() { throw new Error( 'must be implemented by subtype' ); }

  getH3OConcentration() { throw new Error( 'must be implemented by subtype' ); }

  getOHConcentration() { throw new Error( 'must be implemented by subtype' ); }

  getH2OConcentration() { throw new Error( 'must be implemented by subtype' ); }

  // @protected @abstract
  isValidStrength() { throw new Error( 'must be implemented by subtype' ); }
}

acidBaseSolutions.register( 'AqueousSolution', AqueousSolution );
export default AqueousSolution;