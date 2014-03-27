// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for the 'Solution' control panel in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' ),
    ConcentrationSliderModel = require( 'ACID_BASE_SOLUTIONS/model/ConcentrationSliderModel' ),
    StrengthSliderModel = require( 'ACID_BASE_SOLUTIONS/model/StrengthSliderModel' );

  // strings
  var solutionString = require( 'string!ACID_BASE_SOLUTIONS/solution' );

  /**
   * @param {Property<SolutionType>} solutionTypeProperty
   * @param {Property<Number>} concentrationProperty
   * @param {Property<Number>} strengthProperty
   * @param {Property<Boolean>} isAcidProperty
   * @param {Property<Boolean>} isWeakProperty
   * @constructor
   */
  function SolutionMenuModel( solutionTypeProperty, concentrationProperty, strengthProperty, isAcidProperty, isWeakProperty ) {

    // control panel's title
    this.title = solutionString;

    // properties for radio buttons
    this.isAcidProperty = isAcidProperty; // type of solution. true - acid, false - base
    this.isWeakProperty = isWeakProperty; // type of strength. true - weak, false - strong

    // model for strength slider
    this.strengthSliderModel = new StrengthSliderModel( strengthProperty, isWeakProperty );

    // model for concentration slider
    this.concentrationSliderModel = new ConcentrationSliderModel( concentrationProperty );

    // update solution type if it was changed by radio buttons
    var setSolutionType = function() {
      var isAcid = isAcidProperty.value,
        isWeak = isWeakProperty.value;

      if ( isWeak && isAcid ) {
        solutionTypeProperty.value = SolutionType.WEAK_ACID;
      }
      else if ( isWeak && !isAcid ) {
        solutionTypeProperty.value = SolutionType.WEAK_BASE;
      }
      else if ( !isWeak && isAcid ) {
        solutionTypeProperty.value = SolutionType.STRONG_ACID;
      }
      else if ( !isWeak && !isAcid ) {
        solutionTypeProperty.value = SolutionType.STRONG_BASE;
      }
    };

    // add observers
    isAcidProperty.link( setSolutionType );
    isWeakProperty.link( setSolutionType );
  }

  SolutionMenuModel.prototype = {
    reset: function() {
      this.strengthSliderModel.reset();
      this.concentrationSliderModel.reset();
    }
  };

  return SolutionMenuModel;
} );