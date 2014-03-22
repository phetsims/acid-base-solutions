// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for M molecule.
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
  var COLOR_M = require( 'ACID_BASE_SOLUTIONS/model/Constants/MoleculesColors' ).M;

  var atomCache, getMolecule = function() {
    return new Atom( 7, COLOR_M );
  };

  function MMolecule( options ) {
    options = _.extend( { fromCache: false }, options );
    Node.call( this, options );

    // cache values for next execution
    this.addChild( options.fromCache ? (atomCache ? atomCache : atomCache = getMolecule()) : getMolecule() );
  }

  return inherit( Node, MMolecule );
} );