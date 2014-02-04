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

  function Formula( model, options ) {
    Node.call( this, options );

    this.formulas = [
      new WaterFormula( model ),
      new AcidFormula( model, {}, false ),
      new AcidFormula( model, {}, true ),
      new StrongBaseFormula( model ),
      new WeakBaseFormula( model )
    ];

    this.addChild( this.formulas[0] );
  }

  return inherit( Node, Formula, {
    showFormula: function( index ) {
      this.removeAllChildren();
      this.addChild( this.formulas[index] );
    }
  } );
} );
