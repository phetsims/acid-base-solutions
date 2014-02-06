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
    Path = require( 'SCENERY/nodes/Path' ),
    Shape = require( 'KITE/Shape' ),

    batteryImage = require( 'image!ACID_BASE_SOLUTIONS/battery.png' ),
    lightBulbBaseImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-base.png' ),
    lightBulbGlassImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-glass.png' ),
    lightBulbGlassMaskImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-glass-mask.png' );

  function ConductivityTest( model, options ) {
    var self = this;
    Node.call( this, options );

    // add light bulb image
    this.addChild( new Node( {x: -10, y: -25, children: [
      new Image( lightBulbBaseImage, {scale: 0.33, x: 15.5, y: 66} ),
      new Node( {opacity: 0.5, children: [new Image( lightBulbGlassMaskImage, {scale: 0.33} )]} ),
      new Image( lightBulbGlassImage, {scale: 0.33} )
    ]} ) );

    // add wire from battery to light bulb
    this.addChild( new Path( new Shape().moveTo( 13, 59 ).lineTo( 75, 59 ), {stroke: 'black', lineWidth: 1.5} ) );

    // add battery image
    this.addChild( new Image( batteryImage, {scale: 0.6, x: 75, y: 42} ) );

    model.property( 'testMode' ).link( function( mode ) {
      self.setVisible( mode === 'CONDUCTIVITY' );
    } );
  }

  return inherit( Node, ConductivityTest );
} );
