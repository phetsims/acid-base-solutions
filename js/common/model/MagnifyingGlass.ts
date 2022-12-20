// Copyright 2014-2022, University of Colorado Boulder

/**
 * MagnifyingGlass is the model for the magnifying glass. It shows a qualitative view of the ratio of concentrations
 * for particles in the solution.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import { SolutionType } from './SolutionType.js';
import Beaker from './Beaker.js';
import { SolutionMap } from './ABSModel.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';

export default class MagnifyingGlass extends PhetioObject {

  public readonly solutionsMap: SolutionMap;
  public readonly solutionTypeProperty: ReadOnlyProperty<SolutionType>;
  public readonly radius: number;
  public readonly position: Vector2; // position, origin at center of glass

  public constructor( beaker: Beaker,
                      solutionsMap: SolutionMap,
                      solutionTypeProperty: ReadOnlyProperty<SolutionType>,
                      tandem: Tandem ) {

    super( {
      tandem: tandem,
      phetioState: false
    } );

    this.solutionsMap = solutionsMap;
    this.solutionTypeProperty = solutionTypeProperty;
    this.radius = 0.465 * beaker.size.height;
    this.position = beaker.position.plusXY( 0, -beaker.size.height / 2 );

    this.addLinkedElement( solutionTypeProperty, {
      tandem: tandem.createTandem( solutionTypeProperty.tandem.name )
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

acidBaseSolutions.register( 'MagnifyingGlass', MagnifyingGlass );