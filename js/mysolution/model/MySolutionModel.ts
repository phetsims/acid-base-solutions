// Copyright 2014-2023, University of Colorado Boulder

/**
 * Model for the 'My Solution' screen in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSModel from '../../common/model/ABSModel.js';
import StrongAcid from '../../common/model/solutions/StrongAcid.js';
import StrongBase from '../../common/model/solutions/StrongBase.js';
import WeakAcid from '../../common/model/solutions/WeakAcid.js';
import WeakBase from '../../common/model/solutions/WeakBase.js';
import ABSConstants from '../../common/ABSConstants.js';

// constants
const DEFAULT_SOLUTION_TYPE = 'weakAcid';

export default class MySolutionModel extends ABSModel {

  // convenience Property that will synchronize with the concentration of the currently selected solution
  public readonly concentrationProperty: NumberProperty;

  // convenience Property that will synchronize with the strength of the currently selected solution
  public readonly strengthProperty: Property<number>;

  public constructor( tandem: Tandem ) {

    const solutionsTandem = tandem.createTandem( 'solutions' );

    const solutions = [
      new StrongAcid( solutionsTandem.createTandem( 'strongAcid' ) ),
      new WeakAcid( solutionsTandem.createTandem( 'weakAcid' ) ),
      new StrongBase( solutionsTandem.createTandem( 'strongBase' ) ),
      new WeakBase( solutionsTandem.createTandem( 'weakBase' ) )
    ];

    super( solutions, DEFAULT_SOLUTION_TYPE, tandem );

    const defaultSolution = this.solutionsMap.get( DEFAULT_SOLUTION_TYPE )!;
    assert && assert( defaultSolution );

    this.concentrationProperty = new NumberProperty( defaultSolution.concentrationProperty.value, {
      reentrant: true,
      range: ABSConstants.CONCENTRATION_RANGE,
      units: 'mol/L',
      tandem: tandem.createTandem( 'concentrationProperty' )
    } );

    this.strengthProperty = new NumberProperty( defaultSolution.strengthProperty.value, {
      reentrant: true,
      tandem: tandem.createTandem( 'strengthProperty' )
    } );

    // Write the concentration value to all solutions.
    this.concentrationProperty.link( concentration => solutions.forEach( solution => {
      solution.concentrationProperty.value = concentration;
    } ) );

    /*
     * Write the strength value to all WEAK solutions.
     * Strong solutions have constant strength, so do not synchronize.
     * See https://github.com/phetsims/acid-base-solutions/issues/94
     */
    this.strengthProperty.link( strength => {
      solutions.forEach( solution => {
        if ( solution.solutionType === 'weakAcid' || solution.solutionType === 'weakBase' ) {
          solution.strengthProperty.value = strength;
        }
      } );
    } );
  }

  public override reset(): void {
    super.reset();
    this.concentrationProperty.reset();
    this.strengthProperty.reset();
  }
}

acidBaseSolutions.register( 'MySolutionModel', MySolutionModel );