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
    Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function Magnifier( model, options ) {
    var radius = model.height / 4.3,
      rectangle;
    Node.call( this, options );

    // add holder
    rectangle = new Rectangle( radius + 2, -radius / 7, radius, radius / 3.5, 5, 5, {fill: 'rgb(85,55,33)', stroke: 'black', lineWidth: 1} );
    rectangle.rotate( Math.PI / 7 );
    this.addChild( rectangle );

    // add lens
    this.addChild( new Circle( radius, {stroke: 'black', lineWidth: 8} ) );
  }

  return inherit( Node, Magnifier );
} );
