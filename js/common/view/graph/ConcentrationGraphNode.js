// Copyright 2014-2021, University of Colorado Boulder

/**
 * Concentration graph.
 * To improve performance, updates only when this node is visible.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Node from '../../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import acidBaseSolutions from '../../../acidBaseSolutions.js';
import ABSColors from '../../ABSColors.js';
import ConcentrationGraphBackgroundNode from './ConcentrationGraphBackgroundNode.js';
import ConcentrationGraphBarNode from './ConcentrationGraphBarNode.js';

class ConcentrationGraphNode extends Node {

  /**
   * @param {ConcentrationGraph} graph
   */
  constructor( graph ) {

    super();

    this.graph = graph; // @private
    this.bars = []; // @private {ConcentrationGraphBarNode[]}

    // add background
    this.addChild( new ConcentrationGraphBackgroundNode( graph.width, graph.height ) );

    // find maximum number of bars for all solutions
    let maxBars = 0;
    for ( const key in graph.solutions ) {
      const solution = graph.solutions[ key ];
      maxBars = Math.max( maxBars, solution.molecules.length );
    }

    // create enough bars for all solutions
    for ( let i = 0; i < maxBars; i++ ) {
      const barNode = new ConcentrationGraphBarNode( graph.height - 10 );
      this.bars[ i ] = barNode;
      this.addChild( barNode );
    }

    this.translation = graph.position;

    // Observe the strength and concentration properties for whichever solution is selected.
    const updateValuesBound = this.updateValues.bind( this );
    graph.solutionTypeProperty.link( ( newSolutionType, prevSolutionType ) => {

      // show the correct number of bars
      this.updateBars();

      // unlink from previous solution
      if ( prevSolutionType ) {
        graph.solutions[ prevSolutionType.name ].strengthProperty.unlink( updateValuesBound );
        graph.solutions[ prevSolutionType.name ].concentrationProperty.unlink( updateValuesBound );
      }

      // link to new solution
      graph.solutions[ newSolutionType.name ].strengthProperty.link( updateValuesBound );
      graph.solutions[ newSolutionType.name ].concentrationProperty.link( updateValuesBound );
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
   * @private
   * Makes the correct number of bars visible for the selected solution,
   * and sets the bars colors and positions to match the molecules in the solution.
   * To improve performance, updates only when this node is visible.
   */
  updateBars() {

    if ( this.visible ) {

      const solutionType = this.graph.solutionTypeProperty.get();
      const solution = this.graph.solutions[ solutionType.name ];
      const molecules = solution.molecules;
      const numberOfMolecules = molecules.length;

      // show one bar for each molecule in the current solution
      for ( let i = 0, bar; i < this.bars.length; i++ ) {
        bar = this.bars[ i ];
        if ( i < numberOfMolecules ) {
          // set visibility, color, value and position of new bars
          bar.setVisible( true );
          bar.setValue( solution[ molecules[ i ].concentrationFunctionName ]() );
          bar.setBarFill( ABSColors.MOLECULES[ molecules[ i ].key ] );
          bar.setTranslation( ( i + 0.75 + ( 4 - numberOfMolecules ) / 2 ) * this.graph.width / 4, this.graph.height );
        }
        else {
          bar.setVisible( false );
        }
      }
    }
  }

  /**
   * @private
   * Sets the concentration values on each bar.
   * To improve performance, updates only when this node is visible.
   */
  updateValues() {

    if ( this.visible ) {

      const solutionType = this.graph.solutionTypeProperty.get();
      const solution = this.graph.solutions[ solutionType.name ];
      const molecules = solution.molecules;

      for ( let i = 0; i < molecules.length; i++ ) {

        //TODO this violates PhET coding conventions, see https://github.com/phetsims/acid-base-solutions/issues/163
        this.bars[ i ].setValue( solution[ molecules[ i ].concentrationFunctionName ]() );
      }
    }
  }

  /**
   *  Creates an icon of the graph, with 4 bars (similar to weak acid).
   *  @static
   *  @returns {Node}
   *  @public
   */
  static createIcon() {
    return new Node( {
      children: [
        new Rectangle( 0, 0, 22, 18, { fill: 'white' } ), // background
        new Rectangle( 2, 6, 3, 12, { fill: ABSColors.MOLECULES.B } ),
        new Rectangle( 7, 3, 3, 15, { fill: ABSColors.MOLECULES.H2O } ),
        new Rectangle( 12, 9, 3, 9, { fill: ABSColors.MOLECULES.A } ),
        new Rectangle( 17, 9, 3, 9, { fill: ABSColors.MOLECULES.H3O } ),
        new Rectangle( 0, 0, 22, 18, { stroke: 'black', lineWidth: 0.5 } ) // background stroke on top
      ]
    } );
  }
}

acidBaseSolutions.register( 'ConcentrationGraphNode', ConcentrationGraphNode );
export default ConcentrationGraphNode;