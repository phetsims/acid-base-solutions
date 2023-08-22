// Copyright 2014-2023, University of Colorado Boulder

/**
 * ConcentrationGraphNode is the graph of 'Equilibrium Concentration' for each particle species.
 * To improve performance, updates only when this Node is visible.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { HBox, Line, Node, Rectangle, RichText, Text } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSColors from '../ABSColors.js';
import ConcentrationBarNode from './ConcentrationBarNode.js';
import { ViewMode } from './ViewMode.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import Multilink from '../../../../axon/js/Multilink.js';
import { ParticleKey } from '../model/solutions/Particle.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import AqueousSolution from '../model/solutions/AqueousSolution.js';
import Beaker from '../model/Beaker.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';

const TICK_LABEL_FONT = new PhetFont( 11 );

export default class ConcentrationGraphNode extends Node {

  private readonly solutionProperty: TReadOnlyProperty<AqueousSolution>;
  private readonly particlesMap: Map<ParticleKey, ConcentrationBarNode>;

  public constructor( beaker: Beaker, solutionProperty: TReadOnlyProperty<AqueousSolution>,
                      viewModeProperty: StringUnionProperty<ViewMode>, tandem: Tandem ) {

    const graphWidth = 0.5 * beaker.size.width;
    const graphHeight = 0.9 * beaker.size.height;
    const graphPosition = beaker.position.plusXY( ( graphWidth - beaker.size.width ) / 2, -( beaker.size.height + graphHeight ) / 2 );
    
    const backgroundFillNode = new Rectangle( 0, 0, graphWidth, graphHeight, {
      fill: ABSColors.graphFillProperty
    } );

    const backgroundStrokeNode = new Rectangle( 0, 0, graphWidth, graphHeight, {
      stroke: 'black',
      lineWidth: 0.5
    } );

    // tick marks and horizontal dashed lines
    const dy = ( graphHeight / 10 ) - 1;
    const tickLineOptions = { stroke: 'black', lineWidth: 0.5 };
    const gridLineOptions = { stroke: 'gray', lineWidth: 0.5, lineDash: [ 2, 1 ] };
    const tickMarksChildren = [];
    const gridLinesChildren = [];
    for ( let i = 0, y; i < 11; i++ ) {

      y = graphHeight - ( dy * i );

      // dashed line (no dash on bottom tick)
      if ( i > 0 ) {
        gridLinesChildren.push( new Line( 0, y, graphWidth, y, gridLineOptions ) );
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
      maxWidth: graphHeight, // graphHeight because we're rotating to vertical
      rotation: -Math.PI / 2
    } );

    Multilink.multilink( [ yAxisText.boundsProperty, tickMarks.visibleProperty ],
      ( bounds, tickMarksVisible ) => {
        yAxisText.right = ( tickMarksVisible ? tickMarks.left : backgroundFillNode.left ) - 16;
        yAxisText.centerY = graphHeight / 2;
      } );

    // Create a bar for each particle species.
    const barsTandem = tandem.createTandem( 'bars' );
    const barNodes: ConcentrationBarNode[] = [];
    const particlesMap = new Map<ParticleKey, ConcentrationBarNode>();

    // This Property is not available via the UI. It is provided for PhET-iO only.
    // See https://github.com/phetsims/acid-base-solutions/issues/221
    const valuesVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'valuesVisibleProperty' ),
      phetioFeatured: true
    } );

    // SERIOUS HACK ALERT!! These keys are ordered such that the visible bars will be in the same left-to-right order
    // as the reaction equation that appears under the beaker.
    const particleKeys: ParticleKey[] = [
      'B', 'HA', 'H2O', 'MOH', 'M', 'BH', 'A', 'H3O', 'OH'
    ];
    particleKeys.forEach( particleKey => {
      const barNode = new ConcentrationBarNode( graphHeight - 10, valuesVisibleProperty, barsTandem.createTandem( `${particleKey}BarNode` ) );
      barNodes.push( barNode );
      particlesMap.set( particleKey, barNode );
    } );
    const barsParent = new HBox( {
      children: barNodes,
      align: 'bottom',
      spacing: 16
    } );
    barsParent.boundsProperty.link( bounds => {
      barsParent.centerX = backgroundFillNode.centerX;
      barsParent.bottom = backgroundFillNode.bottom;
    } );

    super( {
      children: [ backgroundFillNode, gridLines, tickMarks, yAxisText, barsParent, backgroundStrokeNode ],
      translation: graphPosition,
      visibleProperty: new DerivedProperty( [ viewModeProperty ], viewMode => ( viewMode === 'graph' ), {
        tandem: tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      isDisposable: false,
      tandem: tandem
    } );

    this.solutionProperty = solutionProperty;
    this.particlesMap = particlesMap;

    // Observe the strength and concentration Properties for the selected solution.
    const updateValuesBound = this.updateValues.bind( this );
    solutionProperty.link( ( newSolution, oldSolution ) => {

      // unlink from previous solution
      if ( oldSolution ) {
        oldSolution.strengthProperty.unlink( updateValuesBound );
        oldSolution.concentrationProperty.unlink( updateValuesBound );
      }

      // link to new solution
      newSolution.strengthProperty.lazyLink( updateValuesBound );
      newSolution.concentrationProperty.lazyLink( updateValuesBound );
      this.updateBars();
    } );

    // Update when this Node becomes visible.
    this.visibleProperty.link( visible => {
      visible && this.updateBars();
    } );
  }

  /*
   * Adjusts visibility and concentration of bars to match the particles in the current solution.
   * To improve performance, updates only when this Node is visible.
   */
  private updateBars(): void {

    if ( this.visible ) {
      const solution = this.solutionProperty.value;
      this.particlesMap.forEach( ( barNode, particleKey ) => {
        const particle = solution.getParticleWithKey( particleKey );
        if ( particle ) {
          barNode.concentrationProperty.value = particle.getConcentration();
          barNode.setBarFill( particle.color );
          barNode.visible = true;
        }
        else {
          barNode.concentrationProperty.value = null;
          barNode.visible = false;
        }
      } );
    }
  }

  /**
   * Adjusts concentration of bars to match the particles in the current solution.
   * To improve performance, updates only when this Node is visible.
   */
  private updateValues(): void {
    if ( this.visible ) {
      const solution = this.solutionProperty.value;
      this.particlesMap.forEach( ( barNode, particleKey ) => {
        const particle = solution.getParticleWithKey( particleKey );
        if ( particle ) {
          barNode.concentrationProperty.value = particle.getConcentration();
        }
      } );
    }
  }

  /**
   * Creates an icon of the graph, with 4 bars (similar to weak acid).
   */
  public static createIcon(): Node {
    return new Node( {
      children: [

        // graph background
        new Rectangle( 0, 0, 22, 18, { fill: ABSColors.graphFillProperty } ),

        // bars for weak acid: HA + H2O <=> A- + H3O+
        new Rectangle( 2, 6, 3, 12, { fill: ABSColors.HA } ),
        new Rectangle( 7, 3, 3, 15, { fill: ABSColors.H2O } ),
        new Rectangle( 12, 9, 3, 9, { fill: ABSColors.A } ),
        new Rectangle( 17, 9, 3, 9, { fill: ABSColors.H3O } ),

        // background stroke on top
        new Rectangle( 0, 0, 22, 18, { stroke: 'black', lineWidth: 0.5 } )
      ]
    } );
  }
}

acidBaseSolutions.register( 'ConcentrationGraphNode', ConcentrationGraphNode );