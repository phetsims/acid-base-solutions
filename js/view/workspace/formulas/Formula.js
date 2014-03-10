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
    var maxWidth,
      formula,
      formulas = {};
    Node.call( this, options );
    this.setPickable( false );


    formulas[model.SOLUTIONS[0].type] = new WaterFormula();
    formulas[model.SOLUTIONS[1].type] = new AcidFormula( false );
    formulas[model.SOLUTIONS[2].type] = new AcidFormula( true );
    formulas[model.SOLUTIONS[3].type] = new StrongBaseFormula();
    formulas[model.SOLUTIONS[4].type] = new WeakBaseFormula();

    // find max width of formulas
    maxWidth = getMaxWidth( formulas );


    // add formulas with central alignment
    for ( formula in formulas ) {
      if ( formulas.hasOwnProperty( formula ) ) {
        formulas[formula].setX( (maxWidth - formulas[formula].getWidth()) / 2 );
        formulas[formula].setVisible( false );
        this.addChild( formulas[formula] );
      }
    }

    // add observer for formulas
    model.property( 'solution' ).link( function( newSolution, prevSolution ) {
      // hide previous formula
      if ( prevSolution ) {
        formulas[prevSolution].setVisible( false );
      }

      // show new formula
      formulas[newSolution].setVisible( true );
    } );
  }

  var getMaxWidth = function( formulas ) {
    var maxWidth = 0, formula;
    for ( formula in formulas ) {
      if ( formulas.hasOwnProperty( formula ) ) {
        maxWidth = Math.max( maxWidth, formulas[formula].getWidth() );
      }
    }

    return maxWidth;
  };

  return inherit( Node, Formula );
} );
