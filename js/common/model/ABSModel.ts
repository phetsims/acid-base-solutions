// Copyright 2014-2022, University of Colorado Boulder

/**
 * Base type for models in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import TModel from '../../../../joist/js/TModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
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

  public constructor( solutions: AqueousSolution[], defaultSolutionType: SolutionType, tandem: Tandem ) {

    assert && assert( _.uniqBy( solutions, solution => solution.solutionType ).length === solutions.length,
      'every solution must have a unique solutionType' );

    this.solutionsMap = new Map<SolutionType, AqueousSolution>();
    solutions.forEach( solution => {
      this.solutionsMap.set( solution.solutionType, solution );
    } );

    this.solutionTypeProperty = new StringUnionProperty( defaultSolutionType, {
      validValues: SolutionTypeValues.filter( solutionType => this.solutionsMap.has( solutionType ) ),
      tandem: tandem.createTandem( 'solutionTypeProperty' )
    } );

    this.pHProperty = new NumberProperty( this.solutionsMap.get( defaultSolutionType )!.pHProperty.value, {
      tandem: tandem.createTandem( 'pHProperty' ),
      phetioReadOnly: true
    } );

    this.beaker = new Beaker();
    this.magnifier = new Magnifier( this.beaker, this.solutionsMap, this.solutionTypeProperty );
    this.graph = new ConcentrationGraph( this.beaker, this.solutionsMap, this.solutionTypeProperty );
    this.pHMeter = new PHMeter( this.beaker, this.pHProperty, tandem.createTandem( 'pHMeter' ) );
    this.pHPaper = new PHPaper( this.beaker, this.pHProperty, this.solutionTypeProperty, tandem.createTandem( 'pHPaper' ) );
    this.conductivityTester = new ConductivityTester( this.beaker, this.pHProperty, tandem.createTandem( 'conductivityTester' ) );

    // synchronize with pH of the solution that is currently selected
    const setPH = ( pH: number ) => {
      this.pHProperty.value = pH;
    };
    this.solutionTypeProperty.link( ( newSolutionType, previousSolutionType ) => {

      // unlink from previous solution pH property
      if ( previousSolutionType ) {
        this.solutionsMap.get( previousSolutionType )!.pHProperty.unlink( setPH );
      }

      // link to new solution pH property
      this.solutionsMap.get( newSolutionType )!.pHProperty.link( setPH );
    } );
  }

  public dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
  }

  public reset(): void {

    // reset Properties
    this.solutionTypeProperty.reset();
    this.pHProperty.reset();

    // reset solutions
    this.solutionsMap.forEach( ( solution, solutionType ) => solution.reset() );

    this.pHMeter.reset();
    this.pHPaper.reset();
    this.conductivityTester.reset();
  }
}

acidBaseSolutions.register( 'ABSModel', ABSModel );