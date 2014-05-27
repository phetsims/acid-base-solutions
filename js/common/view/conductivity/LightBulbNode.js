// Copyright 2002-2014, University of Colorado Boulder

/**
 * Light bulb.
 * The bulb is made to 'glow' by modulating opacity of the 'on' image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Util = require( 'DOT/Util' );

  // images
  var onImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-on.png' );
  var offImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-off.png' );

  /**
   * @param {Property<Number>} brightnessProperty 0 (off) to 1 (full brightness)
   * @constructor
   */
  function LightBulbNode( brightnessProperty, options ) {
    Node.call( this );

    var onNode = new Image( onImage );
    var offNode = new Image( offImage );

    onNode.centerX = offNode.centerX;
    onNode.bottom = offNode.bottom;

    this.glowOffset = onNode.height - offNode.height; // how much glow adds to the bulb dimensions
    this.radius = offNode.width / 2; // use 'off' node, the 'on' node is wider because it has a glow around it.

    options.children = [
      offNode,
      onNode
    ];
    Node.call( this, options );

    brightnessProperty.link( function( brightness ) {
      onNode.visible = ( brightness > 0 );
      if ( onNode.visible ) {
        onNode.opacity = Util.linear( 0, 1, 0.3, 1, brightness );
      }
    } );
  }

  return inherit( Node, LightBulbNode );
} );
