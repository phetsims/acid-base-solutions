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

  var PH_COOLORS = [
    'rgb(182,70,72)',
    'rgb(196,80,86)',
    'rgb(213,83,71)',
    'rgb(237,123,83)',
    'rgb(246,152,86)',
    'rgb(244,158,79)',
    'rgb(243,160,78)',
    'rgb(244,182,67)',
    'rgb(231,201,75)',
    'rgb(93,118,88)',
    'rgb(30,92,89)',
    'rgb(34,90,105)',
    'rgb(39,87,111)',
    'rgb(27,67,90)',
    'rgb(0,34,52)',
    // pH paper color
    'rgb(217,215,154)' // cream
  ];

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

    // pH color keys
    this.PH_COOLORS = PH_COOLORS;

    PropertySet.call( this, {
      solution: 0, // solution's number
      testMode: self.TEST_MODES[1],
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