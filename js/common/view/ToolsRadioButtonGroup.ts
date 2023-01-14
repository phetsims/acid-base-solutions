// Copyright 2014-2023, University of Colorado Boulder

/**
 * Radio buttons for selecting between a set of mutually-exclusive tools.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { Image } from '../../../../scenery/js/imports.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import lightBulbIcon_png from '../../../images/lightBulbIcon_png.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import { ToolMode } from './ToolMode.js';
import PHMeterNode from './PHMeterNode.js';
import PHPaperNode from './PHPaperNode.js';

export default class ToolsRadioButtonGroup extends RectangularRadioButtonGroup<ToolMode> {

  public constructor( toolModeProperty: StringUnionProperty<ToolMode>, tandem: Tandem ) {

    const items: RectangularRadioButtonGroupItem<ToolMode>[] = [
      {
        value: 'pHMeter',
        createNode: () => PHMeterNode.createIcon(),
        tandemName: `phMeter${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
      },
      {
        value: 'pHPaper',
        createNode: () => PHPaperNode.createIcon( 8, 30 ),
        tandemName: `phPaper${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
      },
      {
        value: 'conductivity',
        createNode: () => new Image( lightBulbIcon_png ),
        tandemName: `conductivity${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
      }
    ];

    super( toolModeProperty, items, {
      orientation: 'horizontal',
      spacing: 5,
      radioButtonOptions: {
        baseColor: 'white',
        xMargin: 9
      },
      tandem: tandem
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

acidBaseSolutions.register( 'ToolsRadioButtonGroup', ToolsRadioButtonGroup );