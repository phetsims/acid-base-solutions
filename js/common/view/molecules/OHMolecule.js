// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for OH molecule.
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

  function OHMolecule( options ) {
    Node.call( this, options );
    this.addChild( new Node( {children: [
      new AtomNode( 4, MoleculeColors.OH, {x: 8, y: -3} ),
      new AtomNode( 7, MoleculeColors.OH, {x: 0, y: 0} )
    ]} ) );
  }

  return inherit( Node, OHMolecule );
} );