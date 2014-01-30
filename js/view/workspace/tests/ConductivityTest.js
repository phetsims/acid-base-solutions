// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for lightbulb, battery and wires in the conductivity test in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Image = require( 'SCENERY/nodes/Image' ),

    lightBulbImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb.png' );

  function ConductivityTest( model, options ) {
    var self = this;
    Node.call( this, options );

    this.addChild( new Image( lightBulbImage, {scale: 1.25} ) );

    model.property( 'testMode' ).link( function( mode ) {
      self.setVisible( mode === 'CONDUCTIVITY' );
    } );
  }

  return inherit( Node, ConductivityTest );
} );
