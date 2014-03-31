// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for H2O molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var MoleculeColors = require( 'ACID_BASE_SOLUTIONS/common/MoleculeColors' );
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    AtomNode = require( 'ACID_BASE_SOLUTIONS/common/view/molecules/AtomNode' );

  var atomCache, getMolecule = function() {
    return new Node( {children: [
      new AtomNode( 4, MoleculeColors.H2O, {x: 0, y: -9} ),
      new AtomNode( 7, MoleculeColors.H2O, {x: 0, y: 0} ),
      new AtomNode( 4, MoleculeColors.H2O, {x: -6, y: 5} )
    ]} );
  };

  function H2OMolecule( options ) {
    options = _.extend( { fromCache: false }, options );
    Node.call( this, options );

    // cache values for next execution
    this.addChild( options.fromCache ? (atomCache ? atomCache : atomCache = getMolecule()) : getMolecule() );
  }

  return inherit( Node, H2OMolecule );
} );