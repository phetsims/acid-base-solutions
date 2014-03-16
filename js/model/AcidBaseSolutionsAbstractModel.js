// Copyright 2002-2013, University of Colorado Boulder

/**
 * Abstract model for the 'Acid Base Solutions' screen.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    PropertySet = require( 'AXON/PropertySet' ),
    ViewModes = require( 'model/ViewModes' ),
    TestModes = require( 'model/TestModes' ),

  // constants
    CONSTANTS = require( 'model/Constants/Constants' );

  function AcidBaseSolutionsAbstractModel( width, height, mode, solutions, defaultSolution ) {
    var self = this,
      setPH = function( value ) { self.pH = value; }; // observer for pH property

    // dimensions of the model's space
    this.width = width;
    this.height = height;

    this.mode = mode;

    // possible solutions
    this.SOLUTIONS = solutions;

    // for easy access to solutions
    this.components = {};

    this.SOLUTIONS.forEach( function( solution ) {
      self.components[solution.type] = solution;
    } );

    PropertySet.call( this, {
      solution: defaultSolution, // solution's type
      testMode: TestModes.PH_METER, // test mode
      viewMode: ViewModes.MOLECULES, // view mode
      solvent: false, // solvent visibility
      pH: this.components[defaultSolution].pH, // pH level of product
      brightness: pHToBrightness( this.components[defaultSolution].pH ), // brightness value
      resetTrigger: false // reset trigger
    } );

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
  }

  // private methods
  var pHToBrightness = function( pH ) {
    var NEUTRAL_PH = CONSTANTS.NEUTRAL_PH,
      NEUTRAL_BRIGHTNESS = CONSTANTS.NEUTRAL_BRIGHTNESS;

    return NEUTRAL_BRIGHTNESS + ( 1 - NEUTRAL_BRIGHTNESS ) * (pH < NEUTRAL_PH ? ( NEUTRAL_PH - pH ) / ( NEUTRAL_PH - CONSTANTS.MIN_PH ) : ( pH - NEUTRAL_PH ) / ( CONSTANTS.MAX_PH - NEUTRAL_PH ) );
  };

  return inherit( PropertySet, AcidBaseSolutionsAbstractModel, {
    reset: function() {
      // reset main properties
      PropertySet.prototype.reset.call( this );

      // reset components properties
      this.SOLUTIONS.forEach( function( solution ) {
        solution.reset();
      } );

      // send signal to views for resetting
      this.resetTrigger = !this.resetTrigger;
    }
  } );
} );