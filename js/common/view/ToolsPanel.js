// Copyright 2002-2013, University of Colorado Boulder

//TODO this is not actually a Panel subtype
/**
 * 'Tools' control panel
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // images
  var lightBulbImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb.png' );
  var pHMeterImage = require( 'image!ACID_BASE_SOLUTIONS/pH-meter.png' );
  var pHPaperImage = require( 'image!ACID_BASE_SOLUTIONS/pH-paper.png' );

  // constants
  var ICON_OPTIONS = { scale: 0.75 };
  var RADIO_BUTTON_OPTIONS = { radius: 7 };

  /**
   * @param {Property<ToolMode>} toolModeProperty
   * @param {*} options
   * @constructor
   */
  function ToolsPanel( toolModeProperty, options ) {

    options = _.extend( {
      spacing: 4,
      align: 'left'
    }, options );

    options.children = [
      new AquaRadioButton( toolModeProperty, ToolMode.PH_METER, new Image( pHMeterImage, ICON_OPTIONS ), RADIO_BUTTON_OPTIONS ),
      new AquaRadioButton( toolModeProperty, ToolMode.PH_PAPER, new Image( pHPaperImage, ICON_OPTIONS ), RADIO_BUTTON_OPTIONS ),
      new AquaRadioButton( toolModeProperty, ToolMode.CONDUCTIVITY, new Image( lightBulbImage, ICON_OPTIONS ), RADIO_BUTTON_OPTIONS )
    ];

    VBox.call( this, options );
  }

  return inherit( VBox, ToolsPanel );
} );