// Copyright 2002-2014, University of Colorado Boulder

/**
 * Base type for models in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    PropertySet = require( 'AXON/PropertySet' ),
    PHMeter = require( 'ACID_BASE_SOLUTIONS/common/model/PHMeter' ),
    PHPaper = require( 'ACID_BASE_SOLUTIONS/common/model/PHPaper' ),
    ConductivityTestModel = require( 'ACID_BASE_SOLUTIONS/model/ConductivityTestModel' ),
    Beaker = require( 'ACID_BASE_SOLUTIONS/common/model/Beaker' ),
    FormulaModel = require( 'ACID_BASE_SOLUTIONS/model/FormulaModel' ),
    MagnifierModel = require( 'ACID_BASE_SOLUTIONS/model/MagnifierModel' ),
    ViewModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/ViewModes' ),
    TestModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/TestModes' ),
    Constants = require( 'ACID_BASE_SOLUTIONS/model/Constants/Constants' );

  /**
   * @param {Array<AqueousSolution>} solutions
   * @param {SolutionTypes} defaultSolutionType
   * @constructor
   */
  function AcidBaseSolutionsModel( solutions, defaultSolutionType ) {
    var self = this,
      setPH = function( value ) { self.pH = value; }; // observer for pH property

    // convert to an associative array, so we can look up solutions by solutionType
    this.solutions = {};
    solutions.forEach( function( solution ) {
      self.solutions[solution.type] = solution;
    } );

    PropertySet.call( this, {
      solutionType: defaultSolutionType, // solution's type
      testMode: TestModes.PH_METER, // test mode
      viewMode: ViewModes.MOLECULES, // view mode
      solventVisible: false, // solvent visibility
      pH: this.solutions[defaultSolutionType].pH, // pH level of product
      brightness: pHToBrightness( this.solutions[defaultSolutionType].pH ) // brightness value
    } );

    // beaker model (all elements in workspace have position relative to beaker)
    this.beaker = new Beaker();

    // formula model
    this.formula = new FormulaModel( this.beaker, this.property( 'solutionType' ) );

    // magnifier model
    this.magnifier = new MagnifierModel( this.beaker, this.solutions, this.property( 'solutionType' ), this.property( 'solventVisible' ), this.property( 'viewMode' ), this.property( 'testMode' ) );

    // pH meter model
    this.pHMeter = new PHMeter( this.beaker, this.property( 'pH' ), this.property( 'testMode' ) );

    // pH paper model
    this.pHPaper = new PHPaper( this.beaker, this.property( 'solutionType' ), this.property( 'pH' ), this.property( 'testMode' ) );

    // conductivity test model
    this.conductivityTest = new ConductivityTestModel( this.beaker, this.property( 'testMode' ), this.property( 'brightness' ) );

    // set appropriate pH
    this.property( 'solutionType' ).link( function( newSolution, prevSolution ) {
      // unsubscribe from previous solution pH property
      if ( prevSolution ) {
        self.solutions[prevSolution].property( 'pH' ).unlink( setPH );
      }
      // subscribe to new solution pH property
      self.solutions[newSolution].property( 'pH' ).link( setPH );
    } );

    // set brightness of light rays depend on pH value
    this.property( 'pH' ).link( function( pHValue ) {
      self.brightness = pHToBrightness( pHValue );
    } );
  }

  // private methods
  var pHToBrightness = function( pH ) {
    var NEUTRAL_PH = Constants.NEUTRAL_PH,
      NEUTRAL_BRIGHTNESS = Constants.NEUTRAL_BRIGHTNESS;

    return NEUTRAL_BRIGHTNESS + ( 1 - NEUTRAL_BRIGHTNESS ) * (pH < NEUTRAL_PH ? ( NEUTRAL_PH - pH ) / ( NEUTRAL_PH - Constants.MIN_PH ) : ( pH - NEUTRAL_PH ) / ( Constants.MAX_PH - NEUTRAL_PH ) );
  };

  return inherit( PropertySet, AcidBaseSolutionsModel, {
    reset: function() {
      // reset main properties
      PropertySet.prototype.reset.call( this );

      // reset solutions
      for ( var solutionType in this.solutions ) {
        //TODO reset appears to be undefined for each solution
        this.solutions[solutionType].reset();
      }

      // reset pH meter
      this.pHMeter.reset();

      // reset pH paper
      this.pHPaper.reset();

      // reset conductivity test
      this.conductivityTest.reset();
    }
  } );
} );