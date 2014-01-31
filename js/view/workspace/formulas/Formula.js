// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for formulas in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),

    WaterFormula = require( './WaterFormula' ),
    AcidFormula = require( './AcidFormula' ),
    StrongBaseFormula = require( './StrongBaseFormula' ),
    WeakBaseFormula = require( './WeakBaseFormula' );

  var formulas = [
    new WaterFormula(),
    new AcidFormula( {}, false ),
    new AcidFormula( {}, true ),
    new StrongBaseFormula(),
    new WeakBaseFormula()
  ];

  function Formula( options ) {
    Node.call( this, options );

    this.addChild( formulas[0] );
  }

  return inherit( Node, Formula, {
    showFormula: function( index ) {
      this.removeAllChildren();
      this.addChild( formulas[index] );
    }
  } );
} );
