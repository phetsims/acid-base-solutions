[object Promise]

/**
 * Model for the 'My Solution' screen in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import SolutionType from '../../common/enum/SolutionType.js';
import ABSModel from '../../common/model/ABSModel.js';
import StrongAcid from '../../common/model/solutions/StrongAcid.js';
import StrongBase from '../../common/model/solutions/StrongBase.js';
import WeakAcid from '../../common/model/solutions/WeakAcid.js';
import WeakBase from '../../common/model/solutions/WeakBase.js';

// constants
const DEFAULT_SOLUTION_TYPE = SolutionType.WEAK_ACID;

class MySolutionModel extends ABSModel {

  constructor() {

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

    // @public convenience Property that will synchronize with the concentration of the currently selected solution
    this.concentrationProperty = new NumberProperty( this.solutions[ DEFAULT_SOLUTION_TYPE.name ].concentrationProperty.get(), {
      reentrant: true
    } );

    // @public convenience Property that will synchronize with the strength of the currently selected solution
    this.strengthProperty = new NumberProperty( this.solutions[ DEFAULT_SOLUTION_TYPE.name ].strengthProperty.get(), {
      reentrant: true
    } );

    const setStrength = value => this.strengthProperty.set( value );
    const setConcentration = value => this.concentrationProperty.set( value );
    this.solutionTypeProperty.link( ( newSolutionType, prevSolutionType ) => {

      // unsubscribe from previous solution strength and concentration property
      if ( prevSolutionType ) {
        this.solutions[ prevSolutionType.name ].strengthProperty.unlink( setStrength );
        this.solutions[ prevSolutionType.name ].concentrationProperty.unlink( setConcentration );

        /*
         * Set concentration of new solution equal to previous solution.
         * Do not do this for strength, see strength observer below and issue #94.
         */
        this.solutions[ newSolutionType.name ].concentrationProperty.set( this.solutions[ prevSolutionType.name ].concentrationProperty.get() );
      }

      // subscribe to new solution strength and concentration property
      this.solutions[ newSolutionType.name ].strengthProperty.link( setStrength );
      this.solutions[ newSolutionType.name ].concentrationProperty.link( setConcentration );
    } );

    this.concentrationProperty.link( concentration => {
      this.solutions[ this.solutionTypeProperty.get().name ].concentrationProperty.set( concentration );
    } );

    /*
     * issue #94:
     * Keep strength of all weak solutions synchronized, so that strength slider
     * maintains the same value when switching between weak solution types.
     * Strong solutions have constant strength, so do not synchronize.
     */
    this.strengthProperty.link( strength => {
      const solutionType = this.solutionTypeProperty.get();
      if ( solutionType === SolutionType.WEAK_ACID || solutionType === SolutionType.WEAK_BASE ) {
        this.solutions[ SolutionType.WEAK_ACID.name ].strengthProperty.set( strength );
        this.solutions[ SolutionType.WEAK_BASE.name ].strengthProperty.set( strength );
      }
    } );
  }

  /**
   * @public
   * @override
   */
  reset() {
    super.reset();
    this.concentrationProperty.reset();
    this.strengthProperty.reset();
  }
}

acidBaseSolutions.register( 'MySolutionModel', MySolutionModel );
export default MySolutionModel;