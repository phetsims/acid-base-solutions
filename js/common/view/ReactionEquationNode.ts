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
import { SolutionType } from '../model/SolutionType.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';

export default class ReactionEquationNode extends Node {

  public constructor( beaker: Beaker, solutionTypeProperty: ReadOnlyProperty<SolutionType>, tandem: Tandem ) {

    super( {
      children: [
        ReactionEquationFactory.createWaterEquation( solutionTypeProperty ),
        ReactionEquationFactory.createStrongAcidEquation( solutionTypeProperty ),
        ReactionEquationFactory.createWeakAcidEquation( solutionTypeProperty ),
        ReactionEquationFactory.createStrongBaseEquation( solutionTypeProperty ),
        ReactionEquationFactory.createWeakBaseEquation( solutionTypeProperty )
      ],
      tandem: tandem
    } );

    // center below the beaker
    this.boundsProperty.link( bounds => {
      this.centerX = beaker.position.x;
      this.top = beaker.position.y + 10;
    } );

    this.addLinkedElement( solutionTypeProperty, {
      tandem: tandem.createTandem( solutionTypeProperty.tandem.name )
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

acidBaseSolutions.register( 'ReactionEquationNode', ReactionEquationNode );