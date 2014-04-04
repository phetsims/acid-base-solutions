// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for the 'Custom solution' screen in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var AcidBaseSolutionsModel = require( 'ACID_BASE_SOLUTIONS/common/model/AcidBaseSolutionsModel' );
  var ConcentrationGraph = require( 'ACID_BASE_SOLUTIONS/common/model/ConcentrationGraph' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );
  var StrongAcidSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/StrongAcidSolution' );
  var StrongBaseSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/StrongBaseSolution' );
  var WeakAcidSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WeakAcidSolution' );
  var WeakBaseSolution = require( 'ACID_BASE_SOLUTIONS/common/model/solutions/WeakBaseSolution' );

  // constants
  var DEFAULT_SOLUTION_TYPE = SolutionType.WEAK_ACID;

  function CustomSolutionModel() {

    var self = this;

    AcidBaseSolutionsModel.call( this,
      [
        new StrongAcidSolution(),
        new WeakAcidSolution(),
        new StrongBaseSolution(),
        new WeakBaseSolution()
      ],
      DEFAULT_SOLUTION_TYPE );

    // add convenience properties that will synchronize with the concentration and strength of the currently selected solution
    this.addProperty( 'concentration', this.solutions[DEFAULT_SOLUTION_TYPE].concentration ); // concentration of solution
    this.addProperty( 'strength', this.solutions[DEFAULT_SOLUTION_TYPE].strength ); // strength of solution

    // concentration graph
    this.graph = new ConcentrationGraph( this.beaker, this.solutions, this.property( 'solutionType' ), this.property( 'concentration' ), this.property( 'strength' ) );

    var setStrength = function( value ) { self.strength = value; };
    var setConcentration = function( value ) { self.concentration = value; };
    this.property( 'solutionType' ).link( function( newSolution, prevSolution ) {
      // unsubscribe from previous solution strength and concentration property
      if ( prevSolution ) {
        self.solutions[prevSolution].property( 'strength' ).unlink( setStrength );
        self.solutions[prevSolution].property( 'concentration' ).unlink( setConcentration );

        // set concentration and strength of new solution equal to previous solution
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