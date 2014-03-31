// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for single atom.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );

  function AtomNode( radius, color, options ) {

    var gradient = new RadialGradient( -radius * 0.2, -radius * 0.3, 0.25, -radius * 0.2, -radius * 0.3, radius * 2 )
      .addColorStop( 0, 'white' )
      .addColorStop( 0.33, color )
      .addColorStop( 1, 'black' );

    Circle.call( this, radius, _.extend( {fill: gradient }, options ) );
  }

  return inherit( Circle, AtomNode );
} );