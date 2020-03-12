// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model for the 'Introduction' screen in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import acidBaseSolutions from '../../acidBaseSolutions.js';
import SolutionType from '../../common/enum/SolutionType.js';
import ABSModel from '../../common/model/ABSModel.js';
import StrongAcid from '../../common/model/solutions/StrongAcid.js';
import StrongBase from '../../common/model/solutions/StrongBase.js';
import Water from '../../common/model/solutions/Water.js';
import WeakAcid from '../../common/model/solutions/WeakAcid.js';
import WeakBase from '../../common/model/solutions/WeakBase.js';

class IntroductionModel extends ABSModel {

  constructor() {

    const solutions = [
      new Water(),
      new StrongAcid(),
      new WeakAcid(),
      new StrongBase(),
      new WeakBase()
    ];

    super( solutions, SolutionType.WATER );
  }
}

acidBaseSolutions.register( 'IntroductionModel', IntroductionModel );
export default IntroductionModel;