// Copyright 2014-2024, University of Colorado Boulder

/**
 * ABSModel is the base class for models in the 'Acid-Base Solutions' simulation.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Disposable from '../../../../axon/js/Disposable.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import TModel from '../../../../joist/js/TModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import Beaker from './Beaker.js';
import ConductivityTester from './ConductivityTester.js';
import PHMeter from './PHMeter.js';
import PHPaper from './PHPaper.js';
import AqueousSolution from './solutions/AqueousSolution.js';

export default class ABSModel implements TModel {

  // The set of solutions
  public readonly solutions: AqueousSolution[];

  // The solution that is selected
  public readonly solutionProperty: ReadOnlyProperty<AqueousSolution>;

  // pH of the selected solution
  public readonly pHProperty: ReadOnlyProperty<number>;

  // Beaker that contains the solution
  public readonly beaker: Beaker;

  // Tools
  public readonly pHMeter: PHMeter;
  public readonly pHPaper: PHPaper;
  public readonly conductivityTester: ConductivityTester;

  protected constructor( solutions: AqueousSolution[], solutionProperty: ReadOnlyProperty<AqueousSolution>, tandem: Tandem ) {

    this.solutions = solutions;
    this.solutionProperty = solutionProperty;

    // Synchronize with the pH of the selected solution.
    this.pHProperty = DerivedProperty.deriveAny( [ solutionProperty, ...solutions.map( solution => solution.pHProperty ) ],
      () => solutionProperty.value.pHProperty.value, {
        tandem: tandem.createTandem( 'pHProperty' ),
        phetioValueType: NumberIO,
        phetioFeatured: true
      } );

    this.beaker = new Beaker();

    const toolsTandem = tandem.createTandem( 'tools' );
    this.pHMeter = new PHMeter( this.beaker, this.pHProperty, toolsTandem.createTandem( 'pHMeter' ) );
    this.pHPaper = new PHPaper( this.beaker, this.pHProperty, solutionProperty, toolsTandem.createTandem( 'pHPaper' ) );
    this.conductivityTester = new ConductivityTester( this.beaker, this.pHProperty, toolsTandem.createTandem( 'conductivityTester' ) );
  }

  public dispose(): void {
    Disposable.assertNotDisposable();
  }

  public reset(): void {
    this.pHMeter.reset();
    this.pHPaper.reset();
    this.conductivityTester.reset();
  }
}

acidBaseSolutions.register( 'ABSModel', ABSModel );