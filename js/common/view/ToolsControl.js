// Copyright 2014-2020, University of Colorado Boulder

/**
 * Control for selecting between a set of mutually-exclusive tools.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import RadioButtonGroup from '../../../../sun/js/buttons/RadioButtonGroup.js';
import lightBulbImage from '../../../images/light-bulb-icon_png.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ToolMode from '../enum/ToolMode.js';
import PHMeterNode from './PHMeterNode.js';
import PHPaperNode from './PHPaperNode.js';

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

acidBaseSolutions.register( 'ToolsControl', ToolsControl );
export default ToolsControl;