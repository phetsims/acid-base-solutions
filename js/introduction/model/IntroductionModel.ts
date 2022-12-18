// Copyright 2014-2022, University of Colorado Boulder

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
      new Water( tandem.createTandem( 'water' ) ),
      new StrongAcid( tandem.createTandem( 'strongAcid' ) ),
      new WeakAcid( tandem.createTandem( 'weakAcid' ) ),
      new StrongBase( tandem.createTandem( 'strongBase' ) ),
      new WeakBase( tandem.createTandem( 'weakBase' ) )
    ];

    super( solutions, 'water', tandem );
  }
}

acidBaseSolutions.register( 'IntroductionModel', IntroductionModel );