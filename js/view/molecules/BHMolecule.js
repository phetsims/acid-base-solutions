// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for BH molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' );

  var atomCache, getMolecule = function( color ) {
    return new Node( {children: [
      new Atom( {x: -6, y: -6}, 4, color ),
      new Atom( {x: 0, y: 0}, 7, color )
    ]} );
  };

  function BHMolecule( model, coords, fromCache ) {
    var BH_PLUS_COLOR = model.MOLECULES_COLORS.BH;
    Node.call( this, coords );

    // cache values for next execution
    this.addChild( fromCache ? (atomCache ? atomCache : atomCache = getMolecule( BH_PLUS_COLOR )) : getMolecule( BH_PLUS_COLOR ) );
  }

  return inherit( Node, BHMolecule );
} );