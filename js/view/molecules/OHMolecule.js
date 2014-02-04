// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for OH molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' );

  function OHMolecule( model, coords ) {
    var OH_MINUS_COLOR = model.MOLECULES_COLORS.OH;
    Node.call( this, coords );

    this.addChild( new Atom( {x: 8, y: -3}, 4, OH_MINUS_COLOR ) );
    this.addChild( new Atom( {x: 0, y: 0}, 7, OH_MINUS_COLOR ) );
  }

  return inherit( Node, OHMolecule );
} );