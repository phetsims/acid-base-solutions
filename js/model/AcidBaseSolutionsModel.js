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
    PropertySet = require( 'AXON/PropertySet' ),
    WaterSolution = require( './WaterSolution' ),
    StrongAcidSolution = require( './StrongAcidSolution' ),
    WeakAcidSollution = require( './WeakAcidSollution' ),
    StrongBaseSolution = require( './StrongBaseSolution' ),
    WeakBaseSolution = require( './WeakBaseSolution' ),

    introductionTitleString = require( 'string!ACID_BASE_SOLUTIONS/introductionTitle' ),
    customSolutionTitleString = require( 'string!ACID_BASE_SOLUTIONS/customSolutionTitle' );

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

    // possible test modes
    this.SOLUTIONS = [
      {type: 'WATER', constructor: WaterSolution},
      {type: 'STRONG_ACID', constructor: StrongAcidSolution},
      {type: 'WEAK_ACID', constructor: WeakAcidSollution},
      {type: 'STRONG_BASE', constructor: StrongBaseSolution},
      {type: 'WEAK_BASE', constructor: WeakBaseSolution}
    ];

    // pH color keys
    this.PH_COOLORS = PH_COOLORS;

    PropertySet.call( this, {
      solution: self.SOLUTIONS[0].type, // solution's type
      testMode: self.TEST_MODES[0], // test mode
      viewMode: self.VIEW_MODES[0], // view mode
      solvent: false, // solvent visibility
      ph: 4.5
    } );

    // add properties for custom tab
    if ( customSolutionTitleString === mode ) {
      PropertySet.call( this, {
        isAcid: true, // type of solution. true - acid, false - base
        isWeak: true, // type of strength. true - weak, false - strong
        concentration: 0.01,
        strength: 0.25
      } );

      var setSolution = function() {
        var map = [
          [self.SOLUTIONS[3], self.SOLUTIONS[4]],
          [self.SOLUTIONS[1], self.SOLUTIONS[2]]
        ];

        self.solution = map[+self.isAcid][+self.isWeak];
      };
      this.property( 'isAcid' ).link( setSolution );
      this.property( 'isWeak' ).link( setSolution );
    }

    if ( introductionTitleString === mode ) {
      this.components = {};
      for ( var i = 0; i < this.SOLUTIONS.length; i++ ) {
        this.components[this.SOLUTIONS[i].type] = new this.SOLUTIONS[i].constructor();
      }
    }
  }

  inherit( PropertySet, AcidBaseSolutionsModel, {
    step: function() {},
    reset: function() {
      PropertySet.prototype.reset.call( this );
    }
  } );

  return AcidBaseSolutionsModel;
} );