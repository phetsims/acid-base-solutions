// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of test menu.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' ),
    inherit = require( 'PHET_CORE/inherit' ),
    AquaRadioButton = require( 'SUN/AquaRadioButton' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONT = new PhetFont( 12 ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    HBox = require( 'SCENERY/nodes/HBox' ),

  // strings
    pHMeterString = require( 'string!ACID_BASE_SOLUTIONS/pHMeter' ),
    pHPaperString = require( 'string!ACID_BASE_SOLUTIONS/pHPaper' ),
    conductivityString = require( 'string!ACID_BASE_SOLUTIONS/conductivity' );

  var menuOptions = [
    {text: pHMeterString},
    {text: pHPaperString},
    {text: conductivityString}
  ];

  function Tests( model, options ) {
    var vBox = new VBox( {spacing: 5, align: 'left'} );
    Node.call( this, options );

    // add options to menu
    for ( var i = 0; i < menuOptions.length; i++ ) {
      vBox.addChild( new HBox( {spacing: 5, children: [
        new AquaRadioButton( model.property( 'testMode' ), i, new Text( menuOptions[i].text, {font: FONT} ), {radius: 7} )
      ]} ) );
    }

    this.addChild( vBox );
    vBox.updateLayout();
  }

  return inherit( Node, Tests );
} );