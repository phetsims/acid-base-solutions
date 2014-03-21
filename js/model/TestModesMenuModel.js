// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the test mode control panel in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var ControlPanels = require( 'ACID_BASE_SOLUTIONS/model/Constants/ControlPanels' );

  // strings
  var testsString = require( 'string!ACID_BASE_SOLUTIONS/tests' );

  function TestModesMenuModel( testModeProperty ) {
    // control panel's type
    this.type = ControlPanels.TESTS;

    // control panel's title
    this.title = testsString;

    // test mode property
    this.mode = testModeProperty;
  }

  TestModesMenuModel.prototype = {
    reset: function() {}
  };

  return TestModesMenuModel;
} );