// Copyright 2014-2023, University of Colorado Boulder

/**
 * ToolsRadioButtonGroup is a group of radio buttons for selecting between a set of mutually-exclusive tools.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { Image } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import lightBulbIcon_png from '../../../images/lightBulbIcon_png.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import { ToolMode } from './ToolMode.js';
import PHMeterNode from './PHMeterNode.js';
import PHPaperNode from './PHPaperNode.js';
import ABSColors from '../ABSColors.js';

export default class ToolsRadioButtonGroup extends RectangularRadioButtonGroup<ToolMode> {

  public constructor( toolModeProperty: StringUnionProperty<ToolMode>, tandem: Tandem ) {

    const items: RectangularRadioButtonGroupItem<ToolMode>[] = [
      {
        value: 'pHMeter',
        createNode: () => PHMeterNode.createIcon(),
        tandemName: 'phMeterRadioButton'
      },
      {
        value: 'pHPaper',
        createNode: () => PHPaperNode.createIcon( 8, 30 ),
        tandemName: 'phPaperRadioButton'
      },
      {
        value: 'conductivityTester',
        createNode: () => new Image( lightBulbIcon_png ),
        tandemName: 'conductivityTesterRadioButton'
      }
    ];

    super( toolModeProperty, items, {
      orientation: 'horizontal',
      spacing: 5,
      radioButtonOptions: {
        baseColor: ABSColors.toolRadioButtonFillProperty,
        xMargin: 9
      },
      isDisposable: false,
      tandem: tandem
    } );
  }
}

acidBaseSolutions.register( 'ToolsRadioButtonGroup', ToolsRadioButtonGroup );