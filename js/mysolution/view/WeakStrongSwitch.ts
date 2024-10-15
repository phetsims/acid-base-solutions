// Copyright 2023-2024, University of Colorado Boulder

/**
 * WeakStrongSwitch is the ABSwitch that switches the solution between 'Weak' and 'Strong'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import { AlignBox, AlignGroup, Text, TextOptions } from '../../../../scenery/js/imports.js';
import ABSwitch, { ABSwitchOptions } from '../../../../sun/js/ABSwitch.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../../common/ABSConstants.js';

export default class WeakStrongSwitch extends ABSwitch<boolean> {

  public constructor( property: Property<boolean>, tandem: Tandem ) {

    const options = combineOptions<ABSwitchOptions>( {
      tandem: tandem
    }, ABSConstants.AB_SWITCH_OPTIONS );

    // To give both labels the same effective width, and keep the toggle switch centered
    const alignGroup = new AlignGroup();

    const textOptions: TextOptions = {
      font: ABSConstants.CONTROL_FONT,
      maxWidth: 50
    };

    // Weak
    const weakNode = new AlignBox( new Text( AcidBaseSolutionsStrings.weakStringProperty, textOptions ), {
      group: alignGroup,
      xAlign: 'right'
    } );

    // Strong
    const strongNode = new AlignBox( new Text( AcidBaseSolutionsStrings.strongStringProperty, textOptions ), {
      group: alignGroup,
      xAlign: 'left'
    } );

    super( property, true, weakNode, false, strongNode, options );
  }
}

acidBaseSolutions.register( 'WeakStrongSwitch', WeakStrongSwitch );