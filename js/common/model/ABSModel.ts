// Copyright 2014-2023, University of Colorado Boulder

/**
 * ABSModel is the base class for models in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import TModel from '../../../../joist/js/TModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import Beaker from './Beaker.js';
import ConcentrationGraph from './ConcentrationGraph.js';
import ConductivityTester from './ConductivityTester.js';
import MagnifyingGlass from './MagnifyingGlass.js';
import PHMeter from './PHMeter.js';
import PHPaper from './PHPaper.js';
import AqueousSolution from './solutions/AqueousSolution.js';

export default class ABSModel implements TModel {

  // The set of solutions
  public readonly solutions: AqueousSolution[];

  // The solution that is selected
  public readonly solutionProperty: Property<AqueousSolution>;

  // pH of the selected solution
  public readonly pHProperty: ReadOnlyProperty<number>;

  public readonly beaker: Beaker;

  // Views
  public readonly magnifyingGlass: MagnifyingGlass;
  public readonly graph: ConcentrationGraph;

  // Tools
  public readonly pHMeter: PHMeter;
  public readonly pHPaper: PHPaper;
  public readonly conductivityTester: ConductivityTester;

  protected constructor( solutions: AqueousSolution[], initialSolution: AqueousSolution, tandem: Tandem, solutionPropertyReadOnly = false ) {

    this.solutions = solutions;

    this.solutionProperty = new Property( initialSolution, {
      validValues: solutions,
      tandem: tandem.createTandem( 'solutionProperty' ),
      phetioValueType: AqueousSolution.AqueousSolutionIO,
      phetioDocumentation: 'The solution that is selected',
      phetioReadOnly: solutionPropertyReadOnly
    } );

    this.pHProperty = new DerivedProperty( [ this.solutionProperty ], solution => solution.pHProperty.value, {
      tandem: tandem.createTandem( 'pHProperty' ),
      phetioValueType: NumberIO
    } );

    this.beaker = new Beaker();
    this.magnifyingGlass = new MagnifyingGlass( this.beaker, this.solutions, this.solutionProperty, tandem.createTandem( 'magnifyingGlass' ) );
    this.graph = new ConcentrationGraph( this.beaker, this.solutionProperty );
    this.pHMeter = new PHMeter( this.beaker, this.pHProperty, tandem.createTandem( 'pHMeter' ) );
    this.pHPaper = new PHPaper( this.beaker, this.pHProperty, this.solutionProperty, tandem.createTandem( 'pHPaper' ) );
    this.conductivityTester = new ConductivityTester( this.beaker, this.pHProperty, tandem.createTandem( 'conductivityTester' ) );
  }

  public dispose(): void {
    Disposable.assertNotDisposable();
  }

  public reset(): void {
    this.solutions.forEach( solution => solution.reset() );
    this.solutionProperty.reset();
    this.pHMeter.reset();
    this.pHPaper.reset();
    this.conductivityTester.reset();
  }
}

acidBaseSolutions.register( 'ABSModel', ABSModel );