// Copyright 2014-2015, University of Colorado Boulder

/**
 * Base type for models in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var Beaker = require( 'ACID_BASE_SOLUTIONS/common/model/Beaker' );
  var ConcentrationGraph = require( 'ACID_BASE_SOLUTIONS/common/model/ConcentrationGraph' );
  var ConductivityTester = require( 'ACID_BASE_SOLUTIONS/common/model/ConductivityTester' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Magnifier = require( 'ACID_BASE_SOLUTIONS/common/model/Magnifier' );
  var PHMeter = require( 'ACID_BASE_SOLUTIONS/common/model/PHMeter' );
  var PHPaper = require( 'ACID_BASE_SOLUTIONS/common/model/PHPaper' );
  var Property = require( 'AXON/Property' );

  /**
   * @param {AqueousSolution[]} solutions
   * @param {SolutionType} defaultSolutionType
   * @constructor
   */
  function ABSModel( solutions, defaultSolutionType ) {

    var self = this;

    // @public convert to an associative array, so we can look up solutions by solutionType
    this.solutions = {};
    solutions.forEach( function( solution ) {
      self.solutions[ solution.type ] = solution;
    } );

    // @public type of solution that is currently selected
    this.solutionTypeProperty = new Property( defaultSolutionType );

    // @public pH level of product
    this.pHProperty = new Property( this.solutions[ defaultSolutionType ].pHProperty.get() );

    // @public
    this.beaker = new Beaker();
    this.magnifier = new Magnifier( this.beaker, this.solutions, this.solutionTypeProperty );
    this.graph = new ConcentrationGraph( this.beaker, this.solutions, this.solutionTypeProperty );
    this.pHMeter = new PHMeter( this.beaker, this.pHProperty );
    this.pHPaper = new PHPaper( this.beaker, this.solutionTypeProperty, this.pHProperty );
    this.conductivityTester = new ConductivityTester( this.beaker, this.pHProperty );

    // synchronize with pH of the solution that is currently selected
    var setPH = function( value ) { self.pHProperty.set( value ); };
    this.solutionTypeProperty.link( function( newSolutionType, prevSolutionType ) {
      console.log( 'ABSModel newSolutionType=' + newSolutionType + ' prevSolutionType=' + prevSolutionType );//XXX
      // unsubscribe from previous solution pH property
      if ( prevSolutionType ) {
        self.solutions[ prevSolutionType ].pHProperty.unlink( setPH );
      }
      // subscribe to new solution pH property
      self.solutions[ newSolutionType ].pHProperty.link( setPH );
    } );
  }

  acidBaseSolutions.register( 'ABSModel', ABSModel );

  return inherit( Object, ABSModel, {

    // @public
    reset: function() {

      // reset Properties
      this.solutionTypeProperty.reset();
      this.pHProperty.reset();

      // reset solutions
      for ( var solutionType in this.solutions ) {
        this.solutions[ solutionType ].reset();
      }

      this.pHMeter.reset();
      this.pHPaper.reset();
      this.conductivityTester.reset();
    }
  } );
} );