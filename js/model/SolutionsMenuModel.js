// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the solutions control panel in 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var ControlPanels = require( 'model/Constants/ControlPanels' ),

  // strings
    solutionsString = require( 'string!ACID_BASE_SOLUTIONS/solutions' );

  function SolutionsMenuModel( solutionProperty ) {
    // control panel's type
    this.type = ControlPanels.SOLUTIONS;

    // control panel's title
    this.title = solutionsString;

    // selected solution
    this.solution = solutionProperty;
  }

  SolutionsMenuModel.prototype = {
    reset: function() {}
  };

  return SolutionsMenuModel;
} );