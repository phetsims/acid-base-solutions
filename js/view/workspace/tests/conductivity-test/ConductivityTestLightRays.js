// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for light rays
 * in the conductivity test in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    LinearFunction = require( 'DOT/LinearFunction' ),

    BRIGHTNESS_TO_INTENSITY_FUNCTION = new LinearFunction( 0, 1, 0, 1 ); // intensity of the light rays;

  function ConductivityTestLightRays( model, options ) {
    Node.call( this, options );

    model.property( 'brightness' ).link( function( brightnessValue ) {
      //var glassTransparency = clamp( 0, BRIGHTNESS_TO_ALPHA_FUNCTION_AGAINST_DARK_BACKGROUND( value ), 1 );
      //console.log( BRIGHTNESS_TO_INTENSITY_FUNCTION(value) );
    } );
  }

  return inherit( Node, ConductivityTestLightRays );
} );
