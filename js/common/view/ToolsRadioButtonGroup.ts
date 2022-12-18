// Copyright 2014-2022, University of Colorado Boulder

/**
 * Radio buttons for selecting between a set of mutually-exclusive tools.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Image } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import lightBulbIcon_png from '../../../images/lightBulbIcon_png.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import { ToolMode } from '../enum/ToolMode.js';
import PHMeterNode from './PHMeterNode.js';
import PHPaperNode from './PHPaperNode.js';

type SelfOptions = EmptySelfOptions;

type ToolsRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;

export default class ToolsRadioButtonGroup extends RectangularRadioButtonGroup<ToolMode> {

  public constructor( toolModeProperty: StringUnionProperty<ToolMode>, providedOptions?: ToolsRadioButtonGroupOptions ) {

    const options = optionize<ToolsRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {

      // RectangularRadioButtonGroupOptions
      orientation: 'horizontal',
      spacing: 5,
      radioButtonOptions: {
        baseColor: 'white',
        xMargin: 9
      }
    }, providedOptions );

    super( toolModeProperty, [
      { value: 'pHMeter', createNode: tandem => PHMeterNode.createIcon(), tandemName: 'phMeterRadioButton' },
      { value: 'pHPaper', createNode: tandem => PHPaperNode.createIcon( 8, 30 ), tandemName: 'phPaperRadioButton' },
      { value: 'conductivity', createNode: tandem => new Image( lightBulbIcon_png ), tandemName: 'conductivityRadioButton' }
    ], options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

acidBaseSolutions.register( 'ToolsRadioButtonGroup', ToolsRadioButtonGroup );