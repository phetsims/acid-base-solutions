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
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' ),
    COLOR_HA = require( 'model/Constants/MoleculesColors' ).HA;

  var atomCache, getMolecule = function() {
    return new Node( {children: [
      new Atom( {x: 0, y: 0}, 7, COLOR_HA ),
      new Atom( {x: -8, y: -1}, 4, COLOR_HA )
    ]} );
  };

  function HAMolecule( coords, fromCache ) {
    Node.call( this, coords );

    // cache values for next execution
    this.addChild( fromCache ? (atomCache ? atomCache : atomCache = getMolecule()) : getMolecule() );
  }

  return inherit( Node, HAMolecule );
} );