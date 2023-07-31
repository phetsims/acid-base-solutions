// Copyright 2014-2022, University of Colorado Boulder

/**
 * WeakBase is an aqueous solution whose solute is a weak base.
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

export default class WeakBase extends AqueousSolution {

  public constructor( tandem: Tandem, phetioReadOnly = false ) {

    // particles found in this solution
    const particles: Particle[] = [
      { key: 'B', color: ABSColors.B, getConcentration: () => this.getSoluteConcentration() },
      { key: 'H2O', color: ABSColors.H2O, getConcentration: () => this.getH2OConcentration() },
      { key: 'BH', color: ABSColors.BH, getConcentration: () => this.getProductConcentration() },
      { key: 'OH', color: ABSColors.OH, getConcentration: () => this.getOHConcentration() }
    ];

    super( particles, {
      strengthRange: ABSConstants.WEAK_STRENGTH_RANGE,
      concentrationRange: ABSConstants.CONCENTRATION_RANGE,
      tandem: tandem,
      phetioReadOnly: phetioReadOnly
    } );
  }

  // [B] = c - [BH+]
  public override getSoluteConcentration(): number {
    return ( this.concentrationProperty.value - this.getProductConcentration() );
  }

  // [BH+] = ( -Kb + sqrt( Kb*Kb + 4*Kb*c ) ) / 2
  public override getProductConcentration(): number {
    const Kb = this.strengthProperty.value;
    const c = this.concentrationProperty.value;
    return ( -Kb + Math.sqrt( ( Kb * Kb ) + ( 4 * Kb * c ) ) ) / 2;
  }

  // [H3O+] = Kw / [OH-]
  public override getH3OConcentration(): number {
    return ABSConstants.WATER_EQUILIBRIUM_CONSTANT / this.getOHConcentration();
  }

  // [OH-] = [BH+]
  public override getOHConcentration(): number {
    return this.getProductConcentration();
  }

  // [H2O] = W - [BH+]
  public override getH2OConcentration(): number {
    return ( ABSConstants.WATER_CONCENTRATION - this.getProductConcentration() );
  }
}

acidBaseSolutions.register( 'WeakBase', WeakBase );