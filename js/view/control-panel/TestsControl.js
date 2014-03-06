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
    VStrut = require( 'SUN/VStrut' ),
    Image = require( 'SCENERY/nodes/Image' ),
    TestModes = require( 'model/TestModes' ),

  // strings
    pHMeterString = require( 'string!ACID_BASE_SOLUTIONS/pHMeter' ),
    pHPaperString = require( 'string!ACID_BASE_SOLUTIONS/pHPaper' ),
    conductivityString = require( 'string!ACID_BASE_SOLUTIONS/conductivity' ),

  // images
    pHMeterImage = require( 'image!ACID_BASE_SOLUTIONS/pH-meter.png' ),
    pHPaperImage = require( 'image!ACID_BASE_SOLUTIONS/pH-paper.png' ),
    lightBulbImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb.png' );

  function TestsControl( model, options ) {
    var vBox = new VBox( {spacing: 4, align: 'left'} );
    Node.call( this, options );

    var menuOptions = [
      {text: pHMeterString, value: TestModes.PH_METER, icon: new Image( pHMeterImage, {scale: 0.75} )},
      {text: pHPaperString, value: TestModes.PH_PAPER, icon: new Node( {children: [new VStrut( 10 ), new Image( pHPaperImage, {scale: 0.75, y: 6} )]} )},
      {text: conductivityString, value: TestModes.CONDUCTIVITY, icon: new Node( {children: [new VStrut( 25 ), new Image( lightBulbImage, {scale: 0.6, y: 4} )]} )}
    ];

    // add options to menu
    for ( var i = 0; i < menuOptions.length; i++ ) {
      vBox.addChild( new AquaRadioButton( model.property( 'testMode' ), menuOptions[i].value, new HBox( {spacing: 5, children: [
        new Text( menuOptions[i].text, {font: FONT} ),
        menuOptions[i].icon
      ]} ), {radius: 7} ) );
    }

    this.addChild( vBox );
    vBox.updateLayout();
  }

  return inherit( Node, TestsControl );
} );