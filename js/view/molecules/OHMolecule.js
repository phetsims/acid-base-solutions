// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for OH molecule.
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
      new Atom( {x: 8, y: -3}, 4, color ),
      new Atom( {x: 0, y: 0}, 7, color )
    ]} );
  };

  function OHMolecule( model, coords, fromCache ) {
    var OH_MINUS_COLOR = model.MOLECULES_COLORS.OH;
    Node.call( this, coords );

    // cache values for next execution
    this.addChild( fromCache ? (atomCache ? atomCache : atomCache = getMolecule( OH_MINUS_COLOR )) : getMolecule( OH_MINUS_COLOR ) );
  }

  return inherit( Node, OHMolecule );
} );