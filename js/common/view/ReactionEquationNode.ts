// Copyright 2014-2021, University of Colorado Boulder

// @ts-nocheck
/**
 * This node displays the reaction equation that appears below the beaker.
 * It displays the equation that corresponds to the selected solution type.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import { Node } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ReactionEquationFactory from './ReactionEquationFactory.js';

class ReactionEquationNode extends Node {

  /**
   * @param {Beaker} beaker
   * @param {Property.<SolutionType>} solutionTypeProperty
   */
  constructor( beaker, solutionTypeProperty ) {

    super();

    // create a Map, so we can look up equations by SolutionType
    const equations = new Map();
    equations.set( 'water', ReactionEquationFactory.createWaterEquation() );
    equations.set( 'strongAcid', ReactionEquationFactory.createStrongAcidEquation() );
    equations.set( 'weakAcid', ReactionEquationFactory.createWeakAcidEquation() );
    equations.set( 'strongBase', ReactionEquationFactory.createStrongBaseEquation() );
    equations.set( 'weakBase', ReactionEquationFactory.createWeakBaseEquation() );

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
        equations.get( prevSolutionType ).setVisible( false );
      }

      // show new equation
      equations.get( newSolutionType ).setVisible( true );
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