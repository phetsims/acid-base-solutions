// Copyright 2014-2023, University of Colorado Boulder

/**
 * ReactionEquationNode displays the reaction equation that appears below the beaker.
 * The equation corresponds to the selected solution.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ReactionEquationFactory from './ReactionEquationFactory.js';
import Beaker from '../model/Beaker.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import AqueousSolution from '../model/solutions/AqueousSolution.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';

export default class ReactionEquationNode extends Node {

  public constructor( beaker: Beaker, solutionProperty: ReadOnlyProperty<AqueousSolution>, tandem: Tandem ) {

    super( {

      // A Node for each possible equation, each of which controls its own visibility based on solutionProperty.
      children: [
        ReactionEquationFactory.createWaterEquation( solutionProperty ),
        ReactionEquationFactory.createStrongAcidEquation( solutionProperty ),
        ReactionEquationFactory.createWeakAcidEquation( solutionProperty ),
        ReactionEquationFactory.createStrongBaseEquation( solutionProperty ),
        ReactionEquationFactory.createWeakBaseEquation( solutionProperty )
      ],
      isDisposable: false,
      tandem: tandem
    } );

    // center below the beaker
    this.boundsProperty.link( bounds => {
      this.centerX = beaker.position.x;
      this.top = beaker.position.y + 10;
    } );

    this.addLinkedElement( solutionProperty );
  }
}

acidBaseSolutions.register( 'ReactionEquationNode', ReactionEquationNode );