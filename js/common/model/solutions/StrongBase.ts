// Copyright 2014-2024, University of Colorado Boulder

/**
 * StrongBase is an aqueous solution whose solute is a strong base.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../../phet-core/js/types/StrictOmit.js';
import acidBaseSolutions from '../../../acidBaseSolutions.js';
import ABSColors from '../../ABSColors.js';
import ABSConstants from '../../ABSConstants.js';
import AqueousSolution, { AqueousSolutionOptions } from './AqueousSolution.js';
import { Particle } from './Particle.js';

type SelfOptions = EmptySelfOptions;
type StrongBaseOptions = SelfOptions & StrictOmit<AqueousSolutionOptions, 'strengthRange' | 'concentrationRange'>;

export default class StrongBase extends AqueousSolution {

  public constructor( providedOptions: StrongBaseOptions ) {

    const options = optionize<StrongBaseOptions, SelfOptions, AqueousSolutionOptions>()( {
      strengthRange: ABSConstants.STRONG_STRENGTH_RANGE,
      concentrationRange: ABSConstants.CONCENTRATION_RANGE
    }, providedOptions );

    // particles found in this solution
    const particles: Particle[] = [
      { key: 'MOH', color: ABSColors.MOH, getConcentration: () => this.getSoluteConcentration() },
      { key: 'M', color: ABSColors.M, getConcentration: () => this.getProductConcentration() },
      { key: 'OH', color: ABSColors.OH, getConcentration: () => this.getOHConcentration() }
    ];

    super( particles, options );
  }

  // [MOH] = 0
  public override getSoluteConcentration(): number {
    return 0;
  }

  // [M+] = c
  public override getProductConcentration(): number {
    return this.concentrationProperty.value;
  }

  // [H3O+] = Kw / [OH-]
  public override getH3OConcentration(): number {
    return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / this.getOHConcentration();
  }

  // [OH-] = c
  public override getOHConcentration(): number {
    return this.concentrationProperty.value;
  }

  // [H2O] = W
  public override getH2OConcentration(): number {
    return ABSConstants.WATER_CONCENTRATION;
  }
}

acidBaseSolutions.register( 'StrongBase', StrongBase );