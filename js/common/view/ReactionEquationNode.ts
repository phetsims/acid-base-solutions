// Copyright 2014-2022, University of Colorado Boulder

/**
 * This node displays the reaction equation that appears below the beaker.
 * It displays the equation that corresponds to the selected solution type.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import { Node } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ReactionEquationFactory from './ReactionEquationFactory.js';
import Beaker from '../model/Beaker.js';
import { SolutionType } from '../enum/SolutionType.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

export default class ReactionEquationNode extends Node {

  public constructor( beaker: Beaker, solutionTypeProperty: TReadOnlyProperty<SolutionType> ) {

    super();

    // create a Map, so we can look up equations by SolutionType
    const equationsMap = new Map<SolutionType, Node>();
    equationsMap.set( 'water', ReactionEquationFactory.createWaterEquation() );
    equationsMap.set( 'strongAcid', ReactionEquationFactory.createStrongAcidEquation() );
    equationsMap.set( 'weakAcid', ReactionEquationFactory.createWeakAcidEquation() );
    equationsMap.set( 'strongBase', ReactionEquationFactory.createStrongBaseEquation() );
    equationsMap.set( 'weakBase', ReactionEquationFactory.createWeakBaseEquation() );

    // find max width of equations
    const maxWidth = getMaxWidth( equationsMap );

    // Add all equations, initially invisible.
    equationsMap.forEach( ( node, solutionType ) => {
      node.visible = false;
      this.addChild( node );
    } );

    // center below the beaker
    this.boundsProperty.link( bounds => {
      this.translation = beaker.position.plusXY( -maxWidth / 2, 10 );
    } );

    // add observer for equations
    solutionTypeProperty.link( ( newSolutionType, prevSolutionType ) => {

      // hide previous equation
      if ( prevSolutionType ) {
        equationsMap.get( prevSolutionType )!.setVisible( false );
      }

      // show new equation
      equationsMap.get( newSolutionType )!.setVisible( true );
    } );
  }
}

function getMaxWidth( equationsMap: Map<SolutionType, Node> ): number {
  let maxWidth = 0;
  equationsMap.forEach( ( node, solutionType ) => {
    maxWidth = Math.max( maxWidth, node.width );
  } );
  return maxWidth;
}

acidBaseSolutions.register( 'ReactionEquationNode', ReactionEquationNode );