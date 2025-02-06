// Copyright 2022-2024, University of Colorado Boulder

/**
 * AcidBaseSwitch is an ABSwitch that switches the solution between 'Acid' and 'Base'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import { TextOptions } from '../../../../scenery/js/nodes/Text.js';
import ABSwitch, { ABSwitchOptions } from '../../../../sun/js/ABSwitch.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../../common/ABSConstants.js';

export default class AcidBaseSwitch extends ABSwitch<boolean> {

  public constructor( property: Property<boolean>, tandem: Tandem ) {

    const options = combineOptions<ABSwitchOptions>( {
      tandem: tandem
    }, ABSConstants.AB_SWITCH_OPTIONS );

    const textOptions: TextOptions = {
      font: ABSConstants.CONTROL_FONT,
      maxWidth: 50
    };

    // To give both labels the same effective width, and keep the toggle switch centered
    const alignGroup = new AlignGroup();

    // Acid
    const acidNode = new AlignBox( new Text( AcidBaseSolutionsStrings.acidStringProperty, textOptions ), {
      group: alignGroup,
      xAlign: 'right'
    } );

    // Base
    const baseNode = new AlignBox( new Text( AcidBaseSolutionsStrings.baseStringProperty, textOptions ), {
      group: alignGroup,
      xAlign: 'left'
    } );

    super( property, true, acidNode, false, baseNode, options );
  }
}

acidBaseSolutions.register( 'AcidBaseSwitch', AcidBaseSwitch );