// Copyright 2014-2022, University of Colorado Boulder

/**
 * ABSModel is the base class for models in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import TModel from '../../../../joist/js/TModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import { SolutionType } from './SolutionType.js';
import Beaker from './Beaker.js';
import ConcentrationGraph from './ConcentrationGraph.js';
import ConductivityTester from './ConductivityTester.js';
import MagnifyingGlass from './MagnifyingGlass.js';
import PHMeter from './PHMeter.js';
import PHPaper from './PHPaper.js';
import AqueousSolution from './solutions/AqueousSolution.js';

export type SolutionMap = Map<SolutionType, AqueousSolution>;

export default class ABSModel implements TModel {

  // type of solution that is currently selected
  public readonly solutionTypeProperty: Property<SolutionType>;

  // for looking up solution by SolutionType
  public readonly solutionsMap: SolutionMap;

  // pH of the selected solution
  public readonly pHProperty: ReadOnlyProperty<number>;

  public readonly beaker: Beaker;
  public readonly magnifyingGlass: MagnifyingGlass;
  public readonly graph: ConcentrationGraph;
  public readonly pHMeter: PHMeter;
  public readonly pHPaper: PHPaper;
  public readonly conductivityTester: ConductivityTester;

  public constructor( solutions: AqueousSolution[], defaultSolutionType: SolutionType, tandem: Tandem ) {

    assert && assert( _.uniqBy( solutions, solution => solution.solutionType ).length === solutions.length,
      'every solution must have a unique solutionType' );

    this.solutionTypeProperty = new StringUnionProperty( defaultSolutionType, {
      validValues: solutions.map( solution => solution.solutionType ),
      tandem: tandem.createTandem( 'solutionTypeProperty' )
    } );

    this.solutionsMap = new Map<SolutionType, AqueousSolution>();
    solutions.forEach( solution => {
      this.solutionsMap.set( solution.solutionType, solution );
    } );

    this.pHProperty = DerivedProperty.deriveAny(
      [ this.solutionTypeProperty, ...solutions.map( solution => solution.pHProperty ) ],
      () => this.solutionsMap.get( this.solutionTypeProperty.value )!.pHProperty.value, {
        tandem: tandem.createTandem( 'pHProperty' ),
        phetioValueType: NumberIO
      } );

    this.beaker = new Beaker();
    this.magnifyingGlass = new MagnifyingGlass( this.beaker, this.solutionsMap, this.solutionTypeProperty,
      tandem.createTandem( 'magnifyingGlass' ) );
    this.graph = new ConcentrationGraph( this.beaker, this.solutionsMap, this.solutionTypeProperty );
    this.pHMeter = new PHMeter( this.beaker, this.pHProperty, tandem.createTandem( 'pHMeter' ) );
    this.pHPaper = new PHPaper( this.beaker, this.pHProperty, this.solutionTypeProperty, tandem.createTandem( 'pHPaper' ) );
    this.conductivityTester = new ConductivityTester( this.beaker, this.pHProperty, tandem.createTandem( 'conductivityTester' ) );
  }

  public dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
  }

  public reset(): void {
    this.solutionTypeProperty.reset();
    this.solutionsMap.forEach( ( solution, solutionType ) => solution.reset() );
    this.pHMeter.reset();
    this.pHPaper.reset();
    this.conductivityTester.reset();
  }
}

acidBaseSolutions.register( 'ABSModel', ABSModel );