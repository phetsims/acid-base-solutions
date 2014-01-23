// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for H3O molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' ),
    Color = require( 'SCENERY/util/Color' );

  function H3OMolecule( coords ) {
    var H3O_COLOR = new Color( 255, 85, 0 );
    Node.call( this, coords );

    this.addChild( new Atom( {x: 3, y: -7.5}, 4, H3O_COLOR ) );
    this.addChild( new Atom( {x: 3, y: 7.5}, 4, H3O_COLOR ) );
    this.addChild( new Atom( {x: 0, y: 0}, 7, H3O_COLOR ) );
    this.addChild( new Atom( {x: -8, y: 0}, 4, H3O_COLOR ) );
  }

  return inherit( Node, H3OMolecule );
} );