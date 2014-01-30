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

  function Formula( model, options ) {
    var self = this;
    Node.call( this, options );

    // add all formulas
    formulas.forEach( function( formula ) {
      self.addChild( formula );
    } );

    // add observer for formulas
    model.property( 'solution' ).link( function( solution ) {
      var index = model.SOLUTIONS.indexOf( solution );
      formulas.forEach( function( formula, i ) {
        formula.setVisible( i === index );
      } );
    } );
  }

  return inherit( Node, Formula );
} );
