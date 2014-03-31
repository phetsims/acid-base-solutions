// Copyright 2002-2014, University of Colorado Boulder

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
    SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' ),
    WaterFormula = require( 'ACID_BASE_SOLUTIONS/common/view/formulas/WaterFormula' ),
    AcidFormula = require( 'ACID_BASE_SOLUTIONS/common/view/formulas/AcidFormula' ),
    StrongBaseFormula = require( 'ACID_BASE_SOLUTIONS/common/view/formulas/StrongBaseFormula' ),
    WeakBaseFormula = require( 'ACID_BASE_SOLUTIONS/common/view/formulas/WeakBaseFormula' );

  /**
   * @param {Beaker} beaker
   * @param {Property<SolutionType>} solutionTypeProperty
   * @constructor
   */
  function Formula( beaker, solutionTypeProperty ) {
    var maxWidth,
      formula,
      formulas = {};
    Node.call( this, {pickable: false} );

    formulas[SolutionType.WATER] = new WaterFormula();
    formulas[SolutionType.STRONG_ACID] = new AcidFormula( false );
    formulas[SolutionType.WEAK_ACID] = new AcidFormula( true );
    formulas[SolutionType.STRONG_BASE] = new StrongBaseFormula();
    formulas[SolutionType.WEAK_BASE] = new WeakBaseFormula();

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

    // position below the beaker
    this.translation = beaker.location.plusXY( -maxWidth / 2, 5 );

    // add observer for formulas
    solutionTypeProperty.link( function( newSolutionType, prevSolutionType ) {
      // hide previous formula
      if ( prevSolutionType ) {
        formulas[prevSolutionType].setVisible( false );
      }

      // show new formula
      formulas[newSolutionType].setVisible( true );
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
