// Copyright 2014-2023, University of Colorado Boulder

/**
 * AqueousSolution is the abstract base class for solutions.
 *
 * A solution is a homogeneous mixture composed of two or more substances.
 * In such a mixture, a solute is dissolved in another substance, known as a solvent.
 * In an aqueous solution, the solvent is water. The substance that is produced as
 * the result of the solute dissolving is called the product.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '../../../../../axon/js/Disposable.js';
import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import Property from '../../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';
import Utils from '../../../../../dot/js/Utils.js';
import NumberIO from '../../../../../tandem/js/types/NumberIO.js';
import acidBaseSolutions from '../../../acidBaseSolutions.js';
import { SolutionType } from '../SolutionType.js';
import { Particle, ParticleKey } from './Particle.js';
import PickRequired from '../../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../../tandem/js/PhetioObject.js';
import ABSConstants from '../../ABSConstants.js';
import RangeWithValue from '../../../../../dot/js/RangeWithValue.js';

type SelfOptions = {
  solutionType: SolutionType;
  strengthRange: RangeWithValue; // the strength of the solute, with an initial value
  concentrationRange: RangeWithValue; // the concentration of the solute, with an initial value
};

type AqueousSolutionOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default abstract class AqueousSolution {

  public readonly particles: Particle[];
  public readonly solutionType: SolutionType;
  public readonly strengthProperty: Property<number>;
  public readonly concentrationProperty: Property<number>;
  public readonly pHProperty: TReadOnlyProperty<number>;

  /**
   * @param particles - the particles that make up the solution. The order of elements in this array determines the
   *   left-to-right order of bars in the graph, and the front-to-back rendering order of particles in the magnifying glass.
   * @param providedOptions
   */
  protected constructor( particles: Particle[], providedOptions: AqueousSolutionOptions ) {

    const options = providedOptions;

    this.particles = particles;
    this.solutionType = options.solutionType;

    this.strengthProperty = new NumberProperty( options.strengthRange.defaultValue, {
      range: options.strengthRange,
      tandem: options.tandem.createTandem( 'strengthProperty' ),
      phetioReadOnly: ( options.strengthRange.getLength() === 0 ) // read-only if strength is a constant
    } );

    this.concentrationProperty = new NumberProperty( options.concentrationRange.defaultValue, {
      range: options.concentrationRange,
      units: 'mol/L',
      tandem: options.tandem.createTandem( 'concentrationProperty' ),
      phetioReadOnly: ( options.concentrationRange.getLength() === 0 ) // read-only if concentration is a constant
    } );

    this.pHProperty = new DerivedProperty( [ this.strengthProperty, this.concentrationProperty ],
      ( strength, concentration ) => -Utils.roundSymmetric( 100 * Utils.log10( this.getH3OConcentration() ) ) / 100, {
        isValidValue: pH => ABSConstants.PH_RANGE.contains( pH ),
        tandem: options.tandem.createTandem( 'pHProperty' ),
        phetioValueType: NumberIO
      } );
  }

  public dispose(): void {
    Disposable.assertNotDisposable();
  }

  public reset(): void {
    this.strengthProperty.reset();
    this.concentrationProperty.reset();
  }

  public getParticleWithKey( particleKey: ParticleKey ): Particle | null {
    return _.find( this.particles, particle => particle.key === particleKey ) || null;
  }

  public abstract getSoluteConcentration(): number;

  public abstract getProductConcentration(): number;

  public abstract getH3OConcentration(): number;

  public abstract getOHConcentration(): number;

  public abstract getH2OConcentration(): number;
}

acidBaseSolutions.register( 'AqueousSolution', AqueousSolution );