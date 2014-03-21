// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of test menu.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var Node = require( 'SCENERY/nodes/Node' ),
    inherit = require( 'PHET_CORE/inherit' ),
    AquaRadioButton = require( 'SUN/AquaRadioButton' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    HBox = require( 'SCENERY/nodes/HBox' ),
    VStrut = require( 'SUN/VStrut' ),
    Image = require( 'SCENERY/nodes/Image' ),
    TestModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/TestModes' );

  // strings
  var pHMeterString = require( 'string!ACID_BASE_SOLUTIONS/pHMeter' ),
    pHPaperString = require( 'string!ACID_BASE_SOLUTIONS/pHPaper' ),
    conductivityString = require( 'string!ACID_BASE_SOLUTIONS/conductivity' );

  // images
  var pHMeterImage = require( 'image!ACID_BASE_SOLUTIONS/pH-meter.png' ),
    pHPaperImage = require( 'image!ACID_BASE_SOLUTIONS/pH-paper.png' ),
    lightBulbImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb.png' );

  // constants
  var AQUA_RADIO_BUTTON_RADIUS = 7,
    FONT = new PhetFont( 12 );

  /*
   * value: value which will be assigned to model property after choosing radio button
   * text: description text for button
   * icon: icon for radio button
   */
  var radioButtonOptions = [
    {
      value: TestModes.PH_METER,
      text: pHMeterString,
      icon: new Image( pHMeterImage, {scale: 0.75} )
    },
    {
      value: TestModes.PH_PAPER,
      text: pHPaperString,
      icon: new Node( {children: [new VStrut( 10 ), new Image( pHPaperImage, {scale: 0.75, y: 6} )]} )
    },
    {
      value: TestModes.CONDUCTIVITY,
      text: conductivityString,
      icon: new Node( {children: [new VStrut( 25 ), new Image( lightBulbImage, {scale: 0.6, y: 4} )]} )
    }
  ];

  function TestsControl( testModesMenuModel, options ) {
    var self = this,
      testModeProperty = testModesMenuModel.testModeProperty;
    VBox.call( this, _.extend( {spacing: 4, align: 'left'}, options ) );

    // add options to menu
    radioButtonOptions.forEach( function( radioButtonOption ) {
      self.addChild( createRadioButton( testModeProperty, radioButtonOption ) );
    } );

    self.updateLayout();
  }

  var createRadioButton = function( property, options ) {
    return new AquaRadioButton( property, options.value, new HBox( {spacing: 5, children: [
      new Text( options.text, {font: FONT} ),
      options.icon
    ]} ), {radius: AQUA_RADIO_BUTTON_RADIUS} );
  };

  return inherit( VBox, TestsControl );
} );