// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for BH molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' ),
    Color = require( 'SCENERY/util/Color' );

  function BHMolecule( coords ) {
    var BH_PLUS_COLOR = new Color( 255, 170, 0 );
    Node.call( this, coords );

    this.addChild( new Atom( {x: -6, y: -6}, 4, BH_PLUS_COLOR ) );
    this.addChild( new Atom( {x: 0, y: 0}, 7, BH_PLUS_COLOR ) );
  }

  return inherit( Node, BHMolecule );
} );