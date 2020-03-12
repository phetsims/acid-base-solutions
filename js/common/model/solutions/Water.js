// Copyright 2014-2020, University of Colorado Boulder

/**
 *  Water is a solution of pure water. It contains no solute.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import acidBaseSolutions from '../../../acidBaseSolutions.js';
import ABSConstants from '../../ABSConstants.js';
import SolutionType from '../../enum/SolutionType.js';
import AqueousSolution from './AqueousSolution.js';

class Water extends AqueousSolution {

  constructor() {
    super( SolutionType.WATER, 0, 0,
      [
        // molecules found in this solution
        { key: 'H2O', concentrationFunctionName: 'getH2OConcentration' },
        { key: 'H3O', concentrationFunctionName: 'getH3OConcentration' },
        { key: 'OH', concentrationFunctionName: 'getOHConcentration' }
      ]
    );
  }

  // @override @public
  getSoluteConcentration() {
    return 0;
  }

  // @override @public
  getProductConcentration() {
    return 0;
  }

  // @override @public [H3O] = sqrt(Kw)
  getH3OConcentration() {
    return Math.sqrt( ABSConstants.WATER_EQUILIBRIUM_CONSTANT ); // Kw = [H30] * [OH-]
  }

  // @override @public [OH] = [H3O]
  getOHConcentration() {
    return this.getH3OConcentration();
  }

  // @override @public [H2O] = W
  getH2OConcentration() {
    return ABSConstants.WATER_CONCENTRATION;
  }

  // @override @protected Should never be setting the strength of water.
  isValidStrength() { return false; }
}

acidBaseSolutions.register( 'WaterSolution', Water );
export default Water;