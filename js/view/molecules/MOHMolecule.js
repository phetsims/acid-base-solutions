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

  function MOHMolecule( model, coords ) {
    var NEUTRAL_COLOR = model.MOLECULES_COLORS.MOH; // gray
    Node.call( this, coords );

    // add M ion
    this.addChild( new Atom( {x: 0, y: 0}, 6, NEUTRAL_COLOR ) );
    this.addChild( new Text( '+', {centerX: 0, centerY: 8.5, font: FONT} ) );

    // add OH ion
    this.addChild( new Atom( {x: 15, y: 0}, 7, NEUTRAL_COLOR ) );
    this.addChild( new Atom( {x: 22, y: -4}, 4, NEUTRAL_COLOR ) );
    this.addChild( new Text( '-', {centerX: 15, centerY: 8.5, font: FONT} ) );
  }

  return inherit( Node, MOHMolecule );
} );