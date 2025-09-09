// Copyright 2014-2025, University of Colorado Boulder

/**
 * PHPaperNode is the view of pH paper. Origin is at the bottom-center of the paper.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import KeyboardDragListener, { KeyboardDragListenerOptions } from '../../../../scenery/js/listeners/KeyboardDragListener.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSColors from '../ABSColors.js';
import ABSConstants from '../ABSConstants.js';
import PHPaper from '../model/PHPaper.js';
import { ToolMode } from './ToolMode.js';

// constants
const SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
const PAPER_STROKE = 'rgb( 100, 100, 100 )';

export default class PHPaperNode extends InteractiveHighlighting( Node ) {

  private readonly pHPaper: PHPaper;
  private readonly dragListener: DragListener;
  private readonly keyboardDragListener: KeyboardDragListener;
  private animating: boolean; // is the paper animating?

  public constructor( pHPaper: PHPaper, toolModeProperty: StringUnionProperty<ToolMode>, tandem: Tandem ) {

    // blank paper
    const paperNode = new Rectangle( 0, 0, pHPaper.paperSize.width, pHPaper.paperSize.height, {
      fill: ABSColors.pHPaperFillProperty,
      stroke: PAPER_STROKE,
      lineWidth: 0.5,

      // origin at bottom of paper
      centerX: 0,
      bottom: 0
    } );

    // portion of the paper that changes color
    const indicatorNode = new Rectangle( 0, 0, pHPaper.paperSize.width, 0, {
      fill: pHPaper.colorProperty,
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

    super( combineOptions<NodeOptions>( {
      children: children,
      cursor: 'pointer',
      visibleProperty: new DerivedProperty( [ toolModeProperty ], toolMode => ( toolMode === 'pHPaper' ), {
        tandem: tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      phetioInputEnabledPropertyInstrumented: true,
      isDisposable: false,
      tandem: tandem,
      phetioFeatured: true
    }, AccessibleDraggableOptions ) );

    // expand touch area
    this.touchArea = this.localBounds.dilatedXY( 10, 10 );

    this.dragListener = new DragListener( {
      positionProperty: pHPaper.positionProperty,
      dragBoundsProperty: new Property( pHPaper.dragBounds ), // fixed drag bounds
      tandem: tandem.createTandem( 'dragListener' )
    } );
    this.addInputListener( this.dragListener );

    this.keyboardDragListener = new KeyboardDragListener( combineOptions<KeyboardDragListenerOptions>(
      {}, ABSConstants.KEYBOARD_DRAG_LISTENER_OPTIONS, {
        positionProperty: pHPaper.positionProperty,
        dragBoundsProperty: new Property( pHPaper.dragBounds ), // fixed drag bounds
        tandem: tandem.createTandem( 'keyboardDragListener' )
      } ) );
    this.addInputListener( this.keyboardDragListener );

    // add observers
    pHPaper.positionProperty.link( position => {
      this.translation = position;
    } );

    pHPaper.percentColoredProperty.link( percentColored => {
      indicatorNode.setRectHeight( percentColored * pHPaper.paperSize.height );
    } );

    this.pHPaper = pHPaper;
    this.animating = false;

    this.addLinkedElement( pHPaper );
  }

  public step( dt: number ): void {
    if ( !this.dragListener.isPressed && !this.keyboardDragListener.isPressed ) {

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
  }

  /**
   * Creates an icon that represents the pH paper.
   */
  public static createIcon( width: number, height: number ): Node {
    return new Node( {
      children: [

        // full paper
        new Rectangle( 0, 0, width, height, {
          fill: ABSColors.pHPaperFillProperty,
          stroke: PAPER_STROKE,
          lineWidth: 0.5
        } ),

        // portion of paper that's colored
        new Rectangle( 0, 0.6 * height, width, 0.4 * height, {
          fill: ABSColors.PH_PAPER_COLOR_PROPERTIES[ 2 ],
          stroke: PAPER_STROKE,
          lineWidth: 0.5
        } )
      ]
    } );
  }
}

acidBaseSolutions.register( 'PHPaperNode', PHPaperNode );