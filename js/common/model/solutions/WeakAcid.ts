// Copyright 2014-2023, University of Colorado Boulder

/**
 * WeakAcid is an aqueous solution whose solute is a weak acid.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import acidBaseSolutions from '../../../acidBaseSolutions.js';
import ABSConstants from '../../ABSConstants.js';
import AqueousSolution, { AqueousSolutionOptions } from './AqueousSolution.js';
import ABSColors from '../../ABSColors.js';
import { Particle } from './Particle.js';
import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = EmptySelfOptions;
type WeakAcidOptions = SelfOptions & StrictOmit<AqueousSolutionOptions, 'strengthRange' | 'concentrationRange'>;

export default class WeakAcid extends AqueousSolution {

  public constructor( providedOptions: WeakAcidOptions ) {

    const options = optionize<WeakAcidOptions, SelfOptions, AqueousSolutionOptions>()( {
      strengthRange: ABSConstants.WEAK_STRENGTH_RANGE,
      concentrationRange: ABSConstants.CONCENTRATION_RANGE
    }, providedOptions );

    // particles found in this solution
    const particles: Particle[] = [
      { key: 'HA', color: ABSColors.HA, getConcentration: () => this.getSoluteConcentration() },
      { key: 'H2O', color: ABSColors.H2O, getConcentration: () => this.getH2OConcentration() },
      { key: 'A', color: ABSColors.A, getConcentration: () => this.getProductConcentration() },
      { key: 'H3O', color: ABSColors.H3O, getConcentration: () => this.getH3OConcentration() }
    ];

    super( particles, options );
  }

  // [HA] = c - [H3O+]
  public override getSoluteConcentration(): number {
    return ( this.concentrationProperty.value - this.getH3OConcentration() );
  }

  // [A-] = [H3O+]
  public override getProductConcentration(): number {
    return this.getH3OConcentration();
  }

  // [H3O+] = ( -Ka + sqrt( Ka*Ka + 4*Ka*c ) ) / 2
  public override getH3OConcentration(): number {
    const Ka = this.strengthProperty.value;
    const c = this.concentrationProperty.value;
    return ( -Ka + Math.sqrt( ( Ka * Ka ) + ( 4 * Ka * c ) ) ) / 2;
  }

  // [OH-] = Kw / [H3O+]
  public override getOHConcentration(): number {
    return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / this.getH3OConcentration();
  }

  // [H2O] = W - [A-]
  public override getH2OConcentration(): number {
    return ( ABSConstants.WATER_CONCENTRATION - this.getProductConcentration() );
  }
}

acidBaseSolutions.register( 'WeakAcid', WeakAcid );