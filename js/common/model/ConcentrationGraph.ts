// Copyright 2014-2022, University of Colorado Boulder

/**
 * Model for the concentration graph in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import { SolutionType } from '../enum/SolutionType.js';
import Beaker from './Beaker.js';
import { SolutionMap } from './ABSModel.js';

export default class ConcentrationGraph {

  public readonly solutionsMap: SolutionMap;
  public readonly solutionTypeProperty: TReadOnlyProperty<SolutionType>;
  public readonly width: number; // dimensions of the graph's background
  public readonly height: number;
  public readonly position: Vector2; // position, origin at upper-left corner

  public constructor( beaker: Beaker,
                      solutionsMap: SolutionMap,
                      solutionTypeProperty: TReadOnlyProperty<SolutionType> ) {

    this.solutionsMap = solutionsMap;
    this.solutionTypeProperty = solutionTypeProperty;
    this.width = 0.5 * beaker.size.width;
    this.height = 0.9 * beaker.size.height;
    this.position = beaker.position.plusXY( ( this.width - beaker.size.width ) / 2, -( beaker.size.height + this.height ) / 2 );
  }
}

acidBaseSolutions.register( 'ConcentrationGraph', ConcentrationGraph );