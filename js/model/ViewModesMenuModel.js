// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the 'Views' control panel in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports

  // strings
  var viewsString = require( 'string!ACID_BASE_SOLUTIONS/views' );

  /**
   * @param {Property<ViewModes>} viewModeProperty
   * @param {Property<Boolean>} solventVisibleProperty
   * @constructor
   */
  function ViewModesMenuModel( viewModeProperty, solventVisibleProperty ) {

    // control panel's title
    this.title = viewsString;

    // view mode property
    this.viewModeProperty = viewModeProperty;

    // solvent visibility
    this.solventVisibleProperty = solventVisibleProperty;
  }

  ViewModesMenuModel.prototype = {
    reset: function() {}
  };

  return ViewModesMenuModel;
} );