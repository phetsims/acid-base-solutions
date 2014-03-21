// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the solution control panel in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var ControlPanels = require( 'ACID_BASE_SOLUTIONS/model/Constants/ControlPanels' ),
    SolutionTypes = require( 'ACID_BASE_SOLUTIONS/model/Constants/SolutionTypes' ),
    ConcentrationSliderModel = require( 'ACID_BASE_SOLUTIONS/model/ConcentrationSliderModel' ),
    StrengthSliderModel = require( 'ACID_BASE_SOLUTIONS/model/StrengthSliderModel' ),

  // strings
    solutionString = require( 'string!ACID_BASE_SOLUTIONS/solution' );

  /**
   * @param {Property<SolutionTypes>} solutionTypeProperty
   * @param {Property<Number>} concentrationProperty
   * @param {Property<Number>} strengthProperty
   * @param {Property<Boolean>} isAcidProperty
   * @param {Property<Boolean>} isWeakProperty
   * @constructor
   */
  function SolutionMenuModel( solutionTypeProperty, concentrationProperty, strengthProperty, isAcidProperty, isWeakProperty ) {
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
    var setSolutionType = function() {
      var isAcid = isAcidProperty.value,
        isWeak = isWeakProperty.value;

      if ( isWeak && isAcid ) {
        solutionTypeProperty.value = SolutionTypes.WEAK_ACID;
      }
      else if ( isWeak && !isAcid ) {
        solutionTypeProperty.value = SolutionTypes.WEAK_BASE;
      }
      else if ( !isWeak && isAcid ) {
        solutionTypeProperty.value = SolutionTypes.STRONG_ACID;
      }
      else if ( !isWeak && !isAcid ) {
        solutionTypeProperty.value = SolutionTypes.STRONG_BASE;
      }
    };

    // add observers
    isAcidProperty.link( setSolutionType );
    isWeakProperty.link( setSolutionType );
  }

  SolutionMenuModel.prototype = {
    reset: function() {
      this.strengthSlider.reset();
      this.concentrationSlider.reset();
    }
  };

  return SolutionMenuModel;
} );