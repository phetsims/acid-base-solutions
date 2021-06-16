// Copyright 2014-2021, University of Colorado Boulder

/**
 * StrongAcid is an aqueous solution whose solute is a strong acid.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import acidBaseSolutions from '../../../acidBaseSolutions.js';
import ABSConstants from '../../ABSConstants.js';
import SolutionType from '../../enum/SolutionType.js';
import AqueousSolution from './AqueousSolution.js';

class StrongAcid extends AqueousSolution {

  constructor() {
    super( SolutionType.STRONG_ACID, ABSConstants.STRONG_STRENGTH, ABSConstants.CONCENTRATION_RANGE.defaultValue,
      [
        // molecules found in this solution
        { key: 'HA', concentrationFunctionName: 'getSoluteConcentration' },
        { key: 'H2O', concentrationFunctionName: 'getH2OConcentration' },
        { key: 'A', concentrationFunctionName: 'getProductConcentration' },
        { key: 'H3O', concentrationFunctionName: 'getH3OConcentration' }
      ]
    );
  }

  // @override @public [HA] = 0
  getSoluteConcentration() {
    return 0;
  }

  // @override @public [A-] = c
  getProductConcentration() {
    return this.getConcentration();
  }

  // @override @public [H3O+] = c
  getH3OConcentration() {
    return this.getConcentration();
  }

  // @override @public [OH-] = Kw / [H3O+]
  getOHConcentration() {
    return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / this.getH3OConcentration();
  }

  // @override @public [H2O] = W - c
  getH2OConcentration() {
    return ABSConstants.WATER_CONCENTRATION - this.getConcentration();
  }

  // @override @protected Strong strength is a constant.
  isValidStrength( strength ) {
    return ( strength === ABSConstants.STRONG_STRENGTH );
  }
}

acidBaseSolutions.register( 'StrongAcid', StrongAcid );
export default StrongAcid;