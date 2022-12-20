// Copyright 2014-2022, University of Colorado Boulder

/**
 * StrongAcid is an aqueous solution whose solute is a strong acid.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import acidBaseSolutions from '../../../acidBaseSolutions.js';
import ABSConstants from '../../ABSConstants.js';
import AqueousSolution from './AqueousSolution.js';
import ABSColors from '../../ABSColors.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import { Particle } from './Particle.js';

export default class StrongAcid extends AqueousSolution {

  public constructor( tandem: Tandem ) {

    // particles found in this solution
    const particles: Particle[] = [
      { key: 'HA', color: ABSColors.HA, getConcentration: () => this.getSoluteConcentration() },
      { key: 'H2O', color: ABSColors.H2O, getConcentration: () => this.getH2OConcentration() },
      { key: 'A', color: ABSColors.A, getConcentration: () => this.getProductConcentration() },
      { key: 'H3O', color: ABSColors.H3O, getConcentration: () => this.getH3OConcentration() }
    ];

    super( 'strongAcid', ABSConstants.STRONG_STRENGTH, ABSConstants.CONCENTRATION_RANGE.defaultValue, particles, tandem );
  }

  // [HA] = 0
  public override getSoluteConcentration(): number {
    return 0;
  }

  // [A-] = c
  public override getProductConcentration(): number {
    return this.getConcentration();
  }

  // [H3O+] = c
  public override getH3OConcentration(): number {
    return this.getConcentration();
  }

  // [OH-] = Kw / [H3O+]
  public override getOHConcentration(): number {
    return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / this.getH3OConcentration();
  }

  // [H2O] = W - c
  public override getH2OConcentration(): number {
    return ABSConstants.WATER_CONCENTRATION - this.getConcentration();
  }

  // Strong strength is a constant.
  protected override isValidStrength( strength: number ): boolean {
    return ( strength === ABSConstants.STRONG_STRENGTH );
  }
}

acidBaseSolutions.register( 'StrongAcid', StrongAcid );