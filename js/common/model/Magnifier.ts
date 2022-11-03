// Copyright 2014-2022, University of Colorado Boulder

/**
 * Model for the magnifier in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import { SolutionType } from '../enum/SolutionType.js';
import Beaker from './Beaker.js';
import { SolutionMap } from './ABSModel.js';

export default class Magnifier {

  public readonly solutionsMap: SolutionMap;
  public readonly solutionTypeProperty: TReadOnlyProperty<SolutionType>;
  public readonly radius: number;
  public readonly position: Vector2; // magnifier position, origin at center of glass

  public constructor( beaker: Beaker,
                      solutionsMap: SolutionMap,
                      solutionTypeProperty: TReadOnlyProperty<SolutionType> ) {
    this.solutionsMap = solutionsMap;
    this.solutionTypeProperty = solutionTypeProperty;
    this.radius = 0.465 * beaker.size.height;
    this.position = beaker.position.plusXY( 0, -beaker.size.height / 2 );
  }
}

acidBaseSolutions.register( 'Magnifier', Magnifier );