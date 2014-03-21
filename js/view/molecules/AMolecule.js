// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for A molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' );

  // constants
  var COLOR_A = require( 'ACID_BASE_SOLUTIONS/model/Constants/MoleculesColors' ).A;

  var atomCache, getMolecule = function() {
    return new Atom( 7, COLOR_A );
  };

  function AMolecule( coords, fromCache ) {
    Node.call( this, coords );

    // cache values for next execution
    this.addChild( fromCache ? (atomCache ? atomCache : atomCache = getMolecule()) : getMolecule() );
  }

  return inherit( Node, AMolecule );
} );