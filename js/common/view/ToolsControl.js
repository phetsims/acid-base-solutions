// Copyright 2014-2015, University of Colorado Boulder

/**
 * Control for selecting between a set of mutually-exclusive tools.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PHMeterNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHMeterNode' );
  var PHPaperNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHPaperNode' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );

  // images
  var lightBulbImage = require( 'image!ACID_BASE_SOLUTIONS/light-bulb-icon.png' );

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
      { value: ToolMode.PH_METER, node: PHMeterNode.createIcon() },
      { value: ToolMode.PH_PAPER, node: PHPaperNode.createIcon( 8, 30 ) },
      { value: ToolMode.CONDUCTIVITY, node: new Image( lightBulbImage ) }
    ], options );
  }

  acidBaseSolutions.register( 'ToolsControl', ToolsControl );

  return inherit( RadioButtonGroup, ToolsControl );
} );