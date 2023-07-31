// Copyright 2014-2023, University of Colorado Boulder

/**
 * MagnifyingGlass is the model for the magnifying glass. It shows a qualitative view of the ratio of concentrations
 * for particles in the solution.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import Beaker from './Beaker.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import AqueousSolution from './solutions/AqueousSolution.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';

export default class MagnifyingGlass extends PhetioObject {

  public readonly solutions: AqueousSolution[];
  public readonly solutionProperty: TReadOnlyProperty<AqueousSolution>;
  public readonly radius: number;
  public readonly position: Vector2; // position, origin at center of glass

  public constructor( beaker: Beaker, solutions: AqueousSolution[], solutionProperty: ReadOnlyProperty<AqueousSolution>, tandem: Tandem ) {

    super( {
      isDisposable: false,
      tandem: tandem,
      phetioState: false
    } );

    this.solutions = solutions;
    this.solutionProperty = solutionProperty;
    this.radius = 0.465 * beaker.size.height;
    this.position = beaker.position.plusXY( 0, -beaker.size.height / 2 );

    this.addLinkedElement( solutionProperty );
  }
}

acidBaseSolutions.register( 'MagnifyingGlass', MagnifyingGlass );