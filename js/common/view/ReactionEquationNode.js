// Copyright 2014-2021, University of Colorado Boulder

/**
 * This node displays the reaction equation that appears below the beaker.
 * It displays the equation that corresponds to the selected solution type.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import SolutionType from '../enum/SolutionType.js';
import ReactionEquationFactory from './ReactionEquationFactory.js';

class ReactionEquationNode extends Node {

  /**
   * @param {Beaker} beaker
   * @param {Property.<SolutionType>} solutionTypeProperty
   */
  constructor( beaker, solutionTypeProperty ) {

    super();

    // create an associative array, so we can look up equations by solutionType
    const equations = {};
    equations[ SolutionType.WATER.name ] = ReactionEquationFactory.createWaterEquation();
    equations[ SolutionType.STRONG_ACID.name ] = ReactionEquationFactory.createStrongAcidEquation();
    equations[ SolutionType.WEAK_ACID.name ] = ReactionEquationFactory.createWeakAcidEquation();
    equations[ SolutionType.STRONG_BASE.name ] = ReactionEquationFactory.createStrongBaseEquation();
    equations[ SolutionType.WEAK_BASE.name ] = ReactionEquationFactory.createWeakBaseEquation();

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
        equations[ prevSolutionType.name ].setVisible( false );
      }

      // show new equation
      equations[ newSolutionType.name ].setVisible( true );
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

acidBaseSolutions.register( 'ReactionEquationNode', ReactionEquationNode );
export default ReactionEquationNode;