// Copyright 2014-2019, University of Colorado Boulder

/**
 * Control for selecting between a set of mutually-exclusive tools.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const Image = require( 'SCENERY/nodes/Image' );
  const merge = require( 'PHET_CORE/merge' );
  const PHMeterNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHMeterNode' );
  const PHPaperNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHPaperNode' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  const ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );

  // images
  const lightBulbImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-icon.png' );

  class ToolsControl extends RadioButtonGroup {

    /**
     * @param {Property.<ToolMode>} toolModeProperty
     * @param {Object} [options]
     */
    constructor( toolModeProperty, options ) {

      options = merge( {
        orientation: 'horizontal',
        baseColor: 'white',
        spacing: 5,
        buttonContentXMargin: 9
      }, options );

      super( toolModeProperty, [
        { value: ToolMode.PH_METER, node: PHMeterNode.createIcon(), tandemName: 'phMeterRadioButton' },
        { value: ToolMode.PH_PAPER, node: PHPaperNode.createIcon( 8, 30 ), tandemName: 'phPaperRadioButton' },
        { value: ToolMode.CONDUCTIVITY, node: new Image( lightBulbImage ), tandemName: 'conductivityRadioButton' }
      ], options );
    }
  }

  return acidBaseSolutions.register( 'ToolsControl', ToolsControl );
} );