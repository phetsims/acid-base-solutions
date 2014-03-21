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
    ControlPanelTypes = require( 'ACID_BASE_SOLUTIONS/model/Constants/ControlPanelTypes' );

  // strings
  var viewsString = require( 'string!ACID_BASE_SOLUTIONS/views' );

  /**
   * @param {Property<ViewModes>} viewModeProperty
   * @param {Property<TestModes>} testModeProperty
   * @param {Property<Boolean>} solventVisibleProperty
   * @constructor
   */
  function ViewModesMenuModel( viewModeProperty, testModeProperty, solventVisibleProperty ) {
    var self = this;

    // control panel's type
    this.controlPanelType = ControlPanelTypes.VIEWS;

    // control panel's title
    this.title = viewsString;

    // view mode property
    this.viewModeProperty = viewModeProperty;

    // solvent visibility
    this.solventVisibleProperty = solventVisibleProperty;

    // solvent check box enabled
    this.checkboxEnabledProperty = new Property( true );

    var setCheckboxEnabled = function() {
      self.checkboxEnabledProperty.value = (viewModeProperty.get() === ViewModes.MOLECULES && testModeProperty.get() !== TestModes.CONDUCTIVITY);
    };

    viewModeProperty.link( setCheckboxEnabled );
    testModeProperty.link( setCheckboxEnabled );
  }

  ViewModesMenuModel.prototype = {
    reset: function() {}
  };

  return ViewModesMenuModel;
} );