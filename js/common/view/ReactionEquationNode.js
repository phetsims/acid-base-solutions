// Copyright 2014-2020, University of Colorado Boulder

/**
 * This node displays the reaction equation that appears below the beaker.
 * It displays the equation that corresponds to the selected solution type.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ReactionEquationFactory = require( 'ACID_BASE_SOLUTIONS/common/view/ReactionEquationFactory' );
  const SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );

  class ReactionEquationNode extends Node {

    /**
     * @param {Beaker} beaker
     * @param {Property.<SolutionType>} solutionTypeProperty
     */
    constructor( beaker, solutionTypeProperty ) {

      super();

      const equations = {};
      equations[ SolutionType.WATER ] = ReactionEquationFactory.createWaterEquation();
      equations[ SolutionType.STRONG_ACID ] = ReactionEquationFactory.createStrongAcidEquation();
      equations[ SolutionType.WEAK_ACID ] = ReactionEquationFactory.createWeakAcidEquation();
      equations[ SolutionType.STRONG_BASE ] = ReactionEquationFactory.createStrongBaseEquation();
      equations[ SolutionType.WEAK_BASE ] = ReactionEquationFactory.createWeakBaseEquation();

      // find max width of equations
      const maxWidth = getMaxWidth( equations );

      // add equations with central alignment
      for ( const equation in equations ) {
        equations[ equation ].setX( ( maxWidth - equations[ equation ].getWidth() ) / 2 );
        equations[ equation ].setVisible( false );
        this.addChild( equations[ equation ] );
      }

      // position below the beaker
      this.translation = beaker.position.plusXY( -maxWidth / 2, 10 );

      // add observer for equations
      solutionTypeProperty.link( ( newSolutionType, prevSolutionType ) => {
        // hide previous equation
        if ( prevSolutionType ) {
          equations[ prevSolutionType ].setVisible( false );
        }

        // show new equation
        equations[ newSolutionType ].setVisible( true );
      } );
    }
  }

  function getMaxWidth( equations ) {
    let maxWidth = 0;
    for ( const equation in equations ) {
      maxWidth = Math.max( maxWidth, equations[ equation ].getWidth() );
    }
    return maxWidth;
  }

  return acidBaseSolutions.register( 'ReactionEquationNode', ReactionEquationNode );
} );
