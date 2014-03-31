// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for H2O molecule.
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

  function H2OMolecule( options ) {
    Node.call( this, options );
    this.addChild( new Node( {children: [
      new AtomNode( 4, MoleculeColors.H2O, {x: 0, y: -9} ),
      new AtomNode( 7, MoleculeColors.H2O, {x: 0, y: 0} ),
      new AtomNode( 4, MoleculeColors.H2O, {x: -6, y: 5} )
    ]} ) );
  }

  return inherit( Node, H2OMolecule );
} );