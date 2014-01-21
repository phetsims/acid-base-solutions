// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of solution menu.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' ),
    inherit = require( 'PHET_CORE/inherit' ),
    AquaRadioButton = require( 'SUN/AquaRadioButton' ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    HBox = require( 'SCENERY/nodes/HBox' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONT = new PhetFont( 12 ),

  // strings
    acidString = require( 'string!ACID_BASE_SOLUTIONS/acid' ),
    baseString = require( 'string!ACID_BASE_SOLUTIONS/base' );

  function Solution( model, options ) {
    var vBox = new VBox( {spacing: 5} );
    Node.call( this, options );

    // add type radio buttons menu
    vBox.addChild( new HBox( {spacing: 5, children: [
      new AquaRadioButton( model.property( 'isTypeAcid' ), true, new Text( acidString, {font: FONT} ), {radius: 7} ),
      new AquaRadioButton( model.property( 'isTypeAcid' ), false, new Text( baseString, {font: FONT} ), {radius: 7} )
    ]} ) );

    this.addChild( vBox );
    vBox.updateLayout();
  }

  return inherit( Node, Solution );
} );