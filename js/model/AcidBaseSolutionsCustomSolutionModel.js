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
    AcidBaseSolutionsAbstractModel = require( 'ACID_BASE_SOLUTIONS/model/AcidBaseSolutionsAbstractModel' ),
    BarChartModel = require( 'ACID_BASE_SOLUTIONS/model/BarChartModel' ),
    SolutionTypes = require( 'ACID_BASE_SOLUTIONS/model/Constants/SolutionTypes' ),
    GameModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/GameModes' ),
    StrongAcidSolution = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/StrongAcidSolution' ),
    WeakAcidSolution = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/WeakAcidSolution' ),
    StrongBaseSolution = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/StrongBaseSolution' ),
    WeakBaseSolution = require( 'ACID_BASE_SOLUTIONS/model/AqueousSolutions/WeakBaseSolution' ),

    SolutionMenuModel = require( 'ACID_BASE_SOLUTIONS/model/SolutionMenuModel' ),
    ViewModesMenuModel = require( 'ACID_BASE_SOLUTIONS/model/ViewModesMenuModel' ),
    TestModesMenuModel = require( 'ACID_BASE_SOLUTIONS/model/TestModesMenuModel' ),

  // constants
    DEFAULT_SOLUTION_TYPE = SolutionTypes.WEAK_ACID;

  function AcidBaseSolutionsCustomSolutionModel() {
    var self = this,
      setStrength = function( value ) { self.strength = value; }, // observer for strength property
      setConcentration = function( value ) { self.concentration = value; }; // observer for strength property

    AcidBaseSolutionsAbstractModel.call( this,
      GameModes.CUSTOM_SOLUTION,
      [
        new StrongAcidSolution(),
        new WeakAcidSolution(),
        new StrongBaseSolution(),
        new WeakBaseSolution()
      ],
      DEFAULT_SOLUTION_TYPE );

    this.addProperty( 'isAcid', true ); // type of solution. true - acid, false - base
    this.addProperty( 'isWeak', true ); // type of strength. true - weak, false - strong
    this.addProperty( 'concentration', this.components[DEFAULT_SOLUTION_TYPE].concentration ); // concentration of solution
    this.addProperty( 'strength', this.components[DEFAULT_SOLUTION_TYPE].strength ); // strength of solution

    // models for control panel
    this.controlPanel = [
      new SolutionMenuModel( this.property( 'solution' ), this.property( 'concentration' ), this.property( 'strength' ), this.property( 'isAcid' ), this.property( 'isWeak' ) ),
      new ViewModesMenuModel( this.property( 'viewMode' ), this.property( 'testMode' ), this.property( 'solventVisible' ) ),
      new TestModesMenuModel( this.property( 'testMode' ) )
    ];

    // concentration bar chart model
    this.barChart = new BarChartModel( this.beaker, this.SOLUTIONS, this.components, this.property( 'solution' ), this.property( 'viewMode' ), this.property( 'testMode' ), this.property( 'concentration' ), this.property( 'strength' ) );

    this.property( 'solution' ).link( function( newSolution, prevSolution ) {
      // unsubscribe from previous solution strength and concentration property
      if ( prevSolution ) {
        self.components[prevSolution].property( 'strength' ).unlink( setStrength );
        self.components[prevSolution].property( 'concentration' ).unlink( setConcentration );

        // we need set concentration and strength values of new solution
        // equal to values from previous solution
        self.components[newSolution].strength = self.components[prevSolution].strength;
        self.components[newSolution].concentration = self.components[prevSolution].concentration;
      }

      // subscribe to new solution strength and concentration property
      self.components[newSolution].property( 'strength' ).link( setStrength );
      self.components[newSolution].property( 'concentration' ).link( setConcentration );
    } );

    this.property( 'concentration' ).link( function( concentration ) {
      self.components[self.solution].concentration = concentration;
    } );

    this.property( 'strength' ).link( function( strength ) {
      self.components[self.solution].strength = strength;
    } );
  }

  return inherit( AcidBaseSolutionsAbstractModel, AcidBaseSolutionsCustomSolutionModel, {
    reset: function() {
      // reset main properties
      AcidBaseSolutionsAbstractModel.prototype.reset.call( this );

      // reset control panels
      this.controlPanel.forEach( function( panel ) {
        panel.reset();
      } );
    }
  } );

} );