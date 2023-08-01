// Copyright 2022-2023, University of Colorado Boulder

/**
 * StringSwitch is an ABSwitch that switches between string values, and is labeled with strings.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AlignBox, AlignGroup, Text, TextOptions } from '../../../../scenery/js/imports.js';
import ABSwitch, { ABSwitchOptions } from '../../../../sun/js/ABSwitch.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import Property from '../../../../axon/js/Property.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../../common/ABSConstants.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Tandem from '../../../../tandem/js/Tandem.js';

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

acidBaseSolutions.register( 'StringSwitch', AcidBaseSwitch );