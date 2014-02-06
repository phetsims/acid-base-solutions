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
    FONT = new PhetFont( 8 );

  var getMolecule = function( color ) {
    return new Node( {children: [
      // add M ion
      new Atom( {x: 0, y: 0}, 6, color ),
      new Text( '+', {centerX: 0, centerY: 8.5, font: FONT} ),
      // add OH ion
      new Atom( {x: 15, y: 0}, 7, color ),
      new Atom( {x: 22, y: -4}, 4, color ),
      new Text( '-', {centerX: 15, centerY: 8.5, font: FONT} )
    ]} );
  }, atomCache;

  function MOHMolecule( model, coords, fromCache ) {
    var NEUTRAL_COLOR = model.MOLECULES_COLORS.MOH; // gray
    Node.call( this, coords );

    // cache values for next execution
    this.addChild( fromCache ? (atomCache ? atomCache : atomCache = getMolecule( NEUTRAL_COLOR )) : getMolecule( NEUTRAL_COLOR ) );
  }

  return inherit( Node, MOHMolecule );
} );