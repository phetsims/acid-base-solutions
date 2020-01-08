// Copyright 2014-2020, University of Colorado Boulder

/**
 * Visual representation for pH paper in the 'Acid-Base Solutions' sim.
 * Origin is at the bottom-center of the paper.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ABSColors = require( 'ACID_BASE_SOLUTIONS/common/ABSColors' );
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const Color = require( 'SCENERY/util/Color' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Utils = require( 'DOT/Utils' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
  const PAPER_STROKE = 'rgb(100, 100, 100)';

  /**
   * @param {PHPaper} pHPaper
   * @constructor
   */
  function PHPaperNode( pHPaper ) {

    const self = this;
    Node.call( this, { cursor: 'pointer' } );

    // blank paper
    const paperNode = new Rectangle( 0, 0, pHPaper.paperSize.width, pHPaper.paperSize.height,
      { fill: ABSColors.PH_PAPER, stroke: PAPER_STROKE, lineWidth: 0.5 } );

    // portion of the paper that changes color
    const indicatorNode = new Rectangle( 0, 0, pHPaper.paperSize.width, 0, { stroke: PAPER_STROKE, lineWidth: 0.5 } );
    indicatorNode.rotate( Math.PI ); // so that indicator rectangle expands upward

    // rendering order
    this.addChild( paperNode );
    this.addChild( indicatorNode );
    if ( SHOW_ORIGIN ) {
      this.addChild( new Circle( 2, { fill: 'red' } ) );
    }

    // origin at bottom-center of paper
    paperNode.centerX = 0;
    paperNode.bottom = 0;
    indicatorNode.centerX = 0;
    indicatorNode.top = 0;

    // expand touch area
    this.touchArea = this.localBounds.dilatedXY( 10, 10 );

    // @private Constrained dragging
    let clickOffset = null;
    this.dragHandler = new SimpleDragHandler( {

      start: function( e ) {
        clickOffset = self.globalToParentPoint( e.pointer.point ).subtract( e.currentTarget.translation );
      },

      drag: function( e ) {
        const v = self.globalToParentPoint( e.pointer.point ).subtract( clickOffset );
        pHPaper.positionProperty.set( new Vector2(
          Utils.clamp( v.x, pHPaper.dragBounds.minX, pHPaper.dragBounds.maxX ),
          Utils.clamp( v.y, pHPaper.dragBounds.minY, pHPaper.dragBounds.maxY ) ) );
      }
    } );
    this.addInputListener( this.dragHandler );

    // add observers
    pHPaper.positionProperty.link( function( position ) {
      self.translation = position;
    } );

    pHPaper.indicatorHeightProperty.link( function( height ) {
      indicatorNode.setRectHeight( height );
    } );

    // @private
    this.updateColor = function() {
      if ( self.visible ) {
        indicatorNode.fill = pHToColor( pHPaper.pHProperty.get() );
      }
    };
    pHPaper.pHProperty.link( this.updateColor );

    // @private is the paper animating?
    this.animating = false;

    // @private needed by methods
    this.pHPaper = pHPaper;
  }

  acidBaseSolutions.register( 'PHPaperNode', PHPaperNode );

  // Creates a {Color} color for a given {number} pH.
  var pHToColor = function( pH ) {
    assert && assert( pH >= 0 && pH <= ABSColors.PH.length );
    let color;
    if ( Utils.isInteger( pH ) ) {
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
  };

  return inherit( Node, PHPaperNode, {

    // @public
    step: function( dt ) {
      if ( !this.dragHandler.dragging ) {

        const position = this.pHPaper.positionProperty.value;
        const minY = this.pHPaper.beaker.top + ( 0.6 * this.pHPaper.paperSize.height );

        // if the paper is fully submerged in the solution ...
        if ( ( this.animating && position.y > minY ) || ( this.pHPaper.top > this.pHPaper.beaker.top ) ) {

          // float to the top of the beaker, with part of the paper above the surface
          this.animating = true;
          const dy = dt * 250; // move at a constant speed of 250 pixels per second
          const y = Math.max( minY, position.y - dy );
          this.pHPaper.positionProperty.value = new Vector2( position.x, y );
        }
      }
      else {
        this.animating = false;
      }
    },

    /**
     * Update paper color when this node becomes visible.
     * @param visible
     * @public
     * @override
     */
    setVisible: function( visible ) {
      const wasVisible = this.visible;
      Node.prototype.setVisible.call( this, visible );
      if ( !wasVisible && visible ) {
        this.updateColor();
      }
    }
  }, {

    /**
     * Creates an icon that represents the pH paper.
     * @public
     * @static
     * @param width
     * @param height
     * @returns {Node}
     */
    createIcon: function( width, height ) {
      return new Node( {
        children: [
          // full paper
          new Rectangle( 0, 0, width, height, { fill: ABSColors.PH_PAPER, stroke: PAPER_STROKE, lineWidth: 0.5 } ),
          // portion of paper that's colored
          new Rectangle( 0, 0.6 * height, width, 0.4 * height, { fill: ABSColors.PH[ 2 ], stroke: PAPER_STROKE, lineWidth: 0.5 } )
        ]
      } );
    }
  } );
} );
