[object Promise]

/**
 * Model for the magnifier in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import acidBaseSolutions from '../../acidBaseSolutions.js';

class Magnifier {
  /**
   * @param {Beaker} beaker
   * @param {AqueousSolution[]} solutions
   * @param {Property.<SolutionType>} solutionTypeProperty
   */
  constructor( beaker, solutions, solutionTypeProperty ) {

    // @public
    this.solutions = solutions;
    this.solutionTypeProperty = solutionTypeProperty;

    // @public magnifier radius
    this.radius = 0.465 * beaker.size.height;

    // @public magnifier position, origin at center of glass
    this.position = beaker.position.plusXY( 0, -beaker.size.height / 2 );
  }
}

acidBaseSolutions.register( 'Magnifier', Magnifier );
export default Magnifier;