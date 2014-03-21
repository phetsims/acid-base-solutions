// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the view mode control panel in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' ),
    ViewModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/ViewModes' ),
    TestModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/TestModes' ),
    ControlPanels = require( 'ACID_BASE_SOLUTIONS/model/Constants/ControlPanels' );

  // strings
  var viewsString = require( 'string!ACID_BASE_SOLUTIONS/views' );

  function ViewModesMenuModel( viewModeProperty, testModeProperty, solventVisibleProperty ) {
    var self = this;

    // control panel's type
    this.type = ControlPanels.VIEWS;

    // control panel's title
    this.title = viewsString;

    //TODO add Property suffix
    // view mode property
    this.mode = viewModeProperty;

    //TODO add Property suffix
    // solvent visibility
    this.solventVisibleProperty = solventVisibleProperty;

    //TODO add Property suffix
    // solvent checkbox enable property
    this.checkboxEnable = new Property( true );

    var setCheckboxEnabled = function() {
      self.checkboxEnable.value = (viewModeProperty.get() === ViewModes.MOLECULES && testModeProperty.get() !== TestModes.CONDUCTIVITY);
    };

    viewModeProperty.link( setCheckboxEnabled );
    testModeProperty.link( setCheckboxEnabled );
  }

  ViewModesMenuModel.prototype = {
    reset: function() {}
  };

  return ViewModesMenuModel;
} );