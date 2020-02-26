// Copyright 2014-2019, University of Colorado Boulder

/**
 * Base type for models in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const Beaker = require( 'ACID_BASE_SOLUTIONS/common/model/Beaker' );
  const ConcentrationGraph = require( 'ACID_BASE_SOLUTIONS/common/model/ConcentrationGraph' );
  const ConductivityTester = require( 'ACID_BASE_SOLUTIONS/common/model/ConductivityTester' );
  const Magnifier = require( 'ACID_BASE_SOLUTIONS/common/model/Magnifier' );
  const PHMeter = require( 'ACID_BASE_SOLUTIONS/common/model/PHMeter' );
  const PHPaper = require( 'ACID_BASE_SOLUTIONS/common/model/PHPaper' );
  const Property = require( 'AXON/Property' );
  const NumberProperty = require( 'AXON/NumberProperty' );

  class ABSModel {

    /**
     * @param {AqueousSolution[]} solutions
     * @param {SolutionType} defaultSolutionType
     */
    constructor( solutions, defaultSolutionType ) {

      const self = this;

      // @public convert to an associative array, so we can look up solutions by solutionType
      this.solutions = {};
      solutions.forEach( function( solution ) {
        self.solutions[ solution.type ] = solution;
      } );

      // @public type of solution that is currently selected
      this.solutionTypeProperty = new Property( defaultSolutionType );

      // @public pH level of product
      this.pHProperty = new NumberProperty( this.solutions[ defaultSolutionType ].pHProperty.get() );

      // @public
      this.beaker = new Beaker();
      this.magnifier = new Magnifier( this.beaker, this.solutions, this.solutionTypeProperty );
      this.graph = new ConcentrationGraph( this.beaker, this.solutions, this.solutionTypeProperty );
      this.pHMeter = new PHMeter( this.beaker, this.pHProperty );
      this.pHPaper = new PHPaper( this.beaker, this.solutionTypeProperty, this.pHProperty );
      this.conductivityTester = new ConductivityTester( this.beaker, this.pHProperty );

      // synchronize with pH of the solution that is currently selected
      const setPH = value => this.pHProperty.set( value );
      this.solutionTypeProperty.link( ( newSolutionType, prevSolutionType ) => {
        // unsubscribe from previous solution pH property
        if ( prevSolutionType ) {
          this.solutions[ prevSolutionType ].pHProperty.unlink( setPH );
        }
        // subscribe to new solution pH property
        this.solutions[ newSolutionType ].pHProperty.link( setPH );
      } );
    }

    // @public
    reset() {

      // reset Properties
      this.solutionTypeProperty.reset();
      this.pHProperty.reset();

      // reset solutions
      for ( const solutionType in this.solutions ) {
        this.solutions[ solutionType ].reset();
      }

      this.pHMeter.reset();
      this.pHPaper.reset();
      this.conductivityTester.reset();
    }
  }

  return acidBaseSolutions.register( 'ABSModel', ABSModel );
} );