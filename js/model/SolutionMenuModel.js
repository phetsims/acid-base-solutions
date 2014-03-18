// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the solution control panel in 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var ControlPanels = require( 'model/Constants/ControlPanels' ),
    ConcentrationSliderModel = require( 'model/ConcentrationSliderModel' ),
    StrengthSliderModel = require( 'model/StrengthSliderModel' ),

  // strings
    solutionString = require( 'string!ACID_BASE_SOLUTIONS/solution' );

  function SolutionMenuModel( concentrationProperty, strengthProperty, isAcidProperty, isWeakProperty ) {
    // control panel's type
    this.type = ControlPanels.SOLUTION;

    // control panel's title
    this.title = solutionString;

    // properties for radio buttons
    this.isAcid = isAcidProperty; // type of solution. true - acid, false - base
    this.isWeak = isWeakProperty; // type of strength. true - weak, false - strong

    // strength of solution
    this.strengthSlider = new StrengthSliderModel( strengthProperty, isWeakProperty );

    // concentration of solution
    this.concentrationSlider = new ConcentrationSliderModel( concentrationProperty );
  }

  return SolutionMenuModel;
} );