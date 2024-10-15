// Copyright 2022-2024, University of Colorado Boulder

/**
 * StrengthControl is the control for 'Strength' used in MySolutionPanel.
 * For details on why NumberControl is not used here, see https://github.com/phetsims/acid-base-solutions/issues/185
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../../common/ABSConstants.js';
import StrengthSlider from './StrengthSlider.js';
import WeakStrongSwitch from './WeakStrongSwitch.js';

export default class StrengthControl extends VBox {

  public constructor( strengthProperty: Property<number>, isWeakProperty: Property<boolean>, tandem: Tandem ) {

    const titleText = new Text( AcidBaseSolutionsStrings.strengthStringProperty, {
      font: ABSConstants.SUBTITLE_FONT,
      maxWidth: 180, // determined empirically
      layoutOptions: { align: 'left' }
    } );

    // Weak/Strong switch
    const weakStrongSwitch = new WeakStrongSwitch( isWeakProperty, tandem.createTandem( 'weakStrongSwitch' ) );

    // Strength slider
    const sliderWrapperTandem = tandem.createTandem( 'sliderWrapper' );
    const slider = new StrengthSlider( strengthProperty, ABSConstants.WEAK_STRENGTH_RANGE, isWeakProperty,
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
                           'use sliderWrapper.visibleProperty.',
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    super( {
      children: [
        titleText,
        weakStrongSwitch,
        sliderWrapper
      ],
      spacing: 6,
      layoutOptions: { stretch: true }, // so that titleText will be left-aligned in MySolutionsPanel
      tandem: tandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );
  }
}

acidBaseSolutions.register( 'StrengthControl', StrengthControl );