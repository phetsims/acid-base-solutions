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
    var self = this, maxWidth = 0;
    Node.call( this, options );
    this.setPickable( false );

    var formulas = [
      new WaterFormula(),
      new AcidFormula( false ),
      new AcidFormula( true ),
      new StrongBaseFormula(),
      new WeakBaseFormula()
    ];

    // find max width
    formulas.forEach( function( formula ) {
      maxWidth = Math.max( maxWidth, formula.getWidth() );
    } );

    // add formulas with central alignment
    formulas.forEach( function( formula ) {
      formula.setX( (maxWidth - formula.getWidth()) / 2 );
      formula.setVisible( false );
      self.addChild( formula );
    } );

    // add observer for formulas
    model.property( 'solution' ).link( function( newSolution, prevSolution ) {
      var formulaIndex;

      // hide previous formula
      if ( prevSolution ) {
        formulaIndex = getSolutionIndex( model, prevSolution );
        formulas[formulaIndex].setVisible( false );
      }

      // show new formula
      formulaIndex = getSolutionIndex( model, newSolution );
      formulas[formulaIndex].setVisible( true );
    } );
  }

  var getSolutionIndex = function( model, solutionType ) {
    var index;
    model.SOLUTIONS.forEach( function( sol, i ) {
      if ( sol.type === solutionType ) {
        index = i;
      }
    } );
    return index;
  };

  return inherit( Node, Formula );
} );
