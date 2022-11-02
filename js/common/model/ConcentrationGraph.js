// Copyright 2014-2021, University of Colorado Boulder

// @ts-nocheck
/**
 * Model for the concentration graph in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import acidBaseSolutions from '../../acidBaseSolutions.js';

class ConcentrationGraph {

  /**
   * @param {Beaker} beaker
   * @param {Map<SoluteType,AqueousSolution>} solutionsMap
   * @param {Property.<SolutionType>} solutionTypeProperty
   */
  constructor( beaker, solutionsMap, solutionTypeProperty ) {

    // @public
    this.solutionsMap = solutionsMap;
    this.solutionTypeProperty = solutionTypeProperty;

    // @public dimensions of the graph's background
    this.width = 0.5 * beaker.size.width;
    this.height = 0.9 * beaker.size.height;

    // @public position, origin at upper-left corner
    this.position = beaker.position.plusXY( ( this.width - beaker.size.width ) / 2, -( beaker.size.height + this.height ) / 2 );
  }
}

acidBaseSolutions.register( 'ConcentrationGraph', ConcentrationGraph );
export default ConcentrationGraph;