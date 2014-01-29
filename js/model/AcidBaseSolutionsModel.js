// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model container for the 'Acid Base Solutions' screen.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    PropertySet = require( 'AXON/PropertySet' );

  function AcidBaseSolutionsModel( width, height, mode ) {
    var self = this;

    // dimensions of the model's space
    this.width = width;
    this.height = height;

    this.mode = mode;

    // possible view modes
    this.VIEW_MODES = ['MOLECULES', 'EQUILIBRIUM', 'LIQUID'];

    // possible test modes
    this.TEST_MODES = ['PH_METER', 'PH_PAPER', 'CONDUCTIVITY'];

    PropertySet.call( this, {
      solution: 0, // solution's number
      testMode: self.TEST_MODES[0],
      viewMode: self.VIEW_MODES[0],
      isAcid: true, // type of solution. true - acid, false - base
      isWeak: true, // type of strength. true - weak, false - strong
      solvent: false, // solvent visibility
      concentration: 0.01,
      strength: 0.25,
      ph: 4.5
    } );
  }

  inherit( PropertySet, AcidBaseSolutionsModel, {
    step: function() {},
    reset: function() {
      PropertySet.prototype.reset.call( this );
    }
  } );

  return AcidBaseSolutionsModel;
} );