// Copyright 2014-2021, University of Colorado Boulder

/**
 * StrongBase is an aqueous solution whose solute is a strong base.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import acidBaseSolutions from '../../../acidBaseSolutions.js';
import ABSConstants from '../../ABSConstants.js';
import AqueousSolution from './AqueousSolution.js';

export default class StrongBase extends AqueousSolution {

  public constructor() {
    super( 'strongBase', ABSConstants.STRONG_STRENGTH, ABSConstants.CONCENTRATION_RANGE.defaultValue,
      [
        // molecules found in this solution
        { key: 'MOH', getConcentration: () => this.getSoluteConcentration() },
        { key: 'M', getConcentration: () => this.getProductConcentration() },
        { key: 'OH', getConcentration: () => this.getOHConcentration() }
      ]
    );
  }

  // [MOH] = 0
  public override getSoluteConcentration(): number {
    return 0;
  }

  // [M+] = c
  public override getProductConcentration(): number {
    return this.getConcentration();
  }

  // [H3O+] = Kw / [OH-]
  public override getH3OConcentration(): number {
    return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / this.getOHConcentration();
  }

  // [OH-] = c
  public override getOHConcentration(): number {
    return this.getConcentration();
  }

  // [H2O] = W
  public override getH2OConcentration(): number {
    return ABSConstants.WATER_CONCENTRATION;
  }

  // Strong strength is a constant.
  protected override isValidStrength( strength: number ): boolean {
    return ( strength === ABSConstants.STRONG_STRENGTH );
  }
}

acidBaseSolutions.register( 'StrongBase', StrongBase );