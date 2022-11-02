// Copyright 2014-2021, University of Colorado Boulder

/**
 * Model for the 'Introduction' screen in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSModel from '../../common/model/ABSModel.js';
import StrongAcid from '../../common/model/solutions/StrongAcid.js';
import StrongBase from '../../common/model/solutions/StrongBase.js';
import Water from '../../common/model/solutions/Water.js';
import WeakAcid from '../../common/model/solutions/WeakAcid.js';
import WeakBase from '../../common/model/solutions/WeakBase.js';

export default class IntroductionModel extends ABSModel {

  public constructor( tandem: Tandem ) {

    const solutions = [
      new Water(),
      new StrongAcid(),
      new WeakAcid(),
      new StrongBase(),
      new WeakBase()
    ];

    super( solutions, 'water' );
  }
}

acidBaseSolutions.register( 'IntroductionModel', IntroductionModel );