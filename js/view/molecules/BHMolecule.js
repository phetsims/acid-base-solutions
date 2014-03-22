// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for BH molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' );

  // constants
  var COLOR_BH = require( 'ACID_BASE_SOLUTIONS/model/Constants/MoleculesColors' ).BH;

  var atomCache, getMolecule = function() {
    return new Node( {children: [
      new Atom( 4, COLOR_BH, {x: -6, y: -6} ),
      new Atom( 7, COLOR_BH, {x: 0, y: 0} )
    ]} );
  };

  function BHMolecule( options ) {
    options = _.extend( { fromCache: false }, options );
    Node.call( this, options );

    // cache values for next execution
    this.addChild( options.fromCache ? (atomCache ? atomCache : atomCache = getMolecule()) : getMolecule() );
  }

  return inherit( Node, BHMolecule );
} );