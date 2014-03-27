// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for the formula in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function() {
  'use strict';

  /**
   * @param {Beaker} beaker
   * @param {Property<SolutionType>} solutionTypeProperty
   * @constructor
   */
  function FormulaModel( beaker, solutionTypeProperty ) {
    // formula location
    this.location = beaker.location.copy();

    // solution property
    this.solutionTypeProperty = solutionTypeProperty;
  }

  return FormulaModel;
} );