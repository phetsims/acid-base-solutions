// Copyright 2014-2023, University of Colorado Boulder

/**
 * IntroModel is the model for the 'Intro' screen.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSModel from '../../common/model/ABSModel.js';
import StrongAcid from '../../common/model/solutions/StrongAcid.js';
import StrongBase from '../../common/model/solutions/StrongBase.js';
import Water from '../../common/model/solutions/Water.js';
import WeakAcid from '../../common/model/solutions/WeakAcid.js';
import WeakBase from '../../common/model/solutions/WeakBase.js';
import Property from '../../../../axon/js/Property.js';
import AqueousSolution from '../../common/model/solutions/AqueousSolution.js';

export default class IntroModel extends ABSModel {

  public readonly water: Water;
  public readonly strongAcid: StrongAcid;
  public readonly weakAcid: WeakAcid;
  public readonly strongBase: StrongBase;
  public readonly weakBase: WeakBase;
  public readonly mutableSolutionProperty: Property<AqueousSolution>;

  private readonly resetIntroductionModel: () => void;

  public constructor( tandem: Tandem ) {

    const solutionsTandem = tandem.createTandem( 'solutions' );

    const water = new Water( {
      tandem: solutionsTandem.createTandem( 'water' )
    } );
    const strongAcid = new StrongAcid( {
      tandem: solutionsTandem.createTandem( 'strongAcid' )
    } );
    const weakAcid = new WeakAcid( {
      tandem: solutionsTandem.createTandem( 'weakAcid' )
    } );
    const strongBase = new StrongBase( {
      tandem: solutionsTandem.createTandem( 'strongBase' )
    } );
    const weakBase = new WeakBase( {
      tandem: solutionsTandem.createTandem( 'weakBase' )
    } );

    const solutions = [ water, strongAcid, weakAcid, strongBase, weakBase ];

    const solutionProperty = new Property( water, {
      validValues: solutions,
      tandem: tandem.createTandem( 'solutionProperty' ),
      phetioValueType: AqueousSolution.AqueousSolutionIO,
      phetioDocumentation: 'The solution that is selected',
      phetioFeatured: true
    } );

    super( solutions, solutionProperty, tandem );

    this.water = water;
    this.strongAcid = strongAcid;
    this.weakAcid = weakAcid;
    this.strongBase = strongBase;
    this.weakBase = weakBase;
    this.mutableSolutionProperty = solutionProperty;

    this.resetIntroductionModel = () => {
      solutions.forEach( solution => solution.reset() );
      solutionProperty.reset();
    };
  }

  public override reset(): void {
    this.resetIntroductionModel();
    super.reset();
  }
}

acidBaseSolutions.register( 'IntroModel', IntroModel );