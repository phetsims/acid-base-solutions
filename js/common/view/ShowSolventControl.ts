// Copyright 2023, University of Colorado Boulder

/**
 * ShowSolventControl is the control in the Preferences dialog for showing the solvent in the Particles view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PreferencesControl from '../../../../joist/js/preferences/PreferencesControl.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Property from '../../../../axon/js/Property.js';
import { Text } from '../../../../scenery/js/imports.js';
import ABSConstants from '../ABSConstants.js';
import ToggleSwitch, { ToggleSwitchOptions } from '../../../../sun/js/ToggleSwitch.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import PreferencesDialogConstants from '../../../../joist/js/preferences/PreferencesDialogConstants.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';

export default class ShowSolventControl extends PreferencesControl {

  private readonly disposeShowSolventControl: () => void;

  public constructor( showSolventProperty: Property<boolean>, tandem: Tandem ) {

    const labelText = new Text( AcidBaseSolutionsStrings.showSolventStringProperty, {
      font: ABSConstants.PREFERENCES_LABEL_FONT,
      maxWidth: ABSConstants.PREFERENCES_LABEL_MAX_WIDTH
    } );

    const toggleSwitch = new ToggleSwitch( showSolventProperty, false, true,
      combineOptions<ToggleSwitchOptions>( {}, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS, {
        tandem: tandem.createTandem( 'toggleSwitch' ),
        phetioVisiblePropertyInstrumented: false
      } ) );

    const descriptionText = new Text( AcidBaseSolutionsStrings.showTheSolventMoleculesInParticlesViewStringProperty, {
      font: ABSConstants.PREFERENCES_DESCRIPTION_FONT,
      maxWidth: 325
    } );

    super( {
      labelNode: labelText,
      controlNode: toggleSwitch,
      descriptionNode: descriptionText,
      labelSpacing: 20,
      tandem: tandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    this.disposeShowSolventControl = () => {
      labelText.dispose();
      toggleSwitch.dispose();
      descriptionText.dispose();
    };
  }

  public override dispose(): void {
    this.disposeShowSolventControl();
    super.dispose();
  }
}

acidBaseSolutions.register( 'ShowSolventControl', ShowSolventControl );