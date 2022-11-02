// Copyright 2014-2021, University of Colorado Boulder

/**
 * Base type for models in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import TModel from '../../../../joist/js/TModel.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import { SolutionType, SolutionTypeValues } from '../enum/SolutionType.js';
import Beaker from './Beaker.js';
import ConcentrationGraph from './ConcentrationGraph.js';
import ConductivityTester from './ConductivityTester.js';
import Magnifier from './Magnifier.js';
import PHMeter from './PHMeter.js';
import PHPaper from './PHPaper.js';
import AqueousSolution from './solutions/AqueousSolution.js';

export type SolutionMap = Map<SolutionType, AqueousSolution>;

export default class ABSModel implements TModel {

  // for looking up solution by SolutionType
  public readonly solutionsMap: SolutionMap;

  // type of solution that is currently selected
  public readonly solutionTypeProperty: Property<SolutionType>;

  // pH of product
  public readonly pHProperty: Property<number>;

  public readonly beaker: Beaker;
  public readonly magnifier: Magnifier;
  public readonly graph: ConcentrationGraph;
  public readonly pHMeter: PHMeter;
  public readonly pHPaper: PHPaper;
  public readonly conductivityTester: ConductivityTester;

  public constructor( solutions: AqueousSolution[], defaultSolutionType: SolutionType ) {

    this.solutionsMap = new Map<SolutionType, AqueousSolution>();
    solutions.forEach( solution => {
      this.solutionsMap.set( solution.solutionType, solution );
    } );

    this.solutionTypeProperty = new StringEnumerationProperty( defaultSolutionType, {
      validValues: SolutionTypeValues
    } );

    this.pHProperty = new NumberProperty( this.solutionsMap.get( defaultSolutionType )!.pHProperty.get() );

    this.beaker = new Beaker();
    this.magnifier = new Magnifier( this.beaker, this.solutionsMap, this.solutionTypeProperty );
    this.graph = new ConcentrationGraph( this.beaker, this.solutionsMap, this.solutionTypeProperty );
    this.pHMeter = new PHMeter( this.beaker, this.pHProperty );
    this.pHPaper = new PHPaper( this.beaker, this.pHProperty, this.solutionTypeProperty );
    this.conductivityTester = new ConductivityTester( this.beaker, this.pHProperty );

    // synchronize with pH of the solution that is currently selected
    const setPH = ( value: number ) => this.pHProperty.set( value );
    this.solutionTypeProperty.link( ( newSolutionType, prevSolutionType ) => {

      // unsubscribe from previous solution pH property
      if ( prevSolutionType ) {
        this.solutionsMap.get( prevSolutionType )!.pHProperty.unlink( setPH );
      }

      // subscribe to new solution pH property
      this.solutionsMap.get( newSolutionType )!.pHProperty.link( setPH );
    } );
  }

  public reset(): void {

    // reset Properties
    this.solutionTypeProperty.reset();
    this.pHProperty.reset();

    // reset solutions
    this.solutionsMap.forEach( ( solution, solutionType ) => solution.reset( ) );

    this.pHMeter.reset();
    this.pHPaper.reset();
    this.conductivityTester.reset();
  }
}

acidBaseSolutions.register( 'ABSModel', ABSModel );