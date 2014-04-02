// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for the magnifier in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function() {
  'use strict';

  /**
   * @param {Beaker} beaker
   * @param {Array<AqueousSolution>} solutions
   * @param {Property<SolutionType>} solutionTypeProperty
   * @constructor
   */
  function Magnifier( beaker, solutions, solutionTypeProperty ) {

    // magnifier radius
    this.radius = beaker.size.height / 2.15;

    // magnifier location, origin at center of glass
    this.location = beaker.location.plusXY( 0, -beaker.size.height / 2 );

    // solution type property
    this.solutionTypeProperty = solutionTypeProperty;

    // associative array of possible solutions, indexed by solutionType
    this.solutions = solutions;
  }

  return Magnifier;
} );