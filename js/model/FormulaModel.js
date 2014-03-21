// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the formula in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function() {
  'use strict';

  /**
   * @param {BeakerModel} beakerModel
   * @param {Property<SolutionType>} solutionTypeProperty
   * @constructor
   */
  function FormulaModel( beakerModel, solutionTypeProperty ) {
    // formula location
    this.location = beakerModel.location.copy();

    // solution property
    this.solutionTypeProperty = solutionTypeProperty;
  }

  return FormulaModel;
} );