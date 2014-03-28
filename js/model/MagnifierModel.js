// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for the magnifier in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  var ViewMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ViewMode' );

  /**
   * @param {Beaker} beaker
   * @param {Array<AqueousSolution>} solutions
   * @param {Property<SolutionType>} solutionTypeProperty
   * @param {Property<Boolean>} solventVisibleProperty
   * @param {Property<ViewMode>} viewModeProperty
   * @param {Property<ToolMode>} toolModeProperty
   * @constructor
   */
  function MagnifierModel( beaker, solutions, solutionTypeProperty, solventVisibleProperty, viewModeProperty, toolModeProperty ) {

    // magnifier radius
    this.radius = beaker.size.height / 2.15;

    // magnifier location, origin at center of glass
    this.location = beaker.location.plusXY( 0, -beaker.size.height / 2 );

    // solution type property
    this.solutionTypeProperty = solutionTypeProperty;

    // associative array of possible solutions, indexed by solutionType
    this.solutions = solutions;

    // solvent visibility property
    this.solventVisibleProperty = solventVisibleProperty;

    // view mode property
    this.viewModeProperty = viewModeProperty;

    // visibility of magnifier
    this.visibleProperty = new DerivedProperty( [ viewModeProperty, toolModeProperty ],
      function( viewMode, toolMode ) {
        return ( viewMode === ViewMode.MOLECULES && toolMode !== ToolMode.CONDUCTIVITY );
      } );
  }

  return MagnifierModel;
} );