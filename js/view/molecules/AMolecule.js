// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for A molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' ),
    Color = require( 'SCENERY/util/Color' );

  function AMolecule( coords ) {
    var A_MINUS_COLOR = new Color( 0, 170, 255 );
    Node.call( this, coords );

    this.addChild( new Atom( {x: 0, y: 0}, 7, A_MINUS_COLOR ) );
  }

  return inherit( Node, AMolecule );
} );