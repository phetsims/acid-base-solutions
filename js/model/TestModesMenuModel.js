// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the test mode control panel in 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var ControlPanels = require( 'model/Constants/ControlPanels' ),

  // strings
    testsString = require( 'string!ACID_BASE_SOLUTIONS/tests' );

  function TestModesMenuModel( testModeProperty ) {
    // control panel's type
    this.type = ControlPanels.TESTS;

    // control panel's title
    this.title = testsString;

    // test mode property
    this.mode = testModeProperty;
  }

  return TestModesMenuModel;
} );