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
import Tandem from '../../../../tandem/js/Tandem.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { WeakStrongType } from './MySolutionPanel.js';
import StringSwitch, { StringSwitchOptions } from './StringSwitch.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';

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
    const weakStrongSwitch = new StringSwitch( weakStrongProperty,
      'weak', AcidBaseSolutionsStrings.weakStringProperty,
      'strong', AcidBaseSolutionsStrings.strongStringProperty,
      combineOptions<StringSwitchOptions>( {}, ABSConstants.STRING_SWITCH_OPTIONS, {
        tandem: tandem.createTandem( 'weakStrongSwitch' )
      } ) );

    // Strength slider
    const sliderWrapperTandem = tandem.createTandem( 'sliderWrapper' );
    const slider = new StrengthSlider( strengthProperty, ABSConstants.WEAK_STRENGTH_RANGE, weakStrongProperty,
      sliderWrapperTandem.createTandem( 'slider' ) );

    // Changing the strength to 'strong' typically hides the slider, but keeps the space for it in the panel.
    // This wrapper makes it possible for the client to independently control whether the slider is visible,
    // and the panel will shrink to fit.
    const sliderWrapper = new VBox( {
      children: [ slider ],
      excludeInvisibleChildrenFromBounds: false, // keep space in the panel when sliderWrapper.visible === false
      tandem: sliderWrapperTandem,
      phetioDocumentation: 'The sim controls whether slider is visible, and when it is not visible, leaves space ' +
                           'for it in the control panel. If you would like to control whether the slider is visible, ' +
                           'use sliderWrapper.visibleProperty.'
    } );

    super( {
      children: [
        titleText,
        weakStrongSwitch,
        sliderWrapper
      ],
      spacing: 6,
      layoutOptions: { stretch: true }, // so that titleText will be left-aligned in MySolutionsPanel
      tandem: tandem
    } );
  }
}

acidBaseSolutions.register( 'StrengthControl', StrengthControl );