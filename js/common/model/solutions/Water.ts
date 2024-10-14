// Copyright 2014-2023, University of Colorado Boulder

/**
 * Water is a solution of pure water. It contains no solute.
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
type WaterOptions = SelfOptions & StrictOmit<AqueousSolutionOptions, 'strengthRange' | 'concentrationRange' | 'phetioReadOnly'>;

export default class Water extends AqueousSolution {

  public constructor( providedOptions: WaterOptions ) {

    const options = optionize<WaterOptions, SelfOptions, AqueousSolutionOptions>()( {
      strengthRange: ABSConstants.WATER_STRENGTH_RANGE,
      concentrationRange: ABSConstants.WATER_CONCENTRATION_RANGE,
      phetioReadOnly: true
    }, providedOptions );

    // particles found in this solution
    const particles: Particle[] = [
      { key: 'H2O', color: ABSColors.H2O, getConcentration: () => this.getH2OConcentration() },
      { key: 'H3O', color: ABSColors.H3O, getConcentration: () => this.getH3OConcentration() },
      { key: 'OH', color: ABSColors.OH, getConcentration: () => this.getOHConcentration() }
    ];

    super( particles, options );
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
    return this.concentrationProperty.value;
  }
}

acidBaseSolutions.register( 'Water', Water );