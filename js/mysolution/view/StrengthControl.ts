// Copyright 2022, University of Colorado Boulder

/**
 * StrengthControl is the control for 'Strength' in MySolutionPanel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Text, VBox } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import StrengthSlider from './StrengthSlider.js';
import ABSConstants from '../../common/ABSConstants.js';
import ABSwitch, { ABSwitchOptions } from '../../../../sun/js/ABSwitch.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { WeakStrongType } from './MySolutionPanel.js';

export default class StrengthControl extends VBox {

  public constructor( strengthProperty: Property<number>,
                      weakStrongProperty: StringUnionProperty<WeakStrongType>,
                      tandem: Tandem ) {

    const titleText = new Text( AcidBaseSolutionsStrings.strengthStringProperty, {
      font: ABSConstants.SUBTITLE_FONT,
      maxWidth: 180, // determined empirically
      layoutOptions: { align: 'left' },
      tandem: tandem.createTandem( 'titleText' )
    } );

    // Weak/Strong switch
    const weakStrongSwitch = new ABSwitch( weakStrongProperty,
      'weak', new Text( AcidBaseSolutionsStrings.weakStringProperty, ABSConstants.AB_SWITCH_TEXT_OPTIONS ),
      'strong', new Text( AcidBaseSolutionsStrings.strongStringProperty, ABSConstants.AB_SWITCH_TEXT_OPTIONS ),
      combineOptions<ABSwitchOptions>( {}, ABSConstants.AB_SWITCH_OPTIONS, {
        tandem: tandem.createTandem( 'weakStrongSwitch' )
      } ) );

    // Strength slider
    const slider = new StrengthSlider( strengthProperty, ABSConstants.WEAK_STRENGTH_RANGE, weakStrongProperty,
      tandem.createTandem( 'slider' ) );

    super( {
      children: [
        titleText,
        weakStrongSwitch,
        slider
      ],
      spacing: 6,
      layoutOptions: { stretch: true }, // so that titleText will be left-aligned in MySolutionsPanel
      excludeInvisibleChildrenFromBounds: false,
      tandem: tandem
    } );
  }
}

acidBaseSolutions.register( 'StrengthControl', StrengthControl );