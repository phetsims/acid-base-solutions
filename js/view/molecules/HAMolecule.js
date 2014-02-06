// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for HA molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' );

  var atomCache, getMolecule = function( color ) {
    return new Node( {children: [
      new Atom( {x: 0, y: 0}, 7, color ),
      new Atom( {x: -8, y: -1}, 4, color )
    ]} );
  };

  function HAMolecule( model, coords, fromCache ) {
    var NEUTRAL_COLOR = model.MOLECULES_COLORS.HA;
    Node.call( this, coords );

    // cache values for next execution
    this.addChild( fromCache ? (atomCache ? atomCache : atomCache = getMolecule( NEUTRAL_COLOR )) : getMolecule( NEUTRAL_COLOR ) );
  }

  return inherit( Node, HAMolecule );
} );