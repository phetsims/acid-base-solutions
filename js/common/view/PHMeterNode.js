// Copyright 2014-2021, University of Colorado Boulder

/**
 * Visual representation for pH meter in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import acidBaseSolutionsStrings from '../../acidBaseSolutionsStrings.js';
import ABSConstants from '../ABSConstants.js';

// constants
const SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
const DECIMAL_PLACES = 2;
const FONT = new PhetFont( { size: 15, weight: 'bold' } );
const X_MARGIN = 12;
const Y_MARGIN = 8;
const BACKGROUND_FILL = 'rgb( 225, 225, 225 )';
const BACKGROUND_STROKE = 'rgb( 64, 64, 64 )';

class PHMeterNode extends Node {

  /**
   * @param {PHMeter} pHMeter
   */
  constructor( pHMeter ) {

    super( { cursor: 'pointer' } );

    // probe
    const probeNode = new ProbeNode( 5, 40, 14, 36 );

    // text, initialized with widest value for layout
    const textNode = new Text( formatText( ABSConstants.PH_RANGE.max ), {
      font: FONT,
      centerX: 34,
      centerY: 0,
      maxWidth: 100 // constrain width for i18n, determined empirically
    } );

    // background sized to fit text
    const backgroundNode = new Rectangle( 0, 0, textNode.width + ( 2 * X_MARGIN ), textNode.height + ( 2 * Y_MARGIN ), {
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
    textNode.center = backgroundNode.center;

    // rendering order
    this.addChild( probeNode );
    this.addChild( backgroundNode );
    this.addChild( textNode );
    if ( SHOW_ORIGIN ) {
      this.addChild( new Circle( 2, { fill: 'red' } ) );
    }

    // Constrained dragging
    let clickYOffset = 0;
    this.addInputListener( new DragListener( {

      start: event => {
        clickYOffset = this.globalToParentPoint( event.pointer.point ).y - event.currentTarget.y;
      },

      drag: event => {
        const y = this.globalToParentPoint( event.pointer.point ).y - clickYOffset;
        pHMeter.positionProperty.set( new Vector2( pHMeter.positionProperty.get().x, Utils.clamp( y, pHMeter.dragYRange.min, pHMeter.dragYRange.max ) ) );
      }
    } ) );

    // @private
    this.updateText = () => {
      if ( this.visible ) {
        textNode.text = pHMeter.inSolution() ? formatText( pHMeter.pHProperty.get() ) : formatText( null );
      }
    };
    pHMeter.pHProperty.link( this.updateText );
    pHMeter.positionProperty.link( this.updateText );

    pHMeter.positionProperty.link( position => {
      this.translation = position;
    } );

    // Update when this Node becomes visible.
    this.visibleProperty.link( visible => visible && this.updateText() );
  }

  /**
   * Creates an icon for the pH meter.
   * @public
   * @static
   * @returns {Node}
   */
  static createIcon() {
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

acidBaseSolutions.register( 'PHMeterNode', PHMeterNode );

// format a pH value for display.
function formatText( pH ) {
  if ( pH === null ) {
    return StringUtils.format( acidBaseSolutionsStrings.pattern[ '0label' ][ '1value' ],
      acidBaseSolutionsStrings.pH, '' );
  }
  else {
    return StringUtils.format( acidBaseSolutionsStrings.pattern[ '0label' ][ '1value' ],
      acidBaseSolutionsStrings.pH, Utils.toFixed( pH, DECIMAL_PLACES ) );
  }
}

class ProbeNode extends Node {

  /**
   * pH Probe, consists of a shaft attached to a tip.
   * @param {number} shaftWidth
   * @param {number} shaftHeight
   * @param {number} tipWidth
   * @param {number} tipHeight
   */
  constructor( shaftWidth, shaftHeight, tipWidth, tipHeight ) {

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

export default PHMeterNode;