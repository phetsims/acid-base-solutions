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
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' );

  var atomCache, getMolecule = function( color ) {
    return new Atom( {x: 0, y: 0}, 7, color );
  };

  function AMolecule( model, coords, fromCache ) {
    Node.call( this, coords );

    // cache values for next execution
    this.addChild( fromCache ? (atomCache ? atomCache : atomCache = getMolecule( model.MOLECULES_COLORS.A )) : getMolecule( model.MOLECULES_COLORS.A ) );
  }

  return inherit( Node, AMolecule );
} );