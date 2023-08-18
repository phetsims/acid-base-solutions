// Copyright 2023, University of Colorado Boulder

/**
 * ABSPreferences is the model for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import acidBaseSolutions from '../../acidBaseSolutions.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import ABSQueryParameters from '../ABSQueryParameters.js';
import Tandem from '../../../../tandem/js/Tandem.js';

const ABSPreferences = {

  // Whether to show the solvent in 'Particles' view
  showSolventProperty: new BooleanProperty( ABSQueryParameters.showSolvent, {
    tandem: Tandem.PREFERENCES.createTandem( 'showSolventProperty' ),
    phetioDocumentation: 'Show the solvent molecules for the Particles view.'
  } )
};

acidBaseSolutions.register( 'ABSPreferences', ABSPreferences );
export default ABSPreferences;