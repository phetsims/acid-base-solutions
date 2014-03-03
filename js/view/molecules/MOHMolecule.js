// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for MOH molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONT = new PhetFont( 8 ),
    COLOR_MOH = require( 'model/Constants/MoleculesColors' ).MOH; // gray

  var getMolecule = function() {
    return new Node( {children: [
      // add M ion
      new Atom( 6, COLOR_MOH, {x: 0, y: 0} ),
      new Text( '+', {centerX: 0, centerY: 8.5, font: FONT} ),
      // add OH ion
      new Atom( 7, COLOR_MOH, {x: 15, y: 0} ),
      new Atom( 4, COLOR_MOH, {x: 22, y: -4} ),
      new Text( '-', {centerX: 15, centerY: 8.5, font: FONT} )
    ]} );
  }, atomCache;

  function MOHMolecule( coords, fromCache ) {
    Node.call( this, coords );

    // cache values for next execution
    this.addChild( fromCache ? (atomCache ? atomCache : atomCache = getMolecule()) : getMolecule() );
  }

  return inherit( Node, MOHMolecule );
} );