// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for B molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' ),
    Color = require( 'SCENERY/util/Color' );

  function BMolecule( coords ) {
    var NEUTRAL_COLOR = new Color( 120, 120, 120 ); // gray
    Node.call( this, coords );

    this.addChild( new Atom( {x: 0, y: 0}, 7, NEUTRAL_COLOR ) );
  }

  return inherit( Node, BMolecule );
} );