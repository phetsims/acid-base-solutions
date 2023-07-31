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

  public readonly water: Water;
  public readonly strongAcid: StrongAcid;
  public readonly weakAcid: WeakAcid;
  public readonly strongBase: StrongBase;
  public readonly weakBase: WeakBase;

  public constructor( tandem: Tandem ) {

    const solutionsTandem = tandem.createTandem( 'solutions' );

    const water = new Water( solutionsTandem.createTandem( 'water' ) );
    const strongAcid = new StrongAcid( solutionsTandem.createTandem( 'strongAcid' ) );
    const weakAcid = new WeakAcid( solutionsTandem.createTandem( 'weakAcid' ) );
    const strongBase = new StrongBase( solutionsTandem.createTandem( 'strongBase' ) );
    const weakBase = new WeakBase( solutionsTandem.createTandem( 'weakBase' ) );

    const solutions = [ water, strongAcid, weakAcid, strongBase, weakBase ];

    super( solutions, water, tandem );

    this.water = water;
    this.strongAcid = strongAcid;
    this.weakAcid = weakAcid;
    this.strongBase = strongBase;
    this.weakBase = weakBase;
  }
}

acidBaseSolutions.register( 'IntroductionModel', IntroductionModel );