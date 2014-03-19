// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the view mode control panel in 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' ),
    ViewModes = require( 'model/Constants/ViewModes' ),
    TestModes = require( 'model/Constants/TestModes' ),
    ControlPanels = require( 'model/Constants/ControlPanels' ),

  // strings
    viewsString = require( 'string!ACID_BASE_SOLUTIONS/views' );

  function ViewModesMenuModel( viewModeProperty, testModeProperty, solventProperty ) {
    var self = this;

    // control panel's type
    this.type = ControlPanels.VIEWS;

    // control panel's title
    this.title = viewsString;

    // view mode property
    this.mode = viewModeProperty;

    // solvent visibility
    this.solvent = solventProperty;

    // solvent checkbox enable property
    this.checkboxEnable = new Property( true );

    var setCheckboxEnabled = function() {
       self.checkboxEnable.value = (viewModeProperty.get() === ViewModes.MOLECULES && testModeProperty.get() !== TestModes.CONDUCTIVITY);
    };

    viewModeProperty.link( setCheckboxEnabled );
    testModeProperty.link( setCheckboxEnabled );
  }

  return ViewModesMenuModel;
} );