// Copyright 2014-2019, University of Colorado Boulder

/**
 * Model for the 'My Solution' screen in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ABSModel = require( 'ACID_BASE_SOLUTIONS/common/model/ABSModel' );
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );
  const StrongAcidSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/StrongAcidSolution' );
  const StrongBaseSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/StrongBaseSolution' );
  const WeakAcidSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WeakAcidSolution' );
  const WeakBaseSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WeakBaseSolution' );

  // constants
  const DEFAULT_SOLUTION_TYPE = SolutionType.WEAK_ACID;

  class MySolutionModel extends ABSModel {

    constructor() {

      const solutions = [
        new StrongAcidSolution(),
        new WeakAcidSolution(),
        new StrongBaseSolution(),
        new WeakBaseSolution()
      ];

      super( solutions, DEFAULT_SOLUTION_TYPE );

      /**
       * Everything below here is for the convenience of the 'Solution' control panel, which
       * allows the user to change concentration and (for weak solutions) strength.
       * The concentration and strength properties created here are kept synchronized with
       * whichever solution is currently selected. When the solution changes, the observer
       * wiring is changed. This may have been more appropriate to handle in SolutionControl.
       */

      // @public convenience Property that will synchronize with the concentration the currently selected solution
      this.concentrationProperty = new NumberProperty( this.solutions[ DEFAULT_SOLUTION_TYPE ].concentrationProperty.get(), {
        reentrant: true
      } );

      // @public convenience Property that will synchronize with the strength of the currently selected solution
      this.strengthProperty = new NumberProperty( this.solutions[ DEFAULT_SOLUTION_TYPE ].strengthProperty.get(), {
        reentrant: true
      } );

      const setStrength = value => this.strengthProperty.set( value );
      const setConcentration = value => this.concentrationProperty.set( value );
      this.solutionTypeProperty.link( ( newSolutionType, prevSolutionType ) => {

        // unsubscribe from previous solution strength and concentration property
        if ( prevSolutionType ) {
          this.solutions[ prevSolutionType ].strengthProperty.unlink( setStrength );
          this.solutions[ prevSolutionType ].concentrationProperty.unlink( setConcentration );

          /*
           * Set concentration of new solution equal to previous solution.
           * Do not do this for strength, see strength observer below and issue #94.
           */
          this.solutions[ newSolutionType ].concentrationProperty.set( this.solutions[ prevSolutionType ].concentrationProperty.get() );
        }

        // subscribe to new solution strength and concentration property
        this.solutions[ newSolutionType ].strengthProperty.link( setStrength );
        this.solutions[ newSolutionType ].concentrationProperty.link( setConcentration );
      } );

      this.concentrationProperty.link( concentration => {
        this.solutions[ this.solutionTypeProperty.get() ].concentrationProperty.set( concentration );
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
          this.solutions[ SolutionType.WEAK_ACID ].strengthProperty.set( strength );
          this.solutions[ SolutionType.WEAK_BASE ].strengthProperty.set( strength );
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

  return acidBaseSolutions.register( 'MySolutionModel', MySolutionModel );
} );