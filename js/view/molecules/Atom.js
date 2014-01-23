// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for single atom.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    RadialGradient = require( 'SCENERY/util/RadialGradient' ),
    Circle = require( 'SCENERY/nodes/Circle' ),
    Color = require( 'SCENERY/util/Color' );

  function Atom( coords, radius, color ) {
    Node.call( this, coords );

    this.view = new Circle( radius, {
      fill: new RadialGradient( -radius * 0.2, -radius * 0.3, 0.25, -radius * 0.2, -radius * 0.3, radius * 2 )
        .addColorStop( 0, new Color( 'white' ) )
        .addColorStop( 0.33, color )
        .addColorStop( 1, new Color( 'black' ) )
    } );

    this.addChild( this.view );
  }

  return inherit( Node, Atom );
} );