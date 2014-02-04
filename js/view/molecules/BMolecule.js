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
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' );

  function BMolecule( model, coords ) {
    Node.call( this, coords );
    this.addChild( new Atom( {x: 0, y: 0}, 7, model.MOLECULES_COLORS.B ) );
  }

  return inherit( Node, BMolecule );
} );