// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control for selecting between a set of mutually-exclusive tools.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var Image = require( 'SCENERY/nodes/Image' );
  var InOutRadioButton = require( 'SUN/InOutRadioButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PHPaperNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHPaperNode' );
  var ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VStrut = require( 'SUN/VStrut' );

  // images
  var lightBulbImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-icon.png' );
  var pHMeterImage = require( 'image!ACID_BASE_SOLUTIONS/pH-meter-icon.png' );

  // constants
  var MIN_BUTTON_WIDTH = 40;
  var ICON_OPTIONS = { scale: 0.75 };
  var RADIO_BUTTON_OPTIONS = {
    cornerRadius: 8,
    shadowFill: 'rgba(0,0,0,0.5)'
  };

  // Creates a radio-button icons that has a min size
  var createIcon = function( imageNode, minWidth, minHeight ) {
    var hStrut = new HStrut( minWidth );
    var vStrut = new VStrut( minHeight );
    imageNode.centerX = hStrut.centerX;
    imageNode.centerY = vStrut.centerY;
    return new Node( { children: [ hStrut, vStrut, imageNode ] } );
  };

  /**
   * @param {Property<ToolMode>} toolModeProperty
   * @param {*} options
   * @constructor
   */
  function ToolsControl( toolModeProperty, options ) {

    options = _.extend( {
      align: 'left',
      spacing: 4
    }, options );

    var pHMeterNode = new Image( pHMeterImage, ICON_OPTIONS );
    var pHPaperNode = PHPaperNode.createIcon( 8, 30 );
    var lightBulbNode = new Image( lightBulbImage, ICON_OPTIONS );

    // determine uniform size for buttons, in case icons have different sizes
    var minWidth = Math.max( MIN_BUTTON_WIDTH, Math.max( pHMeterNode.width, Math.max( pHPaperNode.width, lightBulbNode.width ) ) );
    var minHeight = Math.max( pHMeterNode.height, Math.max( pHPaperNode.height, lightBulbNode.height ) );

    options.children = [
      new HBox( {
        children: [
          new InOutRadioButton( toolModeProperty, ToolMode.PH_METER, createIcon( pHMeterNode, minWidth, minHeight ), RADIO_BUTTON_OPTIONS ),
          new InOutRadioButton( toolModeProperty, ToolMode.PH_PAPER, createIcon( pHPaperNode, minWidth, minHeight ), RADIO_BUTTON_OPTIONS ),
          new InOutRadioButton( toolModeProperty, ToolMode.CONDUCTIVITY, createIcon( lightBulbNode, minWidth, minHeight ), RADIO_BUTTON_OPTIONS )
        ]
      } )
    ];

    VBox.call( this, options );
  }

  return inherit( VBox, ToolsControl );
} );