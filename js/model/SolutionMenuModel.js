// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the solution control panel in 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var ControlPanels = require( 'ACID_BASE_SOLUTIONS/model/Constants/ControlPanels' ),
    Solutions = require( 'ACID_BASE_SOLUTIONS/model/Constants/Solutions' ),
    ConcentrationSliderModel = require( 'ACID_BASE_SOLUTIONS/model/ConcentrationSliderModel' ),
    StrengthSliderModel = require( 'ACID_BASE_SOLUTIONS/model/StrengthSliderModel' ),

  // strings
    solutionString = require( 'string!ACID_BASE_SOLUTIONS/solution' );

  function SolutionMenuModel( solutionProperty, concentrationProperty, strengthProperty, isAcidProperty, isWeakProperty ) {
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

    // update solution type if it was changed by radio buttons
    var setSolution = function() {
      var isAcid = isAcidProperty.value,
        isWeak = isWeakProperty.value;

      if ( isWeak && isAcid ) {
        solutionProperty.value = Solutions.WEAK_ACID;
      }
      else if ( isWeak && !isAcid ) {
        solutionProperty.value = Solutions.WEAK_BASE;
      }
      else if ( !isWeak && isAcid ) {
        solutionProperty.value = Solutions.STRONG_ACID;
      }
      else if ( !isWeak && !isAcid ) {
        solutionProperty.value = Solutions.STRONG_BASE;
      }
    };

    // add observers
    isAcidProperty.link( setSolution );
    isWeakProperty.link( setSolution );
  }

  SolutionMenuModel.prototype = {
    reset: function() {
      this.strengthSlider.reset();
      this.concentrationSlider.reset();
    }
  };

  return SolutionMenuModel;
} );