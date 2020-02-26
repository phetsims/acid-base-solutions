// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model for the concentration graph in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );

  class ConcentrationGraph {

    /**
     * @param {Beaker} beaker
     * @param {AqueousSolution[]} solutions
     * @param {Property.<SolutionType>} solutionTypeProperty
     */
    constructor( beaker, solutions, solutionTypeProperty ) {

      // @public
      this.solutions = solutions;
      this.solutionTypeProperty = solutionTypeProperty;

      // @public dimensions of the graph's background
      this.width = 0.5 * beaker.size.width;
      this.height = 0.9 * beaker.size.height;

      // @public position, origin at upper-left corner
      this.position = beaker.position.plusXY( ( this.width - beaker.size.width ) / 2, -( beaker.size.height + this.height ) / 2 );
    }
  }

  return acidBaseSolutions.register( 'ConcentrationGraph', ConcentrationGraph );
} );