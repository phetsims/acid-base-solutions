// Copyright 2014-2023, University of Colorado Boulder

/**
 * Visual representation for pH meter in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Circle, DragListener, Node, Path, Rectangle, Text } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import PHMeter from '../model/PHMeter.js';
import { ToolMode } from './ToolMode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';

// constants
const SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
const DECIMAL_PLACES = 2;
const FONT = new PhetFont( { size: 15, weight: 'bold' } );
const X_MARGIN = 12;
const Y_MARGIN = 8;
const BACKGROUND_FILL = 'rgb( 225, 225, 225 )';
const BACKGROUND_STROKE = 'rgb( 64, 64, 64 )';
const PH_TEXT_MAX_WIDTH = 70;

export default class PHMeterNode extends Node {

  public constructor( pHMeter: PHMeter, toolModeProperty: StringUnionProperty<ToolMode>, tandem: Tandem ) {

    // probe
    const probeNode = new ProbeNode( 5, 40, 14, 36 );

    const pHStringProperty = new DerivedProperty(
      [
        AcidBaseSolutionsStrings.pattern[ '0label' ][ '1valueStringProperty' ],
        AcidBaseSolutionsStrings.pHStringProperty,
        pHMeter.pHProperty,
        pHMeter.isInSolutionProperty
      ],
      ( patternString, pHString, pH, isInSolution ) => {
        const pHValueString = isInSolution ? Utils.toFixed( pH, DECIMAL_PLACES ) : '';
        return StringUtils.format( patternString, pHString, pHValueString );
      } );

    const pHText = new Text( pHStringProperty, {
      font: FONT,
      maxWidth: PH_TEXT_MAX_WIDTH
    } );

    // background sized to fit text
    const backgroundNode = new Rectangle( 0, 0, PH_TEXT_MAX_WIDTH + ( 2 * X_MARGIN ), pHText.height + ( 2 * Y_MARGIN ), {
      cornerRadius: 5,
      fill: BACKGROUND_FILL,
      stroke: BACKGROUND_STROKE,
      lineWidth: 1.5
    } );

    // layout, origin at probe tip
    probeNode.centerX = 0;
    probeNode.bottom = 0;
    backgroundNode.left = probeNode.centerX - ( 0.25 * backgroundNode.width );
    backgroundNode.bottom = probeNode.top + 1; // hide seam
    pHText.boundsProperty.link( bounds => {
      pHText.left = backgroundNode.left + X_MARGIN;
      pHText.centerY = backgroundNode.centerY;
    } );

    const children: Node[] = [ probeNode, backgroundNode, pHText ];
    if ( SHOW_ORIGIN ) {
      children.push( new Circle( 2, { fill: 'red' } ) );
    }

    super( {
      children: children,
      cursor: 'pointer',
      visibleProperty: new DerivedProperty( [ toolModeProperty ], toolMode => ( toolMode === 'pHMeter' ), {
        tandem: tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      tandem: tandem
    } );

    // Constrained dragging
    let clickYOffset = 0;
    this.addInputListener( new DragListener( {

      start: event => {
        clickYOffset = this.globalToParentPoint( event.pointer.point ).y - event.currentTarget!.y;
      },

      drag: event => {
        const y = this.globalToParentPoint( event.pointer.point ).y - clickYOffset;
        pHMeter.positionProperty.value = new Vector2(
          pHMeter.positionProperty.value.x,
          Utils.clamp( y, pHMeter.dragYRange.min, pHMeter.dragYRange.max ) );
      },

      tandem: tandem.createTandem( 'dragListener' )
    } ) );

    pHMeter.positionProperty.link( position => {
      this.translation = position;
    } );

    this.addLinkedElement( pHMeter, {
      tandem: tandem.createTandem( pHMeter.tandem.name )
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  /**
   * Creates an icon for the pH meter.
   */
  public static createIcon(): Node {
    const probeNode = new ProbeNode( 2, 10, 5, 12 );
    const backgroundNode = new Rectangle( 0, 0, 30, 10, 2, 2, {
      fill: BACKGROUND_FILL,
      stroke: BACKGROUND_STROKE,
      lineWidth: 0.5,
      left: probeNode.centerX - 7,
      bottom: probeNode.top + 1
    } );
    return new Node( { children: [ probeNode, backgroundNode ] } );
  }
}

/**
 * pH Probe, consists of a shaft attached to a tip.
 */
class ProbeNode extends Node {

  public constructor( shaftWidth: number, shaftHeight: number, tipWidth: number, tipHeight: number ) {

    const overlap = 1; // overlap, to hide seam

    // probe shaft
    const shaftNode = new Rectangle( 0, 0, shaftWidth, shaftHeight + overlap, {
      fill: 'rgb( 192, 192, 192 )',
      stroke: 'rgb( 160, 160, 160 )',
      lineWidth: 0.5
    } );

    // probe tip: clockwise from tip of probe, origin at upper-left of shape
    const cornerRadius = tipHeight / 9;
    const tipShape = new Shape()
      .moveTo( tipWidth / 2, tipHeight )
      .lineTo( 0, 0.6 * tipHeight )
      .lineTo( 0, cornerRadius )
      .arc( cornerRadius, cornerRadius, cornerRadius, Math.PI, 1.5 * Math.PI )
      .lineTo( cornerRadius, 0 )
      .lineTo( tipWidth - cornerRadius, 0 )
      .arc( tipWidth - cornerRadius, cornerRadius, cornerRadius, -0.5 * Math.PI, 0 )
      .lineTo( tipWidth, 0.6 * tipHeight )
      .close();
    const tipNode = new Path( tipShape, {
      fill: 'black',
      centerX: shaftNode.centerX,
      top: shaftNode.bottom - overlap
    } );

    super( { children: [ shaftNode, tipNode ] } );
  }
}

acidBaseSolutions.register( 'PHMeterNode', PHMeterNode );