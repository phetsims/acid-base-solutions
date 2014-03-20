// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the formula in 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function() {
  'use strict';

  function FormulaModel( beakerModel, solutionProperty ) {
    // formula location
    this.location = beakerModel.location.plusXY( 0, beakerModel.height / 2 + 5 );

    // solution property
    this.solutionProperty = solutionProperty;
  }

  return FormulaModel;
} );