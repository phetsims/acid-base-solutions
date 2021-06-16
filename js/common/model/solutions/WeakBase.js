// Copyright 2014-2020, University of Colorado Boulder

/**
 * WeakBase is an aqueous solution whose solute is a weak base.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import acidBaseSolutions from '../../../acidBaseSolutions.js';
import ABSConstants from '../../ABSConstants.js';
import SolutionType from '../../enum/SolutionType.js';
import AqueousSolution from './AqueousSolution.js';

class WeakBase extends AqueousSolution {

  constructor() {
    super( SolutionType.WEAK_BASE, ABSConstants.WEAK_STRENGTH_RANGE.defaultValue, ABSConstants.CONCENTRATION_RANGE.defaultValue,
      [
        // molecules found in this solution
        { key: 'B', concentrationFunctionName: 'getSoluteConcentration' },
        { key: 'H2O', concentrationFunctionName: 'getH2OConcentration' },
        { key: 'BH', concentrationFunctionName: 'getProductConcentration' },
        { key: 'OH', concentrationFunctionName: 'getOHConcentration' }
      ] );
  }

  // @override @public [B] = c - [BH+]
  getSoluteConcentration() {
    return ( this.getConcentration() - this.getProductConcentration() );
  }

  // @override @public [BH+] = ( -Kb + sqrt( Kb*Kb + 4*Kb*c ) ) / 2
  getProductConcentration() {
    const Kb = this.getStrength();
    const c = this.getConcentration();
    return ( -Kb + Math.sqrt( ( Kb * Kb ) + ( 4 * Kb * c ) ) ) / 2;
  }

  // @override @public [H3O+] = Kw / [OH-]
  getH3OConcentration() {
    return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / this.getOHConcentration();
  }

  // @override @public [OH-] = [BH+]
  getOHConcentration() {
    return this.getProductConcentration();
  }

  // @override @public [H2O] = W - [BH+]
  getH2OConcentration() {
    return ( ABSConstants.WATER_CONCENTRATION - this.getProductConcentration() );
  }

  // @override @protected Is strength in the weak range?
  isValidStrength( strength ) {
    return ABSConstants.WEAK_STRENGTH_RANGE.contains( strength );
  }
}

acidBaseSolutions.register( 'WeakBase', WeakBase );
export default WeakBase;