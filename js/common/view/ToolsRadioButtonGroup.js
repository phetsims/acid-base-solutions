// Copyright 2014-2022, University of Colorado Boulder

/**
 * Radio buttons for selecting between a set of mutually-exclusive tools.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Image } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import lightBulbIcon_png from '../../../images/lightBulbIcon_png.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ToolMode from '../enum/ToolMode.js';
import PHMeterNode from './PHMeterNode.js';
import PHPaperNode from './PHPaperNode.js';

class ToolsRadioButtonGroup extends RectangularRadioButtonGroup {

  /**
   * @param {EnumerationDeprecatedProperty.<ToolMode>} toolModeProperty
   * @param {Object} [options]
   */
  constructor( toolModeProperty, options ) {

    options = merge( {
      orientation: 'horizontal',
      spacing: 5,
      radioButtonOptions: {
        baseColor: 'white',
        xMargin: 9
      }
    }, options );

    super( toolModeProperty, [
      { value: ToolMode.PH_METER, node: PHMeterNode.createIcon(), tandemName: 'phMeterRadioButton' },
      { value: ToolMode.PH_PAPER, node: PHPaperNode.createIcon( 8, 30 ), tandemName: 'phPaperRadioButton' },
      { value: ToolMode.CONDUCTIVITY, node: new Image( lightBulbIcon_png ), tandemName: 'conductivityRadioButton' }
    ], options );
  }
}

acidBaseSolutions.register( 'ToolsRadioButtonGroup', ToolsRadioButtonGroup );
export default ToolsRadioButtonGroup;