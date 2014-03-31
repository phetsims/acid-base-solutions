// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for BH molecule.
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

  function BHMolecule( options ) {
    Node.call( this, options );
    this.addChild( new Node( {children: [
      new AtomNode( 4, MoleculeColors.BH, {x: -6, y: -6} ),
      new AtomNode( 7, MoleculeColors.BH, {x: 0, y: 0} )
    ]} ) );
  }

  return inherit( Node, BHMolecule );
} );