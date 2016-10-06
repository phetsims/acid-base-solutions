// Copyright 2014-2015, University of Colorado Boulder

/**
 * Model for the 'My Solution' screen in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var ABSModel = require( 'ACID_BASE_SOLUTIONS/common/model/ABSModel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );
  var StrongAcidSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/StrongAcidSolution' );
  var StrongBaseSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/StrongBaseSolution' );
  var WeakAcidSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WeakAcidSolution' );
  var WeakBaseSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WeakBaseSolution' );

  // constants
  var DEFAULT_SOLUTION_TYPE = SolutionType.WEAK_ACID;

  /**
   * @constructor
   */
  function MySolutionModel() {

    var self = this;

    ABSModel.call( this,
      [
        new StrongAcidSolution(),
        new WeakAcidSolution(),
        new StrongBaseSolution(),
        new WeakBaseSolution()
      ],
      DEFAULT_SOLUTION_TYPE );

    /**
     * Everything below here is for the convenience of the 'Solution' control panel, which
     * allows the user to change concentration and (for weak solutions) strength.
     * The concentration and strength properties created here are kept synchronized with
     * whichever solution is currently selected. When the solution changes, the observer
     * wiring is changed. This may have been more appropriate to handle in SolutionControl.
     */

      // @pubic add convenience properties that will synchronize with the concentration and strength of the currently selected solution
    this.addProperty( 'concentration', this.solutions[ DEFAULT_SOLUTION_TYPE ].concentration ); // concentration of solution
    this.addProperty( 'strength', this.solutions[ DEFAULT_SOLUTION_TYPE ].strengthProperty.get() ); // strength of solution

    var setStrength = function( value ) { self.strength = value; };
    var setConcentration = function( value ) { self.concentration = value; };
    this.solutionTypeProperty.link( function( newSolutionType, prevSolutionType ) {

      // unsubscribe from previous solution strength and concentration property
      if ( prevSolutionType ) {
        self.solutions[ prevSolutionType ].strengthProperty.unlink( setStrength );
        self.solutions[ prevSolutionType ].concentrationProperty.unlink( setConcentration );

        /*
         * Set concentration of new solution equal to previous solution.
         * Do not do this for strength, see strength observer below and issue #94.
         */
        self.solutions[ newSolutionType ].concentrationProperty.set( self.solutions[ prevSolutionType ].concentrationProperty.get() );
      }

      // subscribe to new solution strength and concentration property
      self.solutions[ newSolutionType ].strengthProperty.link( setStrength );
      self.solutions[ newSolutionType ].concentrationProperty.link( setConcentration );
    } );

    this.concentrationProperty.link( function( concentration ) {
      self.solutions[ self.solutionType ].concentrationProperty.set( concentration );
    } );

    /*
     * issue #94:
     * Keep strength of all weak solutions synchronized, so that strength slider
     * maintains the same value when switching between weak solution types.
     * Strong solutions have constant strength, so do not synchronize.
     */
    this.strengthProperty.link( function( strength ) {
      var solutionType = self.solutionTypeProperty.get();
      if ( solutionType === SolutionType.WEAK_ACID || solutionType === SolutionType.WEAK_BASE ) {
        self.solutions[ SolutionType.WEAK_ACID ].strengthProperty.set( strength );
        self.solutions[ SolutionType.WEAK_BASE ].strengthProperty.set( strength );
      }
    } );
  }

  acidBaseSolutions.register( 'MySolutionModel', MySolutionModel );

  return inherit( ABSModel, MySolutionModel );
} );