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
import Tandem from '../../../../tandem/js/Tandem.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

export default class ReactionEquationNode extends Node {

  public constructor( beaker: Beaker, solutionTypeProperty: TReadOnlyProperty<SolutionType>, tandem: Tandem ) {

    // create a Map, so we can look up equations by SolutionType
    const equationsMap = new Map<SolutionType, Node>();
    equationsMap.set( 'water',
      ReactionEquationFactory.createWaterEquation( new DerivedProperty( [ solutionTypeProperty ], solutionType => solutionType === 'water' ) ) );
    equationsMap.set( 'strongAcid',
      ReactionEquationFactory.createStrongAcidEquation( new DerivedProperty( [ solutionTypeProperty ], solutionType => solutionType === 'strongAcid' ) ) );
    equationsMap.set( 'weakAcid',
      ReactionEquationFactory.createWeakAcidEquation( new DerivedProperty( [ solutionTypeProperty ], solutionType => solutionType === 'weakAcid' ) ) );
    equationsMap.set( 'strongBase',
      ReactionEquationFactory.createStrongBaseEquation( new DerivedProperty( [ solutionTypeProperty ], solutionType => solutionType === 'strongBase' ) ) );
    equationsMap.set( 'weakBase',
      ReactionEquationFactory.createWeakBaseEquation( new DerivedProperty( [ solutionTypeProperty ], solutionType => solutionType === 'weakBase' ) ) );

    super( {
      children: [ ...equationsMap.values() ],
      tandem: tandem
    } );

    // center below the beaker
    this.boundsProperty.link( bounds => {
      this.centerX = beaker.position.x;
      this.top = beaker.position.y + 10;
    } );

    // add observer for equations
    solutionTypeProperty.link( ( newSolutionType, previousSolutionType ) => {

      // hide previous equation
      if ( previousSolutionType ) {
        equationsMap.get( previousSolutionType )!.setVisible( false );
      }

      // show new equation
      equationsMap.get( newSolutionType )!.setVisible( true );
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

acidBaseSolutions.register( 'ReactionEquationNode', ReactionEquationNode );