// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the 'Custom solution' screen in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    AcidBaseSolutionsModel = require( 'ACID_BASE_SOLUTIONS/common/model/AcidBaseSolutionsModel' ),
    BarChartModel = require( 'ACID_BASE_SOLUTIONS/model/BarChartModel' ),
    SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' ),
    StrongAcidSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/StrongAcidSolution' ),
    WeakAcidSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WeakAcidSolution' ),
    StrongBaseSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/StrongBaseSolution' ),
    WeakBaseSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WeakBaseSolution' );

  // constants
  var DEFAULT_SOLUTION_TYPE = SolutionType.WEAK_ACID;

  function CustomSolutionModel() {
    var self = this,
      setStrength = function( value ) { self.strength = value; }, // observer for strength property
      setConcentration = function( value ) { self.concentration = value; }; // observer for strength property

    AcidBaseSolutionsModel.call( this,
      [
        new StrongAcidSolution(),
        new WeakAcidSolution(),
        new StrongBaseSolution(),
        new WeakBaseSolution()
      ],
      DEFAULT_SOLUTION_TYPE );

    this.addProperty( 'isAcid', true ); // type of solution. true - acid, false - base
    this.addProperty( 'isWeak', true ); // type of strength. true - weak, false - strong
    this.addProperty( 'concentration', this.solutions[DEFAULT_SOLUTION_TYPE].concentration ); // concentration of solution
    this.addProperty( 'strength', this.solutions[DEFAULT_SOLUTION_TYPE].strength ); // strength of solution

    // concentration bar chart model
    this.barChart = new BarChartModel( this.beaker, this.solutions, this.property( 'solutionType' ), this.property( 'viewMode' ), this.property( 'toolMode' ), this.property( 'concentration' ), this.property( 'strength' ) );

    this.property( 'solutionType' ).link( function( newSolution, prevSolution ) {
      // unsubscribe from previous solution strength and concentration property
      if ( prevSolution ) {
        self.solutions[prevSolution].property( 'strength' ).unlink( setStrength );
        self.solutions[prevSolution].property( 'concentration' ).unlink( setConcentration );

        // we need set concentration and strength values of new solution
        // equal to values from previous solution
        self.solutions[newSolution].strength = self.solutions[prevSolution].strength;
        self.solutions[newSolution].concentration = self.solutions[prevSolution].concentration;
      }

      // subscribe to new solution strength and concentration property
      self.solutions[newSolution].property( 'strength' ).link( setStrength );
      self.solutions[newSolution].property( 'concentration' ).link( setConcentration );
    } );

    this.property( 'concentration' ).link( function( concentration ) {
      self.solutions[self.solutionType].concentration = concentration;
    } );

    this.property( 'strength' ).link( function( strength ) {
      self.solutions[self.solutionType].strength = strength;
    } );
  }

  return inherit( AcidBaseSolutionsModel, CustomSolutionModel );
} );