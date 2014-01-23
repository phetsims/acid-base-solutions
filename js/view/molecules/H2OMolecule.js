// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for H2O molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' ),
    Color = require( 'SCENERY/util/Color' );

  function H2OMolecule( coords ) {
    var AQUEOUS_SOLUTION = new Color( 193, 222, 227, 180 ), // transparent light blue
      H2O_FACTOR = 0.85,
      H2O_COLOR = new Color( AQUEOUS_SOLUTION.getRed() * H2O_FACTOR, AQUEOUS_SOLUTION.getGreen() * H2O_FACTOR, AQUEOUS_SOLUTION.getBlue() * H2O_FACTOR );
    Node.call( this, coords );

    this.addChild( new Atom( {x: 0, y: -9}, 4, H2O_COLOR ) );
    this.addChild( new Atom( {x: 0, y: 0}, 7, H2O_COLOR ) );
    this.addChild( new Atom( {x: -6, y: 5}, 4, H2O_COLOR ) );
  }

  return inherit( Node, H2OMolecule );
} );