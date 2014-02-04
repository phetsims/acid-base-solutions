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
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' );

  function H2OMolecule( model, coords ) {
    var H2O_COLOR = model.MOLECULES_COLORS.H2O;
    Node.call( this, coords );

    this.addChild( new Atom( {x: 0, y: -9}, 4, H2O_COLOR ) );
    this.addChild( new Atom( {x: 0, y: 0}, 7, H2O_COLOR ) );
    this.addChild( new Atom( {x: -6, y: 5}, 4, H2O_COLOR ) );
  }

  return inherit( Node, H2OMolecule );
} );