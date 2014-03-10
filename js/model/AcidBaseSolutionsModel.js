// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model container for the 'Acid Base Solutions' screen.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    PropertySet = require( 'AXON/PropertySet' ),
    WaterSolution = require( './WaterSolution' ),
    StrongAcidSolution = require( './StrongAcidSolution' ),
    WeakAcidSolution = require( './WeakAcidSolution' ),
    StrongBaseSolution = require( './StrongBaseSolution' ),
    WeakBaseSolution = require( './WeakBaseSolution' ),
    Solutions = require( 'model/Solutions' ),
    GameModes = require( 'model/GameModes' ),
    ViewModes = require( 'model/ViewModes' ),
    TestModes = require( 'model/TestModes' ),

  // constants
    CONSTANTS = require( 'model/Constants/Constants' );

  function AcidBaseSolutionsModel( width, height, mode ) {
    var self = this,
      setPH = function( value ) { self.pH = value; }, // observer for pH property
      setStrength = function( value ) { self.strength = value; }, // observer for strength property
      setConcentration = function( value ) { self.concentration = value; }, // observer for strength property
      solution,
      solutionIterator = 0;

    // dimensions of the model's space
    this.width = width;
    this.height = height;

    this.mode = mode;

    // possible solutions
    this.SOLUTIONS = [
      {type: Solutions.WATER, constructor: WaterSolution, relations: [
        {type: 'H2O', property: 'H2OConcentration'},
        {type: 'H3O', property: 'H3OConcentration'},
        {type: 'OH', property: 'OHConcentration'}
      ]},
      {type: Solutions.STRONG_ACID, constructor: StrongAcidSolution, relations: [
        {type: 'HA', property: 'soluteConcentration'},
        {type: 'H2O', property: 'H2OConcentration'},
        {type: 'A', property: 'productConcentration'},
        {type: 'H3O', property: 'H3OConcentration'}
      ]},
      {type: Solutions.WEAK_ACID, constructor: WeakAcidSolution, relations: [
        {type: 'HA', property: 'soluteConcentration'},
        {type: 'H2O', property: 'H2OConcentration'},
        {type: 'A', property: 'productConcentration'},
        {type: 'H3O', property: 'H3OConcentration'}
      ]},
      {type: Solutions.STRONG_BASE, constructor: StrongBaseSolution, relations: [
        {type: 'MOH', property: 'soluteConcentration'},
        {type: 'M', property: 'productConcentration'},
        {type: 'OH', property: 'OHConcentration'}
      ]},
      {type: Solutions.WEAK_BASE, constructor: WeakBaseSolution, relations: [
        {type: 'B', property: 'soluteConcentration'},
        {type: 'H2O', property: 'H2OConcentration'},
        {type: 'BH', property: 'productConcentration'},
        {type: 'OH', property: 'OHConcentration'}
      ]}
    ];

    PropertySet.call( this, {
      solution: (mode === GameModes.CUSTOM_SOLUTION ? Solutions.WEAK_ACID : Solutions.WATER), // solution's type
      testMode: TestModes.PH_METER, // test mode
      viewMode: ViewModes.MOLECULES, // view mode
      solvent: false, // solvent visibility
      pH: 0, // pH level of product
      brightness: 0, // brightness value
      resetTrigger: false // reset trigger
    } );

    // add model for each type of reaction
    this.components = {};

    // for 'custom solution' tab do not need initialize water solution
    if ( mode === GameModes.CUSTOM_SOLUTION ) {
      solutionIterator = 1;
    }

    for ( ; solutionIterator < this.SOLUTIONS.length; solutionIterator++ ) {
      solution = new this.SOLUTIONS[solutionIterator].constructor();
      this.components[this.SOLUTIONS[solutionIterator].type] = solution;
    }

    // set appropriate pH
    this.property( 'solution' ).link( function( newSolution, prevSolution ) {
      // unsubscribe from previous solution pH property
      if ( prevSolution ) {
        self.components[prevSolution].property( 'pH' ).unlink( setPH );
      }
      // subscribe to new solution pH property
      self.components[newSolution].property( 'pH' ).link( setPH );
    } );

    // set brightness of light rays depend on pH value
    this.property( 'pH' ).link( function( pHValue ) {
      self.brightness = pHToBrightness( pHValue );
    } );

    // add properties for custom tab
    if ( mode === GameModes.CUSTOM_SOLUTION ) {
      this.addProperty( 'isAcid', true ); // type of solution. true - acid, false - base
      this.addProperty( 'isWeak', true ); // type of strength. true - weak, false - strong
      this.addProperty( 'concentration', 0 ); // concentration of solution
      this.addProperty( 'strength', 0 ); // strength of solution

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
  }

  // private methods
  var pHToBrightness = function( pH ) {
    var NEUTRAL_PH = CONSTANTS.NEUTRAL_PH,
      NEUTRAL_BRIGHTNESS = CONSTANTS.NEUTRAL_BRIGHTNESS;

    return NEUTRAL_BRIGHTNESS + ( 1 - NEUTRAL_BRIGHTNESS ) * (pH < NEUTRAL_PH ? ( NEUTRAL_PH - pH ) / ( NEUTRAL_PH - CONSTANTS.MIN_PH ) : ( pH - NEUTRAL_PH ) / ( CONSTANTS.MAX_PH - NEUTRAL_PH ) );
  };

  inherit( PropertySet, AcidBaseSolutionsModel, {
    reset: function() {
      // reset main properties
      this.property( 'solution' ).reset();
      this.property( 'testMode' ).reset();
      this.property( 'viewMode' ).reset();
      this.property( 'solvent' ).reset();

      // reset properties for custom tab
      if ( this.mode === GameModes.CUSTOM_SOLUTION ) {
        // reset components properties
        for ( var solution in this.components ) {
          if ( this.components.hasOwnProperty( solution ) ) {
            this.components[solution].property( 'strength' ).reset();
            this.components[solution].property( 'concentration' ).reset();
          }
        }

        this.property( 'isAcid' ).reset();
        this.property( 'isWeak' ).reset();
      }

      // send signal to views for resetting
      this.resetTrigger = !this.resetTrigger;
    }
  } );

  return AcidBaseSolutionsModel;
} );