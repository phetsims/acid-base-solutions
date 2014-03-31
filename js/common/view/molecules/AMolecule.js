// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for A molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var AtomNode = require( 'ACID_BASE_SOLUTIONS/common/view/molecules/AtomNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeColors = require( 'ACID_BASE_SOLUTIONS/common/MoleculeColors' );
  var Node = require( 'SCENERY/nodes/Node' );

  function AMolecule( options ) {
    Node.call( this, options );
    this.addChild( new AtomNode( 7, MoleculeColors.A ) );
  }

  return inherit( Node, AMolecule );
} );