// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for H2O molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' ),
    COLOR_H2O = require( 'model/Constants/MoleculesColors' ).H2O;

  var atomCache, getMolecule = function() {
    return new Node( {children: [
      new Atom( {x: 0, y: -9}, 4, COLOR_H2O ),
      new Atom( {x: 0, y: 0}, 7, COLOR_H2O ),
      new Atom( {x: -6, y: 5}, 4, COLOR_H2O )
    ]} );
  };

  function H2OMolecule( coords, fromCache ) {
    Node.call( this, coords );

    // cache values for next execution
    this.addChild( fromCache ? (atomCache ? atomCache : atomCache = getMolecule()) : getMolecule() );
  }

  return inherit( Node, H2OMolecule );
} );