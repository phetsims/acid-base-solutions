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
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' ),
    COLOR_H3O = require( 'model/Constants/MoleculesColors' ).H3O;

  var atomCache, getMolecule = function() {
    return new Node( {children: [
      new Atom( 4, COLOR_H3O, {x: 3, y: -7.5} ),
      new Atom( 4, COLOR_H3O, {x: 3, y: 7.5} ),
      new Atom( 7, COLOR_H3O, {x: 0, y: 0} ),
      new Atom( 4, COLOR_H3O, {x: -8, y: 0} )
    ]} );
  };

  function H3OMolecule( coords, fromCache ) {
    Node.call( this, coords );

    // cache values for next execution
    this.addChild( fromCache ? (atomCache ? atomCache : atomCache = getMolecule()) : getMolecule() );
  }

  return inherit( Node, H3OMolecule );
} );