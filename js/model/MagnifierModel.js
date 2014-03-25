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
    ViewMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ViewMode' ),
    TestMode = require( 'ACID_BASE_SOLUTIONS/common/enum/TestMode' );

  /**
   * @param {Beaker} beaker
   * @param {Array<AqueousSolution>} solutions
   * @param {Property<SolutionType>} solutionTypeProperty
   * @param {Property<Boolean>} solventVisibleProperty
   * @param {Property<ViewMode>} viewModeProperty
   * @param {Property<TestMode>} testModeProperty
   * @constructor
   */
  function MagnifierModel( beaker, solutions, solutionTypeProperty, solventVisibleProperty, viewModeProperty, testModeProperty ) {
    // magnifier radius
    this.radius = beaker.size.height / 2.15;

    // magnifier location
    this.location = beaker.location.plusXY( 0, -beaker.size.height / 2 );

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
      return (this.viewModeProperty.value === ViewMode.MOLECULES && this.testModeProperty.value !== TestMode.CONDUCTIVITY);
    },

    setVisibility: function() {
      this.visibleProperty.value = this.findVisibility();
    }
  };

  return MagnifierModel;
} );