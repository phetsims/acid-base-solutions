// Copyright 2002-2013, University of Colorado Boulder

/**
 * Workspace container for the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Beaker = require( './Beaker' ),
    Magnifier = require( './Magnifier' );

  function Workspace( model, options ) {
    Node.call( this, options );

    // add beaker
    this.addChild( new Beaker( model, {x: model.width / 3, y: model.height / 2} ) );

    // add magnifier
    this.addChild( new Magnifier( model, {x: model.width / 3, y: model.height / 2 + 10} ) );
  }

  return inherit( Node, Workspace );
} );
