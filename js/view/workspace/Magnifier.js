// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for magnifier in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Circle = require( 'SCENERY/nodes/Circle' ),
    Shape = require( 'KITE/Shape' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function Magnifier( model, options ) {
    var self = this,
      radius = model.height / 3.6,
      rectangle;
    Node.call( this, options );

    // add holder
    rectangle = new Rectangle( radius + 2, -radius / 7, radius * 0.9, radius / 4, 5, 5, {fill: 'rgb(85,55,33)', stroke: 'black', lineWidth: 1} );
    rectangle.rotate( Math.PI / 6 );
    this.addChild( rectangle );

    // add lens
    this.addChild( new Circle( radius, {stroke: 'black', lineWidth: 8} ) );

    model.property( 'viewMode' ).link( function( mode ) {
      self.setVisible( mode === 'MOLECULES' );
    } );

    // add container for molecules
    this.addChild( this.container = new Node() );
    this.container.setClipArea( new Shape().circle( 0, 0, radius - 4 ) );
  }

  return inherit( Node, Magnifier );
} );
