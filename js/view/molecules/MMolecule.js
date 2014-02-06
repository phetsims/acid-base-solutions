// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for M molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' );

  var atomCache, getMolecule = function( color ) {
    return new Atom( {x: 0, y: 0}, 7, color );
  };

  function MMolecule( model, coords, fromCache ) {
    Node.call( this, coords );

    // cache values for next execution
    this.addChild( fromCache ? (atomCache ? atomCache : atomCache = getMolecule( model.MOLECULES_COLORS.M )) : getMolecule( model.MOLECULES_COLORS.M ) );
  }

  return inherit( Node, MMolecule );
} );