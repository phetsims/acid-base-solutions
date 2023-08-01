// Copyright 2014-2023, University of Colorado Boulder

/**
 * WeakAcid is an aqueous solution whose solute is a weak acid.
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

export default class WeakAcid extends AqueousSolution {

  public constructor( tandem: Tandem, phetioReadOnly = false ) {

    // particles found in this solution
    const particles: Particle[] = [
      { key: 'HA', colorProperty: ABSColors.particleHAColorProperty, getConcentration: () => this.getSoluteConcentration() },
      { key: 'H2O', colorProperty: ABSColors.particleH2OColorProperty, getConcentration: () => this.getH2OConcentration() },
      { key: 'A', colorProperty: ABSColors.particleAColorProperty, getConcentration: () => this.getProductConcentration() },
      { key: 'H3O', colorProperty: ABSColors.particleH3OColorProperty, getConcentration: () => this.getH3OConcentration() }
    ];

    super( particles, {
      strengthRange: ABSConstants.WEAK_STRENGTH_RANGE,
      concentrationRange: ABSConstants.CONCENTRATION_RANGE,
      tandem: tandem,
      phetioReadOnly: phetioReadOnly
    } );
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