// Copyright 2023-2025, University of Colorado Boulder

/**
 * ABSPreferencesNode is the user interface for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSPreferences from '../model/ABSPreferences.js';
import ShowSolventControl from './ShowSolventControl.js';

export default class ABSPreferencesNode extends VBox {

  public constructor( tandem: Tandem ) {

    const showSolventControl = new ShowSolventControl( ABSPreferences.showSolventProperty,
      tandem.createTandem( 'showSolventControl' ) );

    super( {
      children: [ showSolventControl ],
      align: 'left',
      spacing: 20,
      phetioVisiblePropertyInstrumented: false,
      tandem: tandem
    } );
  }

}

acidBaseSolutions.register( 'ABSPreferencesNode', ABSPreferencesNode );