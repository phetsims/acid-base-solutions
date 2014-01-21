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
    // dimensions of the model's space
    this.width = width;
    this.height = height;

    this.mode = mode;

    PropertySet.call( this, {
      solution: 0, // solution's number
      testMode: 0,
      viewMode: 0,
      isTypeAcid: true, // type of solution. true - acid, false - base
      solvent: false // solvent visibility
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