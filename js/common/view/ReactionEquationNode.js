// Copyright 2002-2014, University of Colorado Boulder

/**
 * This node displays the reaction equation that appears below the beaker.
 * It displays the equation that corresponds to the selected solution type.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // modules
  var ReactionEquationFactory = require( 'ACID_BASE_SOLUTIONS/common/view/ReactionEquationFactory' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );

  /**
   * @param {Beaker} beaker
   * @param {Property.<SolutionType>} solutionTypeProperty
   * @constructor
   */
  function ReactionEquationNode( beaker, solutionTypeProperty ) {

    Node.call( this );

    var equations = {};
    equations[SolutionType.WATER] = ReactionEquationFactory.createWaterEquation();
    equations[SolutionType.STRONG_ACID] = ReactionEquationFactory.createStrongAcidEquation();
    equations[SolutionType.WEAK_ACID] = ReactionEquationFactory.createWeakAcidEquation();
    equations[SolutionType.STRONG_BASE] = ReactionEquationFactory.createStrongBaseEquation();
    equations[SolutionType.WEAK_BASE] = ReactionEquationFactory.createWeakBaseEquation();

    // find max width of equations
    var maxWidth = getMaxWidth( equations );

    // add equations with central alignment
    for ( var equation in equations ) {
      equations[equation].setX( (maxWidth - equations[equation].getWidth()) / 2 );
      equations[equation].setVisible( false );
      this.addChild( equations[equation] );
    }

    // position below the beaker
    this.translation = beaker.location.plusXY( -maxWidth / 2, 10 );

    // add observer for equations
    solutionTypeProperty.link( function( newSolutionType, prevSolutionType ) {
      // hide previous equation
      if ( prevSolutionType ) {
        equations[prevSolutionType].setVisible( false );
      }

      // show new equation
      equations[newSolutionType].setVisible( true );
    } );
  }

  var getMaxWidth = function( equations ) {
    var maxWidth = 0;
    for ( var equation in equations ) {
      maxWidth = Math.max( maxWidth, equations[equation].getWidth() );
    }
    return maxWidth;
  };

  return inherit( Node, ReactionEquationNode );
} );
