// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the magnifier in 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  // imports
  var Property = require( 'AXON/Property' ),
    ViewModes = require( 'model/Constants/ViewModes' ),
    TestModes = require( 'model/Constants/TestModes' );

  function MagnifierModel( beakerModel, solutions, components, solutionProperty, solventProperty, viewModeProperty, testModeProperty ) {
    // magnifier radius
    this.radius = beakerModel.height / 2.15;

    // magnifier location
    this.location = beakerModel.location.plusXY( beakerModel.width / 2 - this.radius, beakerModel.height / 4 - this.radius / 2 );

    // solution property
    this.solution = solutionProperty;

    // array of possible solutions
    this.solutions = solutions;

    // object for easy access to solutions
    this.components = components;

    // solvent visibility property
    this.solvent = solventProperty;

    // view mode property
    this.viewMode = viewModeProperty;

    // test mode property
    this.testMode = testModeProperty;

    // visibility of magnifier
    this.visibility = new Property( this.findVisibility() );

    // add observers
    var setVisibilityBinded = this.setVisibility.bind( this );
    viewModeProperty.link( setVisibilityBinded );
    testModeProperty.link( setVisibilityBinded );
  }

  MagnifierModel.prototype = {
    findVisibility: function() {
      return (this.viewMode.value === ViewModes.MOLECULES && this.testMode.value !== TestModes.CONDUCTIVITY);
    },
    setVisibility: function() {
      this.visibility.value = this.findVisibility();
    }
  };

  return MagnifierModel;
} );