// Copyright 2002-2014, University of Colorado Boulder

/**
 * Base type for models in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var Beaker = require( 'ACID_BASE_SOLUTIONS/common/model/Beaker' );
  var ConductivityTester = require( 'ACID_BASE_SOLUTIONS/common/model/ConductivityTester' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MagnifierModel = require( 'ACID_BASE_SOLUTIONS/model/MagnifierModel' );
  var PHMeter = require( 'ACID_BASE_SOLUTIONS/common/model/PHMeter' );
  var PHPaper = require( 'ACID_BASE_SOLUTIONS/common/model/PHPaper' );
  var PropertySet = require( 'AXON/PropertySet' );
  var ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  var ViewMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ViewMode' );

  /**
   * @param {Array<AqueousSolution>} solutions
   * @param {SolutionType} defaultSolutionType
   * @constructor
   */
  function AcidBaseSolutionsModel( solutions, defaultSolutionType ) {

    var self = this;

    // convert to an associative array, so we can look up solutions by solutionType
    this.solutions = {};
    solutions.forEach( function( solution ) {
      self.solutions[solution.type] = solution;
    } );

    PropertySet.call( this, {
      solutionType: defaultSolutionType, // solution's type
      toolMode: ToolMode.PH_METER, // test mode
      viewMode: ViewMode.MOLECULES, // view mode
      solventVisible: false, // solvent visibility
      pH: this.solutions[defaultSolutionType].pH // pH level of product
    } );

    // beaker model (all elements in workspace have position relative to beaker)
    this.beaker = new Beaker();

    // magnifier model
    this.magnifier = new MagnifierModel( this.beaker, this.solutions, this.property( 'solutionType' ), this.property( 'solventVisible' ), this.property( 'viewMode' ), this.property( 'toolMode' ) );

    // pH meter model
    this.pHMeter = new PHMeter( this.beaker, this.property( 'pH' ), this.property( 'toolMode' ) );

    // pH paper model
    this.pHPaper = new PHPaper( this.beaker, this.property( 'solutionType' ), this.property( 'pH' ), this.property( 'toolMode' ) );

    // conductivity tester model
    this.conductivityTester = new ConductivityTester( this.beaker, this.property( 'pH' ), this.property( 'toolMode' ) );

    // set appropriate pH
    var setPH = function( value ) { self.pH = value; };
    this.property( 'solutionType' ).link( function( newSolution, prevSolution ) {
      // unsubscribe from previous solution pH property
      if ( prevSolution ) {
        self.solutions[prevSolution].property( 'pH' ).unlink( setPH );
      }
      // subscribe to new solution pH property
      self.solutions[newSolution].property( 'pH' ).link( setPH );
    } );
  }

  return inherit( PropertySet, AcidBaseSolutionsModel, {
    reset: function() {
      // reset supertype properties
      PropertySet.prototype.reset.call( this );

      // reset solutions
      for ( var solutionType in this.solutions ) {
        this.solutions[solutionType].reset();
      }

      this.pHMeter.reset();
      this.pHPaper.reset();
      this.conductivityTester.reset();
    }
  } );
} );