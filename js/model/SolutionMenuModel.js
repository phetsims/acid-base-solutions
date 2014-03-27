// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for the 'Solution' control panel in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' );
  var SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );

  // strings
  var solutionString = require( 'string!ACID_BASE_SOLUTIONS/solution' );

  /**
   * @param {Property<SolutionType>} solutionTypeProperty
   * @param {Property<Number>} concentrationProperty
   * @param {Property<Number>} strengthProperty
   * @constructor
   */
  function SolutionMenuModel( solutionTypeProperty, concentrationProperty, strengthProperty ) {

    var self = this;

    // control panel's title
    this.title = solutionString;

    // properties for radio buttons
    this.isAcidProperty = new Property( solutionTypeProperty.value === SolutionType.WEAK_ACID || solutionTypeProperty.value === SolutionType.STRONG_ACID );
    this.isWeakProperty = new Property( solutionTypeProperty.value === SolutionType.WEAK_ACID || solutionTypeProperty.value === SolutionType.WEAK_ACID );

    this.concentrationProperty = concentrationProperty;
    this.strengthProperty = strengthProperty;

    // update solution type if it was changed by radio buttons
    var updateSolutionType = function() {
      var isAcid = self.isAcidProperty.value,
        isWeak = self.isWeakProperty.value;

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
    self.isAcidProperty.link( updateSolutionType.bind( this ) );
    self.isWeakProperty.link( updateSolutionType.bind( this ) );
  }

  SolutionMenuModel.prototype = {
    //TODO see where this is called and delete it.
    reset: function() {}
  };

  return SolutionMenuModel;
} );