// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of test menu.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    AquaRadioButton = require( 'SUN/AquaRadioButton' ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    Image = require( 'SCENERY/nodes/Image' ),
    TestModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/TestModes' );

  // images
  var pHMeterImage = require( 'image!ACID_BASE_SOLUTIONS/pH-meter.png' );
  var pHPaperImage = require( 'image!ACID_BASE_SOLUTIONS/pH-paper.png' );
  var lightBulbImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb.png' );

  function TestsControl( testModesMenuModel, options ) {

    options = _.extend( {
      spacing: 4,
      align: 'left'
    }, options );

    options.children = [
      new AquaRadioButton( testModesMenuModel.testModeProperty, TestModes.PH_METER, new Image( pHMeterImage, {scale: 0.75} ), {radius: 7} ),
      new AquaRadioButton( testModesMenuModel.testModeProperty, TestModes.PH_PAPER, new Image( pHPaperImage, {scale: 0.75} ), {radius: 7} ),
      new AquaRadioButton( testModesMenuModel.testModeProperty, TestModes.CONDUCTIVITY, new Image( lightBulbImage, {scale: 0.75} ), {radius: 7} )
    ];

    VBox.call( this, options );
  }

  return inherit( VBox, TestsControl );
} );