// Copyright 2014-2023, University of Colorado Boulder

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

  public constructor( tandem: Tandem, phetioReadOnly = false ) {

    // particles found in this solution
    const particles: Particle[] = [
      { key: 'HA', colorProperty: ABSColors.particleHAColorProperty, getConcentration: () => this.getSoluteConcentration() },
      { key: 'H2O', colorProperty: ABSColors.particleH2OColorProperty, getConcentration: () => this.getH2OConcentration() },
      { key: 'A', colorProperty: ABSColors.particleAColorProperty, getConcentration: () => this.getProductConcentration() },
      { key: 'H3O', colorProperty: ABSColors.particleH3OColorProperty, getConcentration: () => this.getH3OConcentration() }
    ];

    super( particles, {
      strengthRange: ABSConstants.STRONG_STRENGTH_RANGE,
      concentrationRange: ABSConstants.CONCENTRATION_RANGE,
      tandem: tandem,
      phetioReadOnly: phetioReadOnly
    } );
  }

  // [HA] = 0
  public override getSoluteConcentration(): number {
    return 0;
  }

  // [A-] = c
  public override getProductConcentration(): number {
    return this.concentrationProperty.value;
  }

  // [H3O+] = c
  public override getH3OConcentration(): number {
    return this.concentrationProperty.value;
  }

  // [OH-] = Kw / [H3O+]
  public override getOHConcentration(): number {
    return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / this.getH3OConcentration();
  }

  // [H2O] = W - c
  public override getH2OConcentration(): number {
    return ABSConstants.WATER_CONCENTRATION - this.concentrationProperty.value;
  }
}

acidBaseSolutions.register( 'StrongAcid', StrongAcid );