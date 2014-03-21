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
    PHMeterModel = require( 'ACID_BASE_SOLUTIONS/model/PHMeterModel' ),
    PHPaperModel = require( 'ACID_BASE_SOLUTIONS/model/PHPaperModel' ),
    ConductivityTestModel = require( 'ACID_BASE_SOLUTIONS/model/ConductivityTestModel' ),
    BeakerModel = require( 'ACID_BASE_SOLUTIONS/model/BeakerModel' ),
    FormulaModel = require( 'ACID_BASE_SOLUTIONS/model/FormulaModel' ),
    MagnifierModel = require( 'ACID_BASE_SOLUTIONS/model/MagnifierModel' ),
    ViewModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/ViewModes' ),
    TestModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/TestModes' ),
    ScreenView = require( 'JOIST/ScreenView' ),

  // constants
    CONSTANTS = require( 'model/Constants/Constants' );

  function AcidBaseSolutionsAbstractModel( mode, solutions, defaultSolution ) {
    var self = this,
      setPH = function( value ) { self.pH = value; }; // observer for pH property

    // dimensions of the model's space
    this.width = ScreenView.DEFAULT_LAYOUT_BOUNDS.width;
    this.height = ScreenView.DEFAULT_LAYOUT_BOUNDS.height;

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
      brightness: pHToBrightness( this.components[defaultSolution].pH ) // brightness value
    } );

    // beaker model (all elements in workspace have position relative to beaker)
    this.beaker = new BeakerModel( this.width, this.height );

    // formula model
    this.formula = new FormulaModel( this.beaker, this.property( 'solution' ) );

    // magnifier model
    this.magnifier = new MagnifierModel( this.beaker, this.SOLUTIONS, this.components, this.property( 'solution' ), this.property( 'solvent' ), this.property( 'viewMode' ), this.property( 'testMode' ) );

    // pH meter model
    this.pHMeter = new PHMeterModel( this.beaker, this.property( 'pH' ), this.property( 'testMode' ) );

    // pH paper model
    this.pHPaper = new PHPaperModel( this.beaker, this.property( 'solution' ), this.property( 'pH' ), this.property( 'testMode' ) );

    // conductivity test model
    this.conductivityTest = new ConductivityTestModel( this.beaker, this.property( 'testMode' ), this.property( 'brightness' ) );

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

      // reset solutions properties
      this.SOLUTIONS.forEach( function( solution ) {
        solution.reset();
      } );

      // reset pH meter
      this.pHMeter.reset();

      // reset pH paper
      this.pHPaper.reset();

      // reset conductivity test
      this.conductivityTest.reset();
    }
  } );
} );