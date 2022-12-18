// Copyright 2014-2022, University of Colorado Boulder

/**
 * Concentration graph.
 * To improve performance, updates only when this node is visible.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node, Rectangle } from '../../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../../acidBaseSolutions.js';
import ABSColors from '../../ABSColors.js';
import ConcentrationGraph from '../../model/ConcentrationGraph.js';
import ConcentrationGraphBackgroundNode from './ConcentrationGraphBackgroundNode.js';
import ConcentrationGraphBarNode from './ConcentrationGraphBarNode.js';

export default class ConcentrationGraphNode extends Node {

  private readonly graph: ConcentrationGraph;
  private readonly bars: ConcentrationGraphBarNode[];

  public constructor( graph: ConcentrationGraph ) {

    super();

    this.graph = graph;
    this.bars = [];

    // add background
    this.addChild( new ConcentrationGraphBackgroundNode( graph.width, graph.height ) );

    // find maximum number of bars for all solutions
    let maxBars = 0;
    graph.solutionsMap.forEach( ( solution, solutionType ) => {
      maxBars = Math.max( maxBars, solution.molecules.length );
    } );

    // create enough bars for all solutions
    for ( let i = 0; i < maxBars; i++ ) {
      const barNode = new ConcentrationGraphBarNode( graph.height - 10 );
      this.bars[ i ] = barNode;
      this.addChild( barNode );
    }

    this.translation = graph.position;

    // Observe the strength and concentration Properties for the selected solution.
    const updateValuesBound = this.updateValues.bind( this );
    graph.solutionTypeProperty.link( ( newSolutionType, previousSolutionType ) => {

      // show the correct number of bars
      this.updateBars();

      // unlink from previous solution
      if ( previousSolutionType ) {
        const previousSolution = graph.solutionsMap.get( previousSolutionType )!;
        assert && assert( previousSolution );
        previousSolution.strengthProperty.unlink( updateValuesBound );
        previousSolution.concentrationProperty.unlink( updateValuesBound );
      }

      // link to new solution
      const newSolution = graph.solutionsMap.get( newSolutionType )!;
      assert && assert( newSolution );
      newSolution.strengthProperty.link( updateValuesBound );
      newSolution.concentrationProperty.link( updateValuesBound );
    } );

    // Update when this Node becomes visible.
    this.visibleProperty.link( visible => {
      if ( visible ) {
        this.updateBars();
        this.updateValues();
      }
    } );
  }

  /*
   * Makes the correct number of bars visible for the selected solution,
   * and sets the bars colors and positions to match the molecules in the solution.
   * To improve performance, updates only when this node is visible.
   */
  private updateBars(): void {

    if ( this.visible ) {

      const solutionType = this.graph.solutionTypeProperty.get();
      const solution = this.graph.solutionsMap.get( solutionType )!;
      assert && assert( solution );
      const molecules = solution.molecules;
      const numberOfMolecules = molecules.length;

      // show one bar for each molecule in the current solution
      for ( let i = 0, bar; i < this.bars.length; i++ ) {
        bar = this.bars[ i ];
        if ( i < numberOfMolecules ) {
          // set visibility, color, value and position of new bars
          bar.setVisible( true );
          bar.setValue( solution.molecules[ i ].getConcentration() );
          bar.setBarFill( molecules[ i ].color );
          bar.setTranslation( ( i + 0.75 + ( 4 - numberOfMolecules ) / 2 ) * this.graph.width / 4, this.graph.height );
        }
        else {
          bar.setVisible( false );
        }
      }
    }
  }

  /**
   * Sets the concentration values on each bar.
   * To improve performance, updates only when this node is visible.
   */
  private updateValues(): void {

    if ( this.visible ) {

      const solutionType = this.graph.solutionTypeProperty.get();
      const solution = this.graph.solutionsMap.get( solutionType )!;
      assert && assert( solution );
      const molecules = solution.molecules;

      for ( let i = 0; i < molecules.length; i++ ) {
        this.bars[ i ].setValue( solution.molecules[ i ].getConcentration() );
      }
    }
  }

  /**
   *  Creates an icon of the graph, with 4 bars (similar to weak acid).
   */
  public static createIcon(): Node {
    return new Node( {
      children: [
        new Rectangle( 0, 0, 22, 18, { fill: 'white' } ), // background
        new Rectangle( 2, 6, 3, 12, { fill: ABSColors.B } ),
        new Rectangle( 7, 3, 3, 15, { fill: ABSColors.H2O } ),
        new Rectangle( 12, 9, 3, 9, { fill: ABSColors.A } ),
        new Rectangle( 17, 9, 3, 9, { fill: ABSColors.H3O } ),
        new Rectangle( 0, 0, 22, 18, { stroke: 'black', lineWidth: 0.5 } ) // background stroke on top
      ]
    } );
  }
}

acidBaseSolutions.register( 'ConcentrationGraphNode', ConcentrationGraphNode );