// Copyright 2014-2020, University of Colorado Boulder

/**
 *  An aqueous solution whose solute is a strong base.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import acidBaseSolutions from '../../../acidBaseSolutions.js';
import ABSConstants from '../../ABSConstants.js';
import SolutionType from '../../enum/SolutionType.js';
import AqueousSolution from './AqueousSolution.js';

class StrongBaseSolution extends AqueousSolution {

  constructor() {
    super( SolutionType.STRONG_BASE, ABSConstants.STRONG_STRENGTH, ABSConstants.CONCENTRATION_RANGE.defaultValue,
      [
        // molecules found in this solution
        { key: 'MOH', concentrationFunctionName: 'getSoluteConcentration' },
        { key: 'M', concentrationFunctionName: 'getProductConcentration' },
        { key: 'OH', concentrationFunctionName: 'getOHConcentration' }
      ]
    );
  }

  // @override @public [MOH] = 0
  getSoluteConcentration() {
    return 0;
  }

  // @override @public [M+] = c
  getProductConcentration() {
    return this.getConcentration();
  }

  // @override @public [H3O+] = Kw / [OH-]
  getH3OConcentration() {
    return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / this.getOHConcentration();
  }

  // @override @public [OH-] = c
  getOHConcentration() {
    return this.getConcentration();
  }

  // @override @public [H2O] = W
  getH2OConcentration() {
    return ABSConstants.WATER_CONCENTRATION;
  }

  // @override @protected Strong strength is a constant.
  isValidStrength( strength ) {
    return ( strength === ABSConstants.STRONG_STRENGTH );
  }
}

acidBaseSolutions.register( 'StrongBaseSolution', StrongBaseSolution );
export default StrongBaseSolution;