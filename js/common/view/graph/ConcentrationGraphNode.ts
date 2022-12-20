// Copyright 2014-2022, University of Colorado Boulder

/**
 * Concentration graph.
 * To improve performance, updates only when this node is visible.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Line, Node, Rectangle, RichText, Text } from '../../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../../acidBaseSolutions.js';
import ABSColors from '../../ABSColors.js';
import ConcentrationGraph from '../../model/ConcentrationGraph.js';
import ConcentrationGraphBarNode from './ConcentrationGraphBarNode.js';
import { ViewMode } from '../ViewMode.js';
import StringUnionProperty from '../../../../../axon/js/StringUnionProperty.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import PhetFont from '../../../../../scenery-phet/js/PhetFont.js';
import AcidBaseSolutionsStrings from '../../../AcidBaseSolutionsStrings.js';
import Multilink from '../../../../../axon/js/Multilink.js';

const TICK_LABEL_FONT = new PhetFont( 11 );

export default class ConcentrationGraphNode extends Node {

  private readonly graph: ConcentrationGraph;
  private readonly barNodes: ConcentrationGraphBarNode[];

  public constructor( graph: ConcentrationGraph, viewModeProperty: StringUnionProperty<ViewMode>, tandem: Tandem ) {

    const backgroundNode = new Rectangle( 0, 0, graph.width, graph.height, {
      fill: 'white',
      stroke: 'black',
      lineWidth: 0.5
    } );

    // tick marks and horizontal dashed lines
    const dy = ( graph.height / 10 ) - 1;
    const tickLineOptions = { stroke: 'black', lineWidth: 0.5 };
    const gridLineOptions = { stroke: 'gray', lineWidth: 0.5, lineDash: [ 2, 1 ] };
    const tickMarksChildren = [];
    const gridLinesChildren = [];
    for ( let i = 0, y; i < 11; i++ ) {

      y = graph.height - ( dy * i );

      // dashed line (no dash on bottom tick)
      if ( i > 0 ) {
        gridLinesChildren.push( new Line( 0, y, graph.width, y, gridLineOptions ) );
      }

      // tick line
      const tickLine = new Line( -2, y, 2, y, tickLineOptions );
      tickMarksChildren.push( tickLine );

      // tick label
      tickMarksChildren.push( new RichText( `10<sup>${i - 8}</sup>`, {
        font: TICK_LABEL_FONT,
        right: tickLine.left - 4,
        centerY: y
      } ) );
    }

    const gridLines = new Node( {
      children: gridLinesChildren,
      tandem: tandem.createTandem( 'gridLines' )
    } );

    const tickMarks = new Node( {
      children: tickMarksChildren,
      tandem: tandem.createTandem( 'tickMarks' )
    } );

    // y-axis label
    const yAxisText = new Text( AcidBaseSolutionsStrings.concentrationGraph.yAxisStringProperty, {
      font: new PhetFont( 13 ),
      maxWidth: graph.height, // graph.height because we're rotating to vertical below
      tandem: tandem.createTandem( 'yAxisText' ),
      phetioVisiblePropertyInstrumented: true
    } );
    yAxisText.rotate( -Math.PI / 2 );

    Multilink.multilink( [ yAxisText.boundsProperty, tickMarks.visibleProperty ],
      ( bounds, tickMarksVisible ) => {
        yAxisText.right = ( tickMarksVisible ? tickMarks.left : backgroundNode.left ) - 15;
        yAxisText.centerY = graph.height / 2;
      } );

    // find maximum number of bars for all solutions
    let maxBars = 0;
    graph.solutionsMap.forEach( ( solution, solutionType ) => {
      maxBars = Math.max( maxBars, solution.particles.length );
    } );

    // create enough bars for all solutions
    const barNodes: ConcentrationGraphBarNode[] = [];
    for ( let i = 0; i < maxBars; i++ ) {
      barNodes[ i ] = new ConcentrationGraphBarNode( graph.height - 10 );
    }

    super( {
      children: [ backgroundNode, gridLines, tickMarks, yAxisText, ...barNodes ],
      translation: graph.position,
      visibleProperty: new DerivedProperty( [ viewModeProperty ], viewMode => ( viewMode === 'graph' ), {
        tandem: tandem.createTandem( 'visibleProperty' )
      } ),
      tandem: tandem
    } );

    this.graph = graph;
    this.barNodes = barNodes;

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

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  /*
   * Makes the correct number of bars visible for the selected solution,
   * and sets the bars colors and positions to match the particles in the solution.
   * To improve performance, updates only when this node is visible.
   */
  private updateBars(): void {

    if ( this.visible ) {

      const solutionType = this.graph.solutionTypeProperty.value;
      const solution = this.graph.solutionsMap.get( solutionType )!;
      assert && assert( solution );
      const particles = solution.particles;
      const numberOfParticles = particles.length;

      // show one bar for each particle in the current solution
      for ( let i = 0, bar; i < this.barNodes.length; i++ ) {
        bar = this.barNodes[ i ];
        if ( i < numberOfParticles ) {
          // set visibility, color, value and position of new bars
          bar.visible = true;
          bar.setValue( solution.particles[ i ].getConcentration() );
          bar.setBarFill( particles[ i ].color );
          bar.setTranslation( ( i + 0.75 + ( 4 - numberOfParticles ) / 2 ) * this.graph.width / 4, this.graph.height );
        }
        else {
          bar.visible = false;
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

      const solutionType = this.graph.solutionTypeProperty.value;
      const solution = this.graph.solutionsMap.get( solutionType )!;
      assert && assert( solution );
      const particles = solution.particles;

      for ( let i = 0; i < particles.length; i++ ) {
        this.barNodes[ i ].setValue( solution.particles[ i ].getConcentration() );
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