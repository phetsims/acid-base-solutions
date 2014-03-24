// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the magnifier in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  // imports
  var Property = require( 'AXON/Property' ),
    ViewModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/ViewModes' ),
    TestModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/TestModes' );

  /**
   * @param {BeakerModel} beakerModel
   * @param {Array<AqueousSolution>} solutions
   * @param {Property<SolutionTypes>} solutionTypeProperty
   * @param {Property<Boolean>} solventVisibleProperty
   * @param {Property<ViewModes>} viewModeProperty
   * @param {Property<TestModes>} testModeProperty
   * @constructor
   */
  function MagnifierModel( beakerModel, solutions, solutionTypeProperty, solventVisibleProperty, viewModeProperty, testModeProperty ) {
    // magnifier radius
    this.radius = beakerModel.height / 2.15;

    // magnifier location
    this.location = beakerModel.location.plusXY( 0, -beakerModel.height / 2 );

    // solution type property
    this.solutionTypeProperty = solutionTypeProperty;

    // associative array of possible solutions, indexed by solutionType
    this.solutions = solutions;

    // solvent visibility property
    this.solventVisibleProperty = solventVisibleProperty;

    // view mode property
    this.viewModeProperty = viewModeProperty;

    // test mode property
    this.testModeProperty = testModeProperty;

    // visibility of magnifier
    this.visibleProperty = new Property( this.findVisibility() );

    // add observers
    var setVisibilityBinded = this.setVisibility.bind( this );
    viewModeProperty.link( setVisibilityBinded );
    testModeProperty.link( setVisibilityBinded );
  }

  MagnifierModel.prototype = {

    findVisibility: function() {
      return (this.viewModeProperty.value === ViewModes.MOLECULES && this.testModeProperty.value !== TestModes.CONDUCTIVITY);
    },

    setVisibility: function() {
      this.visibleProperty.value = this.findVisibility();
    }
  };

  return MagnifierModel;
} );