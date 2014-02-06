// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for H3O molecule.
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
      new Atom( {x: 3, y: -7.5}, 4, color ),
      new Atom( {x: 3, y: 7.5}, 4, color ),
      new Atom( {x: 0, y: 0}, 7, color ),
      new Atom( {x: -8, y: 0}, 4, color )
    ]} );
  };

  function H3OMolecule( model, coords, fromCache ) {
    var H3O_COLOR = model.MOLECULES_COLORS.H3O;
    Node.call( this, coords );

    // cache values for next execution
    this.addChild( fromCache ? (atomCache ? atomCache : atomCache = getMolecule( H3O_COLOR )) : getMolecule( H3O_COLOR ) );
  }

  return inherit( Node, H3OMolecule );
} );