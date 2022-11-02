// Copyright 2014-2021, University of Colorado Boulder

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

// constants
const DEFAULT_SOLUTION_TYPE = 'weakAcid';

export default class MySolutionModel extends ABSModel {

  // convenience Property that will synchronize with the concentration of the currently selected solution
  public readonly concentrationProperty: Property<number>;

  // convenience Property that will synchronize with the strength of the currently selected solution
  public readonly strengthProperty: Property<number>;

  public constructor( tandem: Tandem ) {

    const solutions = [
      new StrongAcid(),
      new WeakAcid(),
      new StrongBase(),
      new WeakBase()
    ];

    super( solutions, DEFAULT_SOLUTION_TYPE );

    /**
     * Everything below here is for the convenience of the 'Solution' control panel, which
     * allows the user to change concentration and (for weak solutions) strength.
     * The concentration and strength properties created here are kept synchronized with
     * whichever solution is currently selected. When the solution changes, the observer
     * wiring is changed. This may have been more appropriate to handle in SolutionControl.
     */

    const defaultSolution = this.solutionsMap.get( DEFAULT_SOLUTION_TYPE )!;
    assert && assert( defaultSolution );

    this.concentrationProperty = new NumberProperty( defaultSolution.concentrationProperty.get(), {
      reentrant: true
    } );

    this.strengthProperty = new NumberProperty( defaultSolution.strengthProperty.get(), {
      reentrant: true
    } );

    const setStrength = ( value: number ) => this.strengthProperty.set( value );
    const setConcentration = ( value: number ) => this.concentrationProperty.set( value );
    this.solutionTypeProperty.link( ( newSolutionType, previousSolutionType ) => {

      const newSolution = this.solutionsMap.get( newSolutionType )!;
      assert && assert( newSolution );

      // unsubscribe from previous solution strength and concentration property
      if ( previousSolutionType ) {
        const previousSolution = this.solutionsMap.get( previousSolutionType )!;
        assert && assert( previousSolution );
        previousSolution.strengthProperty.unlink( setStrength );
        previousSolution.concentrationProperty.unlink( setConcentration );

        /*
         * Set concentration of new solution equal to previous solution.
         * Do not do this for strength, see strength observer below and issue #94.
         */
        newSolution.concentrationProperty.set( previousSolution.concentrationProperty.get() );
      }

      // subscribe to new solution strength and concentration property
      newSolution.strengthProperty.link( setStrength );
      newSolution.concentrationProperty.link( setConcentration );
    } );

    this.concentrationProperty.link( concentration => {
      this.solutionsMap.get( this.solutionTypeProperty.get() )!.concentrationProperty.set( concentration );
    } );

    /*
     * issue #94:
     * Keep strength of all weak solutions synchronized, so that strength slider
     * maintains the same value when switching between weak solution types.
     * Strong solutions have constant strength, so do not synchronize.
     */
    this.strengthProperty.link( strength => {
      const solutionType = this.solutionTypeProperty.get();
      if ( solutionType === 'weakAcid' || solutionType === 'weakBase' ) {
        this.solutionsMap.get( 'weakAcid' )!.strengthProperty.set( strength );
        this.solutionsMap.get( 'weakBase' )!.strengthProperty.set( strength );
      }
    } );
  }

  public override reset(): void {
    super.reset();
    this.concentrationProperty.reset();
    this.strengthProperty.reset();
  }
}

acidBaseSolutions.register( 'MySolutionModel', MySolutionModel );