// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for OH molecule.
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
  var COLOR_OH = require( 'ACID_BASE_SOLUTIONS/model/Constants/MoleculesColors' ).OH;

  var atomCache, getMolecule = function() {
    return new Node( {children: [
      new Atom( 4, COLOR_OH, {x: 8, y: -3} ),
      new Atom( 7, COLOR_OH, {x: 0, y: 0} )
    ]} );
  };

  function OHMolecule( options ) {
    options = _.extend( { fromCache: false }, options );
    Node.call( this, options );

    // cache values for next execution
    this.addChild( options.fromCache ? (atomCache ? atomCache : atomCache = getMolecule()) : getMolecule() );
  }

  return inherit( Node, OHMolecule );
} );