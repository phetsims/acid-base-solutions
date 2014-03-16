// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the 'Custom solution' screen in 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    AcidBaseSolutionsAbstractModel = require( 'ACID_BASE_SOLUTIONS/model/AcidBaseSolutionsAbstractModel' ),
    Solutions = require( 'model/Solutions' ),
    GameModes = require( 'model/GameModes' ),
    StrongAcidSolution = require( 'model/AqueousSolutions/StrongAcidSolution' ),
    WeakAcidSolution = require( 'model/AqueousSolutions/WeakAcidSolution' ),
    StrongBaseSolution = require( 'model/AqueousSolutions/StrongBaseSolution' ),
    WeakBaseSolution = require( 'model/AqueousSolutions/WeakBaseSolution' ),

  // constants
    DEFAULT_SOLUTION = Solutions.WEAK_ACID;

  function AcidBaseSolutionsCustomSolutionModel( width, height ) {
    var self = this,
      setStrength = function( value ) { self.strength = value; }, // observer for strength property
      setConcentration = function( value ) { self.concentration = value; }; // observer for strength property

    AcidBaseSolutionsAbstractModel.call( this,
      width,
      height,
      GameModes.CUSTOM_SOLUTION,
      [
        new StrongAcidSolution(),
        new WeakAcidSolution(),
        new StrongBaseSolution(),
        new WeakBaseSolution()
      ],
      DEFAULT_SOLUTION );

    this.addProperty( 'isAcid', true ); // type of solution. true - acid, false - base
    this.addProperty( 'isWeak', true ); // type of strength. true - weak, false - strong
    this.addProperty( 'concentration', this.components[DEFAULT_SOLUTION].concentration ); // concentration of solution
    this.addProperty( 'strength', this.components[DEFAULT_SOLUTION].strength ); // strength of solution

    // update solution type if it was changed by radio buttons
    var setSolution = function() {
      var isAcid = self.isAcid,
        isWeak = self.isWeak;

      if ( isWeak && isAcid ) {
        self.solution = Solutions.WEAK_ACID;
      }
      else if ( isWeak && !isAcid ) {
        self.solution = Solutions.WEAK_BASE;
      }
      else if ( !isWeak && isAcid ) {
        self.solution = Solutions.STRONG_ACID;
      }
      else if ( !isWeak && !isAcid ) {
        self.solution = Solutions.STRONG_BASE;
      }
    };

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

    this.property( 'isAcid' ).link( setSolution );
    this.property( 'isWeak' ).link( setSolution );

    this.property( 'concentration' ).link( function( concentration ) {
      self.components[self.solution].concentration = concentration;
    } );

    this.property( 'strength' ).link( function( strength ) {
      self.components[self.solution].strength = strength;
    } );
  }

  return inherit( AcidBaseSolutionsAbstractModel, AcidBaseSolutionsCustomSolutionModel );

} );