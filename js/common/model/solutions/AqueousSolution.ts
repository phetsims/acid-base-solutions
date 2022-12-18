// Copyright 2014-2022, University of Colorado Boulder

/**
 * AqueousSolution is the base class for solutions.
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
import Tandem from '../../../../../tandem/js/Tandem.js';
import NumberIO from '../../../../../tandem/js/types/NumberIO.js';
import acidBaseSolutions from '../../../acidBaseSolutions.js';
import { SolutionType } from '../../enum/SolutionType.js';
import { Molecule } from './Molecule.js';

export default abstract class AqueousSolution {

  public readonly solutionType: SolutionType;
  public readonly molecules: Molecule[];
  public readonly strengthProperty: Property<number>;
  public readonly concentrationProperty: Property<number>;
  public readonly pHProperty: TReadOnlyProperty<number>;

  /**
   * @param solutionType
   * @param strength - the strength of the solute
   * @param concentration - the initial concentration of the solute, at the start of the reaction
   * @param molecules - the molecules that make up the solution. The order of elements in this array determines the
   *   left-to-right order of bars in the graph, and the front-to-back rendering order of molecules in the magnifier.
   * @param tandem
   */
  protected constructor( solutionType: SolutionType, strength: number, concentration: number, molecules: Molecule[], tandem: Tandem ) {

    this.solutionType = solutionType;
    this.molecules = molecules;

    this.strengthProperty = new NumberProperty( strength, {
      tandem: tandem.createTandem( 'strengthProperty' )
    } );

    this.concentrationProperty = new NumberProperty( concentration, {
      tandem: tandem.createTandem( 'concentrationProperty' )
    } );

    this.pHProperty = new DerivedProperty( [ this.strengthProperty, this.concentrationProperty ],
      ( strength, concentration ) => {
        return -Utils.roundSymmetric( 100 * Utils.log10( this.getH3OConcentration() ) ) / 100;
      }, {
        tandem: tandem.createTandem( 'pHProperty' ),
        phetioValueType: NumberIO
      } );
  }

  public reset(): void {
    this.strengthProperty.reset();
    this.concentrationProperty.reset();
  }

  // convenience function
  protected getConcentration(): number {
    return this.concentrationProperty.get();
  }

  // convenience function
  protected getStrength(): number {
    return this.strengthProperty.get();
  }

  public abstract getSoluteConcentration(): number;

  public abstract getProductConcentration(): number;

  public abstract getH3OConcentration(): number;

  public abstract getOHConcentration(): number;

  public abstract getH2OConcentration(): number;

  protected abstract isValidStrength( strength: number ): boolean;
}

acidBaseSolutions.register( 'AqueousSolution', AqueousSolution );