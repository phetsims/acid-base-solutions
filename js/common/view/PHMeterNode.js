// Copyright 2014-2019, University of Colorado Boulder

/**
 * Visual representation for pH meter in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Shape = require( 'KITE/Shape' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Utils = require( 'DOT/Utils' );
  const Vector2 = require( 'DOT/Vector2' );

  // strings
  const pattern0Label1ValueString = require( 'string!ACID_BASE_SOLUTIONS/pattern.0label.1value' );
  const pHString = require( 'string!ACID_BASE_SOLUTIONS/pH' );

  // constants
  const SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
  const DECIMAL_PLACES = 2;
  const FONT = new PhetFont( { size: 15, weight: 'bold' } );
  const X_MARGIN = 12;
  const Y_MARGIN = 8;
  const BACKGROUND_FILL = 'rgb(225,225,225)';
  const BACKGROUND_STROKE = 'rgb(64,64,64)';

  /**
   * @param {PHMeter} pHMeter
   * @constructor
   */
  function PHMeterNode( pHMeter ) {

    const self = this;
    Node.call( this, { cursor: 'pointer' } );

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
    const backgroundNode = new Rectangle( 0, 0, textNode.width + ( 2 * X_MARGIN ), textNode.height + ( 2 * Y_MARGIN ), 5, 5,
      { fill: BACKGROUND_FILL, stroke: BACKGROUND_STROKE, lineWidth: 1.5 } );

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
    this.addInputListener( new SimpleDragHandler( {

      start: function( e ) {
        clickYOffset = self.globalToParentPoint( e.pointer.point ).y - e.currentTarget.y;
      },

      drag: function( e ) {
        const y = self.globalToParentPoint( e.pointer.point ).y - clickYOffset;
        pHMeter.positionProperty.set( new Vector2( pHMeter.positionProperty.get().x, Utils.clamp( y, pHMeter.dragYRange.min, pHMeter.dragYRange.max ) ) );
      }
    } ) );

    // @private
    this.updateText = function() {
      if ( self.visible ) {
        textNode.text = pHMeter.inSolution() ? formatText( pHMeter.pHProperty.get() ) : formatText( null );
      }
    };
    pHMeter.pHProperty.link( this.updateText );
    pHMeter.positionProperty.link( this.updateText );

    pHMeter.positionProperty.link( function( position ) {
      self.translation = position;
    } );
  }

  acidBaseSolutions.register( 'PHMeterNode', PHMeterNode );

  // format a pH value for display.
  var formatText = function( pH ) {
    if ( pH === null ) {
      return StringUtils.format( pattern0Label1ValueString, pHString, '' );
    }
    else {
      return StringUtils.format( pattern0Label1ValueString, pHString, Utils.toFixed( pH, DECIMAL_PLACES ) );
    }
  };

  /**
   * pH Probe, consists of a shaft attached to a tip.
   * @param {number} shaftWidth
   * @param {number} shaftHeight
   * @param {number} tipWidth
   * @param {number} tipHeight
   * @constructor
   */
  function ProbeNode( shaftWidth, shaftHeight, tipWidth, tipHeight ) {

    const overlap = 1; // overlap, to hide seam

    // probe shaft
    const shaftNode = new Rectangle( 0, 0, shaftWidth, shaftHeight + overlap,
      { fill: 'rgb(192,192,192)', stroke: 'rgb(160,160,160)', lineWidth: 0.5 } );

    // probe tip: clockwise from tip of probe, origin at upper-left of shape
    const cornerRadius = tipHeight / 9;
    const tipNode = new Path( new Shape()
        .moveTo( tipWidth / 2, tipHeight )
        .lineTo( 0, 0.6 * tipHeight )
        .lineTo( 0, cornerRadius )
        .arc( cornerRadius, cornerRadius, cornerRadius, Math.PI, 1.5 * Math.PI )
        .lineTo( cornerRadius, 0 )
        .lineTo( tipWidth - cornerRadius, 0 )
        .arc( tipWidth - cornerRadius, cornerRadius, cornerRadius, -0.5 * Math.PI, 0 )
        .lineTo( tipWidth, 0.6 * tipHeight )
        .close(),
      { fill: 'black', centerX: shaftNode.centerX, top: shaftNode.bottom - overlap }
    );

    Node.call( this, { children: [ shaftNode, tipNode ] } );
  }

  inherit( Node, ProbeNode );

  return inherit( Node, PHMeterNode, {

    /**
     * Update value displayed when this node becomes visible.
     * @param visible
     * @public
     * @override
     */
    setVisible: function( visible ) {
      const wasVisible = this.visible;
      Node.prototype.setVisible.call( this, visible );
      if ( !wasVisible && visible ) {
        this.updateText();
      }
    }
  }, {

    /**
     * Creates an icon for the pH meter.
     * @public
     * @static
     * @returns {Node}
     */
    createIcon: function() {
      const probeNode = new ProbeNode( 2, 10, 5, 12 );
      const backgroundNode = new Rectangle( 0, 0, 30, 10, 2, 2, {
        fill: BACKGROUND_FILL,
        stroke: BACKGROUND_STROKE,
        lineWidth: 0.5,
        left:   probeNode.centerX - 7,
        bottom: probeNode.top + 1
      } );
      return new Node( { children: [ probeNode, backgroundNode ] } );
    }
  } );
} );
