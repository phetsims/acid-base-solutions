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
    Color = require( 'SCENERY/util/Color' ),
    Range = require( 'DOT/Range' ),
    WaterSolution = require( './WaterSolution' ),
    StrongAcidSolution = require( './StrongAcidSolution' ),
    WeakAcidSolution = require( './WeakAcidSolution' ),
    StrongBaseSolution = require( './StrongBaseSolution' ),
    WeakBaseSolution = require( './WeakBaseSolution' ),

    customSolutionTitleString = require( 'string!ACID_BASE_SOLUTIONS/customSolutionTitle' );

  var PH_COLORS = [
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

  var AQUEOUS_SOLUTION = new Color( 193, 222, 227, 0.7 ), // transparent light blue
    GRAY = 'rgb(120,120,120)',
    H2O_FACTOR = 0.85,
    MOLECULES_COLORS = {
      A: 'rgb(0,170,255)',
      B: GRAY,
      BH: 'rgb(255,170,0)',
      H2O: new Color( AQUEOUS_SOLUTION.getRed() * H2O_FACTOR, AQUEOUS_SOLUTION.getGreen() * H2O_FACTOR, AQUEOUS_SOLUTION.getBlue() * H2O_FACTOR ),
      H3O: 'rgb(255,85,0)',
      HA: GRAY,
      M: 'rgb(255,170,0)',
      MOH: GRAY,
      OH: 'rgb(0,0,255)'
    };

  var CONSTANTS = {
    WATER_EQUILIBRIUM_CONSTANT: 1E-14,
    WATER_CONCENTRATION: 55.6, // water concentration when it's used as a solvent, mol/L
    CONCENTRATION_RANGE: new Range( 1E-3, 1, 1E-2 ),
    WEAK_STRENGTH_RANGE: new Range( 1E-10, 1E2, 1E-7 ),
    NEUTRAL_PH: 7,
    NEUTRAL_BRIGHTNESS: 0.05, // brightness when pH == NEUTRAL_PH
    MIN_PH: 0,
    MAX_PH: 14
  };

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

    // colors for molecules
    this.MOLECULES_COLORS = MOLECULES_COLORS;

    // simulation constants
    this.CONSTANTS = CONSTANTS;

    // possible test modes
    this.SOLUTIONS = [
      {type: 'WATER', constructor: WaterSolution, relations: [
        {type: 'H2O', property: 'H2O'},
        {type: 'H3O', property: 'H3O'},
        {type: 'OH', property: 'OH'}
      ]},
      {type: 'STRONG_ACID', constructor: StrongAcidSolution, relations: [
        {type: 'HA', property: 'solute'},
        {type: 'H2O', property: 'H2O'},
        {type: 'A', property: 'product'},
        {type: 'H3O', property: 'H3O'}
      ]},
      {type: 'WEAK_ACID', constructor: WeakAcidSolution, relations: [
        {type: 'HA', property: 'solute'},
        {type: 'H2O', property: 'H2O'},
        {type: 'A', property: 'product'},
        {type: 'H3O', property: 'H3O'}
      ]},
      {type: 'STRONG_BASE', constructor: StrongBaseSolution, relations: [
        {type: 'MOH', property: 'solute'},
        {type: 'M', property: 'product'},
        {type: 'OH', property: 'OH'}
      ]},
      {type: 'WEAK_BASE', constructor: WeakBaseSolution, relations: [
        {type: 'B', property: 'solute'},
        {type: 'H2O', property: 'H2O'},
        {type: 'BH', property: 'product'},
        {type: 'OH', property: 'OH'}
      ]}
    ];

    // pH color keys
    this.PH_COLORS = PH_COLORS;

    PropertySet.call( this, {
      solution: (customSolutionTitleString === mode ? self.SOLUTIONS[2].type : self.SOLUTIONS[0].type), // solution's type
      testMode: self.TEST_MODES[0], // test mode
      viewMode: self.VIEW_MODES[0], // view mode
      solvent: false, // solvent visibility
      ph: 0, // ph level of product
      brightness: 0, // brightness value
      resetTrigger: false // reset trigger
    } );

    // add model for each type of reaction
    this.components = {};
    var setPh = function( value ) { self.ph = value; }; // observer for ph property

    for ( var i = (customSolutionTitleString === mode ? 1 : 0), solution; i < this.SOLUTIONS.length; i++ ) {
      solution = new this.SOLUTIONS[i].constructor( CONSTANTS );
      solution.init();
      this.components[this.SOLUTIONS[i].type] = solution;
      solution.property( 'ph' ).link( setPh );
    }

    // set appropriate ph
    this.property( 'solution' ).link( function( solution ) {
      self.ph = self.components[solution].ph;
    } );

    // set brightness of light rays depend on ph value
    this.property( 'ph' ).link( function( pHValue ) {
      self.brightness = self.pHToBrightness( pHValue );
    } );

    // add properties for custom tab
    if ( customSolutionTitleString === mode ) {
      PropertySet.call( this, {
        isAcid: true, // type of solution. true - acid, false - base
        isWeak: true, // type of strength. true - weak, false - strong
        concentration: 0, // concentration of solution
        strength: 0  // strength of solution
      } );

      // update solution type if it was changed by radio buttons
      var setSolution = function() {
        var map = [
          [self.SOLUTIONS[3].type, self.SOLUTIONS[4].type],
          [self.SOLUTIONS[1].type, self.SOLUTIONS[2].type]
        ];

        self.solution = map[+self.isAcid][+self.isWeak];
        self.property( 'concentration' ).notifyObserversUnsafe();
        self.property( 'strength' ).notifyObserversUnsafe();
      };
      this.property( 'isAcid' ).link( setSolution );
      this.property( 'isWeak' ).link( setSolution );

      this.property( 'concentration' ).link( function( concentration ) {
        self.components[self.solution].concentration = concentration;
      } );

      this.property( 'strength' ).link( function( strength ) {
        self.components[self.solution].strength = strength;
      } );
    }
  }

  inherit( PropertySet, AcidBaseSolutionsModel, {
    step: function() {},
    reset: function() {
      // reset main properties
      this.property( 'solution' ).reset();
      this.property( 'testMode' ).reset();
      this.property( 'viewMode' ).reset();
      this.property( 'solvent' ).reset();

      // reset properties for custom tab
      if ( this.mode === customSolutionTitleString ) {
        // reset components properties
        for ( var solution in this.components ) {
          if ( this.components.hasOwnProperty( solution ) ) {
            this.components[solution].init();
          }
        }

        this.property( 'isAcid' ).reset();
        this.property( 'isWeak' ).reset();
      }

      // send signal to views for resetting
      this.resetTrigger = !this.resetTrigger;
    },
    pHToBrightness: function( pH ) {
      var NEUTRAL_PH = CONSTANTS.NEUTRAL_PH,
        NEUTRAL_BRIGHTNESS = CONSTANTS.NEUTRAL_BRIGHTNESS;

      return NEUTRAL_BRIGHTNESS + ( 1 - NEUTRAL_BRIGHTNESS ) * (pH < NEUTRAL_PH ? ( NEUTRAL_PH - pH ) / ( NEUTRAL_PH - CONSTANTS.MIN_PH ) : ( pH - NEUTRAL_PH ) / ( CONSTANTS.MAX_PH - NEUTRAL_PH ) );
    }
  } );

  return AcidBaseSolutionsModel;
} );