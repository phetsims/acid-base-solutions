// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for formulas in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Solutions = require( 'ACID_BASE_SOLUTIONS/model/Constants/Solutions' ),
    WaterFormula = require( 'ACID_BASE_SOLUTIONS/view/workspace/formulas/WaterFormula' ),
    AcidFormula = require( 'ACID_BASE_SOLUTIONS/view/workspace/formulas/AcidFormula' ),
    StrongBaseFormula = require( 'ACID_BASE_SOLUTIONS/view/workspace/formulas/StrongBaseFormula' ),
    WeakBaseFormula = require( 'ACID_BASE_SOLUTIONS/view/workspace/formulas/WeakBaseFormula' );

  function Formula( formulaModel ) {
    var maxWidth,
      formula,
      formulas = {};
    Node.call( this, {pickable: false} );

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

    this.translation = formulaModel.location.plusXY( -maxWidth / 2, 5 );

    // add observer for formulas
    formulaModel.solutionProperty.link( function( newSolution, prevSolution ) {
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
