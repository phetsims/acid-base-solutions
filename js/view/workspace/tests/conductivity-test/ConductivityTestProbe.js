// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation for single probe
 * in the conductivity test in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var Dimension2 = require( 'DOT/Dimension2' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var MinusNode = require( 'SCENERY_PHET/MinusNode' );
  var PlusNode = require( 'SCENERY_PHET/PlusNode' );
  var Util = require( 'DOT/Util' );
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  // constants
  var SHOW_ORIGIN = true; // draws a red circle at the origin, for debugging
  var PROBE_SIZE = new Dimension2( 16, 55 );
  var POSITIVE_FILL = 'red';
  var NEGATIVE_FILL = 'black';
  var PROBE_MAX_Y_COODINATE = 370,
    PROBE_MIN_Y_COODINATE = 40;

  function ConductivityTestProbe( property, dragYRange, options ) {

    options = _.extend( {
      isPositive: true
    }, options );

    var self = this;
    Node.call( this, options );

    var plateNode = new Rectangle( -PROBE_SIZE.width/2, -PROBE_SIZE.height, PROBE_SIZE.width, PROBE_SIZE.height,
      { fill: ( options.isPositive ? POSITIVE_FILL : NEGATIVE_FILL ), stroke: 'black', lineWidth: 0.5 } );
    var signNode = options.isPositive ?
                   new PlusNode( { size: new Dimension2( 6, 2 ), fill: 'white'} ) :
                   new MinusNode( { size: new Dimension2( 6, 2 ), fill: 'white'} );
    signNode.centerX = plateNode.centerX;
    signNode.bottom = plateNode.bottom - 10;

    this.addChild( plateNode );
    this.addChild( signNode );
    if ( SHOW_ORIGIN ) {
      this.addChild( new Circle( 2, { fill: 'red' } ) );
    }

    this.cursor = 'pointer';
    var clickYOffset;
    this.addInputListener( new SimpleDragHandler( {

      start: function( e ) {
        clickYOffset = self.globalToParentPoint( e.pointer.point ).y - e.currentTarget.y;
      },

      drag: function( e ) {
        var y = self.globalToParentPoint( e.pointer.point ).y - clickYOffset;
        property.value = Util.clamp( y, dragYRange.min, dragYRange.max );
      }
    } ) );

    property.link( function( y ) {
      self.setY( y );
    } );
  }

  return inherit( Node, ConductivityTestProbe );
} );
