// Copyright 2014-2022, University of Colorado Boulder

/**
 *  Water is a solution of pure water. It contains no solute.
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

export default class Water extends AqueousSolution {

  public constructor( tandem: Tandem ) {

    // particles found in this solution
    const particles: Particle[] = [
      { key: 'H2O', color: ABSColors.H2O, getConcentration: () => this.getH2OConcentration() },
      { key: 'H3O', color: ABSColors.H3O, getConcentration: () => this.getH3OConcentration() },
      { key: 'OH', color: ABSColors.OH, getConcentration: () => this.getOHConcentration() }
    ];

    super( 'water', 0, 0, particles, tandem );
  }

  public override getSoluteConcentration(): number {
    return 0;
  }

  public override getProductConcentration(): number {
    return 0;
  }

  // [H3O] = sqrt(Kw)
  public override getH3OConcentration(): number {
    return Math.sqrt( ABSConstants.WATER_EQUILIBRIUM_CONSTANT ); // Kw = [H30] * [OH-]
  }

  // [OH] = [H3O]
  public override getOHConcentration(): number {
    return this.getH3OConcentration();
  }

  // [H2O] = W
  public override getH2OConcentration(): number {
    return ABSConstants.WATER_CONCENTRATION;
  }

  // Should never be setting the strength of water.
  protected override isValidStrength( strength: number ): boolean {
    return false;
  }
}

acidBaseSolutions.register( 'Water', Water );