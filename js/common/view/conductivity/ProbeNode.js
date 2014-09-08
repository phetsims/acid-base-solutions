// Copyright 2002-2014, University of Colorado Boulder

/**
 * Conductivity tester probe.
 * Origin is at bottom-center.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MinusNode = require( 'SCENERY_PHET/MinusNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PlusNode = require( 'SCENERY_PHET/PlusNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // constants
  var SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
  var POSITIVE_FILL = 'red';
  var NEGATIVE_FILL = 'black';

  /**
   * @param {Dimension2} probeSize
   * @param {Number} probeYProperty y-coordinate of the probe
   * @param {SimpleDragHandler} probeDragHandler
   * @param {Object} options
   * @constructor
   */
  function ProbeNode( probeSize, probeYProperty, probeDragHandler, options ) {

    options = _.extend( {
      isPositive: true
    }, options );

    var self = this;
    Node.call( this, options );

    // nodes
    var plateNode = new Rectangle( -probeSize.width / 2, -probeSize.height, probeSize.width, probeSize.height,
      { fill: ( options.isPositive ? POSITIVE_FILL : NEGATIVE_FILL ), stroke: 'black', lineWidth: 0.5 } );
    var signNode = options.isPositive ?
                   new PlusNode( { size: new Dimension2( 6, 2 ), fill: 'white'} ) :
                   new MinusNode( { size: new Dimension2( 6, 2 ), fill: 'white'} );
    signNode.centerX = plateNode.centerX;
    signNode.bottom = plateNode.bottom - 10;

    // rendering order
    this.addChild( plateNode );
    this.addChild( signNode );
    if ( SHOW_ORIGIN ) {
      this.addChild( new Circle( 2, { fill: 'red' } ) );
    }

    // expand touch area
    this.touchArea = this.localBounds.dilatedXY( 10, 10 );

    // interactivity
    this.cursor = 'pointer';
    this.addInputListener( probeDragHandler );

    probeYProperty.link( function( probeY ) {
      self.y = probeY;
    } );
  }

  return inherit( Node, ProbeNode );
} );
