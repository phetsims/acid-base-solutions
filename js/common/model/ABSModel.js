// Copyright 2014-2021, University of Colorado Boulder

/**
 * Base type for models in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import Beaker from './Beaker.js';
import ConcentrationGraph from './ConcentrationGraph.js';
import ConductivityTester from './ConductivityTester.js';
import Magnifier from './Magnifier.js';
import PHMeter from './PHMeter.js';
import PHPaper from './PHPaper.js';

class ABSModel {

  /**
   * @param {AqueousSolution[]} solutions
   * @param {SolutionType} defaultSolutionType
   */
  constructor( solutions, defaultSolutionType ) {

    // @public {Map<SolutionType,AqueousSolution>} for looking up solutions by solutionType
    this.solutionsMap = new Map();
    solutions.forEach( solution => {
      this.solutionsMap.set( solution.solutionType, solution );
    } );

    // @public type of solution that is currently selected
    this.solutionTypeProperty = new Property( defaultSolutionType );

    // @public pH level of product
    this.pHProperty = new NumberProperty( this.solutionsMap.get( defaultSolutionType ).pHProperty.get() );

    // @public
    this.beaker = new Beaker();
    this.magnifier = new Magnifier( this.beaker, this.solutionsMap, this.solutionTypeProperty );
    this.graph = new ConcentrationGraph( this.beaker, this.solutionsMap, this.solutionTypeProperty );
    this.pHMeter = new PHMeter( this.beaker, this.pHProperty );
    this.pHPaper = new PHPaper( this.beaker, this.pHProperty, this.solutionTypeProperty );
    this.conductivityTester = new ConductivityTester( this.beaker, this.pHProperty );

    // synchronize with pH of the solution that is currently selected
    const setPH = value => this.pHProperty.set( value );
    this.solutionTypeProperty.link( ( newSolutionType, prevSolutionType ) => {

      // unsubscribe from previous solution pH property
      if ( prevSolutionType ) {
        this.solutionsMap.get( prevSolutionType ).pHProperty.unlink( setPH );
      }

      // subscribe to new solution pH property
      this.solutionsMap.get( newSolutionType ).pHProperty.link( setPH );
    } );
  }

  // @public
  reset() {

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
export default ABSModel;