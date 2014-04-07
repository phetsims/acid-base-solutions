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
  var PHMeterNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHMeterNode' );
  var PHPaperNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHPaperNode' );
  var ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  var VStrut = require( 'SUN/VStrut' );

  // images
  var lightBulbImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-icon.png' );

  // constants
  var MIN_BUTTON_WIDTH = 40;
  var RADIO_BUTTON_OPTIONS = {
    //TODO shadow and motion offsets rely on buggy behavior of InOutRadioButton, see sun#50
    shadowXOffset: 2,
    shadowYOffset: 2,
    motionXOffset: 2,
    motionYOffset: 2,
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
      spacing: 5
    }, options );

    var pHMeterNode = PHMeterNode.createIcon();
    var pHPaperNode = PHPaperNode.createIcon( 8, 30 );
    var lightBulbNode = new Image( lightBulbImage );

    // determine uniform size for buttons, in case icons have different sizes
    var minWidth = Math.max( MIN_BUTTON_WIDTH, Math.max( pHMeterNode.width, Math.max( pHPaperNode.width, lightBulbNode.width ) ) );
    var minHeight = Math.max( pHMeterNode.height, Math.max( pHPaperNode.height, lightBulbNode.height ) );

    options.children = [
      new InOutRadioButton( toolModeProperty, ToolMode.PH_METER, createIcon( pHMeterNode, minWidth, minHeight ), RADIO_BUTTON_OPTIONS ),
      new InOutRadioButton( toolModeProperty, ToolMode.PH_PAPER, createIcon( pHPaperNode, minWidth, minHeight ), RADIO_BUTTON_OPTIONS ),
      new InOutRadioButton( toolModeProperty, ToolMode.CONDUCTIVITY, createIcon( lightBulbNode, minWidth, minHeight ), RADIO_BUTTON_OPTIONS )
    ];

    HBox.call( this, options );
  }

  return inherit( HBox, ToolsControl );
} );