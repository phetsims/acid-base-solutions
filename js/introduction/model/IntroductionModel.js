// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model for the 'Introduction' screen in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import acidBaseSolutions from '../../acidBaseSolutions.js';
import SolutionType from '../../common/enum/SolutionType.js';
import ABSModel from '../../common/model/ABSModel.js';
import StrongAcidSolution from '../../common/model/solutions/StrongAcidSolution.js';
import StrongBaseSolution from '../../common/model/solutions/StrongBaseSolution.js';
import WaterSolution from '../../common/model/solutions/WaterSolution.js';
import WeakAcidSolution from '../../common/model/solutions/WeakAcidSolution.js';
import WeakBaseSolution from '../../common/model/solutions/WeakBaseSolution.js';

class IntroductionModel extends ABSModel {

  constructor() {

    const solutions = [
      new WaterSolution(),
      new StrongAcidSolution(),
      new WeakAcidSolution(),
      new StrongBaseSolution(),
      new WeakBaseSolution()
    ];

    super( solutions, SolutionType.WATER );
  }
}

acidBaseSolutions.register( 'IntroductionModel', IntroductionModel );
export default IntroductionModel;