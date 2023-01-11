// Copyright 2014-2023, University of Colorado Boulder

/**
 * Visual representation for pH paper in the 'Acid-Base Solutions' sim.
 * Origin is at the bottom-center of the paper.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Circle, Color, DragListener, Node, Rectangle } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSColors from '../ABSColors.js';
import PHPaper from '../model/PHPaper.js';
import { ToolMode } from './ToolMode.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';

// constants
const SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
const PAPER_STROKE = 'rgb(100, 100, 100)';

export default class PHPaperNode extends Node {

  private readonly dragListener: DragListener;
  private readonly updateColor: () => void;
  private readonly pHPaper: PHPaper;
  private animating: boolean; // is the paper animating?

  public constructor( pHPaper: PHPaper, toolModeProperty: StringUnionProperty<ToolMode>, tandem: Tandem ) {

    // blank paper
    const paperNode = new Rectangle( 0, 0, pHPaper.paperSize.width, pHPaper.paperSize.height, {
      fill: ABSColors.PH_PAPER,
      stroke: PAPER_STROKE,
      lineWidth: 0.5,

      // origin at bottom of paper
      centerX: 0,
      bottom: 0
    } );

    // portion of the paper that changes color
    const indicatorNode = new Rectangle( 0, 0, pHPaper.paperSize.width, 0, {
      stroke: PAPER_STROKE,
      lineWidth: 0.5
    } );
    indicatorNode.rotate( Math.PI ); // so that indicator rectangle expands upward
    indicatorNode.centerX = 0;
    indicatorNode.top = 0;

    const children: Node[] = [ paperNode, indicatorNode ];
    if ( SHOW_ORIGIN ) {
      children.push( new Circle( 2, { fill: 'red' } ) );
    }

    super( {
      children: children,
      cursor: 'pointer',
      visibleProperty: new DerivedProperty( [ toolModeProperty ], toolMode => ( toolMode === 'pHPaper' ), {
        tandem: tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      tandem: tandem
    } );

    // expand touch area
    this.touchArea = this.localBounds.dilatedXY( 10, 10 );

    // Constrained dragging
    let clickOffset: Vector2;
    this.dragListener = new DragListener( {

      start: event => {
        clickOffset = this.globalToParentPoint( event.pointer.point ).subtract( event.currentTarget!.translation );
      },

      drag: event => {
        const v = this.globalToParentPoint( event.pointer.point ).subtract( clickOffset );
        pHPaper.positionProperty.value = new Vector2(
          Utils.clamp( v.x, pHPaper.dragBounds.minX, pHPaper.dragBounds.maxX ),
          Utils.clamp( v.y, pHPaper.dragBounds.minY, pHPaper.dragBounds.maxY ) );
      },

      tandem: tandem.createTandem( 'dragListener' )
    } );
    this.addInputListener( this.dragListener );

    // add observers
    pHPaper.positionProperty.link( position => {
      this.translation = position;
    } );

    pHPaper.indicatorHeightProperty.link( height => {
      indicatorNode.setRectHeight( height );
    } );

    this.updateColor = () => {
      if ( this.visible ) {
        indicatorNode.fill = pHToColor( pHPaper.pHProperty.value );
      }
    };
    pHPaper.pHProperty.link( this.updateColor );

    this.pHPaper = pHPaper;
    this.animating = false;

    this.addLinkedElement( pHPaper, {
      tandem: tandem.createTandem( pHPaper.tandem.name )
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public step( dt: number ): void {
    if ( !this.dragListener.isPressed ) {

      const position = this.pHPaper.positionProperty.value;
      const minY = this.pHPaper.beaker.top + ( 0.6 * this.pHPaper.paperSize.height );

      // If the paper is fully submerged in the solution, float to the top of the beaker,
      // with part of the paper above the surface.
      if ( ( this.animating && position.y > minY ) || ( this.pHPaper.top > this.pHPaper.beaker.top ) ) {
        this.animating = true;
        const dy = dt * 250; // move at a constant speed of 250 pixels per second
        const y = Math.max( minY, position.y - dy );
        this.pHPaper.positionProperty.value = new Vector2( position.x, y );
      }
    }
    else {
      this.animating = false;
    }

    // Update when this Node becomes visible.
    this.visibleProperty.link( visible => visible && this.updateColor() );
  }

  /**
   * Creates an icon that represents the pH paper.
   */
  public static createIcon( width: number, height: number ): Node {
    return new Node( {
      children: [
        // full paper
        new Rectangle( 0, 0, width, height, { fill: ABSColors.PH_PAPER, stroke: PAPER_STROKE, lineWidth: 0.5 } ),
        // portion of paper that's colored
        new Rectangle( 0, 0.6 * height, width, 0.4 * height, {
          fill: ABSColors.PH[ 2 ],
          stroke: PAPER_STROKE,
          lineWidth: 0.5
        } )
      ]
    } );
  }
}

// Creates a {Color} color for a given {number} pH.
function pHToColor( pH: number ): Color {
  assert && assert( pH >= 0 && pH <= ABSColors.PH.length );
  let color;
  if ( Number.isInteger( pH ) ) {
    // pH value is an integer, look up color
    color = ABSColors.PH[ pH ];
  }
  else {
    // pH value is not an integer, interpolate between 2 closest colors
    const lowerPH = Math.floor( pH );
    const upperPH = lowerPH + 1;
    color = Color.interpolateRGBA( ABSColors.PH[ lowerPH ], ABSColors.PH[ upperPH ], ( pH - lowerPH ) );
  }
  return color;
}

acidBaseSolutions.register( 'PHPaperNode', PHPaperNode );