// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for MOH molecule.
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
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );

  // constants
  var FONT = new PhetFont( 8 );

  function MOHMolecule( options ) {
    Node.call( this, options );
    this.addChild( new Node( {children: [
      // add M ion
      new AtomNode( 6, MoleculeColors.MOH, {x: 0, y: 0} ),
      new Text( '+', {centerX: 0, centerY: 8.5, font: FONT} ),
      // add OH ion
      new AtomNode( 7, MoleculeColors.MOH, {x: 15, y: 0} ),
      new AtomNode( 4, MoleculeColors.MOH, {x: 22, y: -4} ),
      new Text( '-', {centerX: 15, centerY: 8.5, font: FONT} )
    ]} ) );
  }

  return inherit( Node, MOHMolecule );
} );