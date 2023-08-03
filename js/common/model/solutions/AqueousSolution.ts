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

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import Property from '../../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../../axon/js/TReadOnlyProperty.js';
import Utils from '../../../../../dot/js/Utils.js';
import NumberIO from '../../../../../tandem/js/types/NumberIO.js';
import acidBaseSolutions from '../../../acidBaseSolutions.js';
import { Particle, ParticleKey } from './Particle.js';
import PickRequired from '../../../../../phet-core/js/types/PickRequired.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../../tandem/js/PhetioObject.js';
import ABSConstants from '../../ABSConstants.js';
import RangeWithValue from '../../../../../dot/js/RangeWithValue.js';
import IOType from '../../../../../tandem/js/types/IOType.js';
import ReferenceIO, { ReferenceIOState } from '../../../../../tandem/js/types/ReferenceIO.js';
import optionize from '../../../../../phet-core/js/optionize.js';

type SelfOptions = {
  strengthRange: RangeWithValue; // the strength of the solute, with an initial value
  concentrationRange: RangeWithValue; // the concentration of the solute, with an initial value, in mol/L
};

type AqueousSolutionOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem' | 'phetioReadOnly'>;

export type AqueousSolutionStateObject = ReferenceIOState; // because AqueousSolutionIO is a subtype of ReferenceIO

export default abstract class AqueousSolution extends PhetioObject {

  // The particles that make up the solution. The order of elements in this array determines the left-to-right order
  // of bars in the graph, and the front-to-back rendering order of particles in the magnifying glass.
  public readonly particles: Particle[];

  public readonly strengthProperty: Property<number>;
  public readonly concentrationProperty: Property<number>;
  public readonly pHProperty: TReadOnlyProperty<number>;

  protected constructor( particles: Particle[], providedOptions: AqueousSolutionOptions ) {

    const options = optionize<AqueousSolutionOptions, SelfOptions, PhetioObjectOptions>()( {

      // PhetioObjectOptions
      isDisposable: false,
      phetioType: AqueousSolution.AqueousSolutionIO,
      phetioState: false
    }, providedOptions );

    super( options );

    this.particles = particles;

    this.strengthProperty = new NumberProperty( options.strengthRange.defaultValue, {
      range: options.strengthRange,
      tandem: options.tandem.createTandem( 'strengthProperty' ),

      // read-only if solution is read-only, or if strength is a constant
      phetioReadOnly: options.phetioReadOnly || ( options.strengthRange.getLength() === 0 )
    } );

    this.concentrationProperty = new NumberProperty( options.concentrationRange.defaultValue, {
      range: options.concentrationRange,
      units: 'mol/L',
      tandem: options.tandem.createTandem( 'concentrationProperty' ),

      // read-only if solution is read-only, or if concentration is a constant
      phetioReadOnly: options.phetioReadOnly || ( options.concentrationRange.getLength() === 0 )
    } );

    // pH = -log10( [H3O+] )
    this.pHProperty = new DerivedProperty( [ this.strengthProperty, this.concentrationProperty ],
      ( strength, concentration ) => -Utils.roundSymmetric( 100 * Utils.log10( this.getH3OConcentration() ) ) / 100, {
        isValidValue: pH => ABSConstants.PH_RANGE.contains( pH ),
        tandem: options.tandem.createTandem( 'pHProperty' ),
        phetioValueType: NumberIO
      } );
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

  /**
   * AqueousSolutionIO implements 'Reference type serialization', as described in the Serialization section of
   * https://github.com/phetsims/phet-io/blob/master/doc/phet-io-instrumentation-technical-guide.md#serialization
   * Reference type serialization is appropriate because all AqueousSolution instances are created at startup.
   * Any occurrence of AqueousSolution in PhET-iO state is a reference to one of those instances.
   */
  public static readonly AqueousSolutionIO = new IOType<AqueousSolution, AqueousSolutionStateObject>( 'AqueousSolutionIO', {
    valueType: AqueousSolution,
    supertype: ReferenceIO( IOType.ObjectIO )
  } );
}

acidBaseSolutions.register( 'AqueousSolution', AqueousSolution );