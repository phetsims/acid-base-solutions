// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for MOH molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var MoleculeColors = require( 'ACID_BASE_SOLUTIONS/common/MoleculeColors' );
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    AtomNode = require( 'ACID_BASE_SOLUTIONS/common/view/molecules/AtomNode' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // constants
  var FONT = new PhetFont( 8 );

  var getMolecule = function() {
    return new Node( {children: [
      // add M ion
      new AtomNode( 6, MoleculeColors.MOH, {x: 0, y: 0} ),
      new Text( '+', {centerX: 0, centerY: 8.5, font: FONT} ),
      // add OH ion
      new AtomNode( 7, MoleculeColors.MOH, {x: 15, y: 0} ),
      new AtomNode( 4, MoleculeColors.MOH, {x: 22, y: -4} ),
      new Text( '-', {centerX: 15, centerY: 8.5, font: FONT} )
    ]} );
  }, atomCache;

  function MOHMolecule( options ) {
    options = _.extend( { fromCache: false }, options );
    Node.call( this, options );

    // cache values for next execution
    this.addChild( options.fromCache ? (atomCache ? atomCache : atomCache = getMolecule()) : getMolecule() );
  }

  return inherit( Node, MOHMolecule );
} );