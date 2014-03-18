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
    Solutions = require( 'model/Constants/Solutions' ),

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


    formulas[Solutions.WATER] = new WaterFormula();
    formulas[Solutions.STRONG_ACID] = new AcidFormula( false );
    formulas[Solutions.WEAK_ACID] = new AcidFormula( true );
    formulas[Solutions.STRONG_BASE] = new StrongBaseFormula();
    formulas[Solutions.WEAK_BASE] = new WeakBaseFormula();

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
