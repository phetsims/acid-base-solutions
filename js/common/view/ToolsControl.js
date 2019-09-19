// Copyright 2014-2017, University of Colorado Boulder

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
  const inherit = require( 'PHET_CORE/inherit' );
  const PHMeterNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHMeterNode' );
  const PHPaperNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHPaperNode' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  const ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );

  // images
  const lightBulbImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-icon.png' );

  /**
   * @param {Property.<ToolMode>} toolModeProperty
   * @param {Object} [options]
   * @constructor
   */
  function ToolsControl( toolModeProperty, options ) {

    options = _.extend( {
      orientation: 'horizontal',
      baseColor: 'white',
      spacing: 5,
      buttonContentXMargin: 9
    }, options );

    RadioButtonGroup.call( this, toolModeProperty, [
      { value: ToolMode.PH_METER, node: PHMeterNode.createIcon(), tandemName: 'phMeterRadioButton' },
      { value: ToolMode.PH_PAPER, node: PHPaperNode.createIcon( 8, 30 ), tandemName: 'phPaperRadioButton' },
      { value: ToolMode.CONDUCTIVITY, node: new Image( lightBulbImage ), tandemName: 'conductivityRadioButton' }
    ], options );
  }

  acidBaseSolutions.register( 'ToolsControl', ToolsControl );

  return inherit( RadioButtonGroup, ToolsControl );
} );