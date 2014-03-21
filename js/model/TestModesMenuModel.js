// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the test mode control panel in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var ControlPanelTypes = require( 'ACID_BASE_SOLUTIONS/model/Constants/ControlPanelTypes' );

  // strings
  var testsString = require( 'string!ACID_BASE_SOLUTIONS/tests' );

  /**
   * @param {Property<TestModes>} testModeProperty
   * @constructor
   */
  function TestModesMenuModel( testModeProperty ) {
    // control panel's type
    this.controlPanelType = ControlPanelTypes.TESTS;

    // control panel's title
    this.title = testsString;

    // test mode property
    this.testModeProperty = testModeProperty;
  }

  TestModesMenuModel.prototype = {
    reset: function() {}
  };

  return TestModesMenuModel;
} );