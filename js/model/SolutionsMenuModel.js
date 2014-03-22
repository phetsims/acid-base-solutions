// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the 'Solutions' control panel in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var ControlPanelTypes = require( 'ACID_BASE_SOLUTIONS/model/Constants/ControlPanelTypes' );

  // strings
  var solutionsString = require( 'string!ACID_BASE_SOLUTIONS/solutions' );

  /**
   * @param {Property<SolutionTypes>} solutionTypeProperty
   * @constructor
   */
  function SolutionsMenuModel( solutionTypeProperty ) {
    // control panel's type
    this.controlPanelType = ControlPanelTypes.SOLUTIONS;

    // control panel's title
    this.title = solutionsString;

    // selected solution type
    this.solutionTypeProperty = solutionTypeProperty;
  }

  SolutionsMenuModel.prototype = {
    reset: function() {}
  };

  return SolutionsMenuModel;
} );