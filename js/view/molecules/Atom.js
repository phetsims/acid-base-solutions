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
    Circle = require( 'SCENERY/nodes/Circle' );

  var gradients = {};

  function Atom( coords, radius, color ) {
    Node.call( this, coords );

    if ( !(radius in gradients) ) {
      gradients[radius] = {};
    }

    // cache gradients for next executions
    if ( !(color in gradients[radius]) ) {
      gradients[radius][color] = {
        gradientDefault: new RadialGradient( -radius * 0.2, -radius * 0.3, 0.25, -radius * 0.2, -radius * 0.3, radius * 2 )
          .addColorStop( 0, 'white' )
          .addColorStop( 0.33, color )
          .addColorStop( 1, 'black' ),
        gradientGray: new RadialGradient( -radius * 0.2, -radius * 0.3, 0.25, -radius * 0.2, -radius * 0.3, radius * 2 )
          .addColorStop( 0, 'rgb(169,169,169)' )
          .addColorStop( 0.33, 'rgb(150,150,150)' )
          .addColorStop( 1, 'rgb(150,150,150)' )
      };
    }

    this.gradientDefault = gradients[radius][color].gradientDefault;
    this.gradientGray = gradients[radius][color].gradientGray;

    this.view = new Circle( radius, {fill: this.gradientDefault} );
    this.addChild( this.view );
  }

  return inherit( Node, Atom, {
    fillDefault: function() {
      this.view.setFill( this.gradientDefault );
    },
    fillGray: function() {
      this.view.setFill( this.gradientGray );
    }
  } );
} );