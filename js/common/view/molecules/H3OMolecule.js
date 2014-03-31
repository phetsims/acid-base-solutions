// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for H3O molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var MoleculeColors = require( 'ACID_BASE_SOLUTIONS/common/MoleculeColors' );
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Atom = require( 'ACID_BASE_SOLUTIONS/common/view/molecules/Atom' );

  var atomCache, getMolecule = function() {
    return new Node( {children: [
      new Atom( 4, MoleculeColors.H3O, {x: 3, y: -7.5} ),
      new Atom( 4, MoleculeColors.H3O, {x: 3, y: 7.5} ),
      new Atom( 7, MoleculeColors.H3O, {x: 0, y: 0} ),
      new Atom( 4, MoleculeColors.H3O, {x: -8, y: 0} )
    ]} );
  };

  function H3OMolecule( options ) {
    options = _.extend( { fromCache: false }, options );
    Node.call( this, options );

    // cache values for next execution
    this.addChild( options.fromCache ? (atomCache ? atomCache : atomCache = getMolecule()) : getMolecule() );
  }

  return inherit( Node, H3OMolecule );
} );