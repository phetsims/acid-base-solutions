// Copyright 2014-2023, University of Colorado Boulder

/**
 * This is the main entry point for the 'Acid-Base Solutions' simulation.
 *
 * @author Andrew Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import AcidBaseSolutionsStrings from './AcidBaseSolutionsStrings.js';
import IntroScreen from './intro/IntroScreen.js';
import MySolutionScreen from './mysolution/MySolutionScreen.js';
import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import ABSPreferences from './common/model/ABSPreferences.js';
import ABSPreferencesNode from './common/view/ABSPreferencesNode.js';

simLauncher.launch( () => {

  const screens = [
    new IntroScreen( Tandem.ROOT.createTandem( 'introScreen' ) ),
    new MySolutionScreen( Tandem.ROOT.createTandem( 'mySolutionScreen' ) )
  ];

  const sim = new Sim( AcidBaseSolutionsStrings[ 'acid-base-solutions' ].titleStringProperty, screens, {

    // Credits that appear in the About dialog
    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Bryce Gruneich, Patricia Loeblein, Emily B. Moore, Robert Parson, Kathy Perkins',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Oliver Orejola, Benjamin Roberts, Amy Rouinfar, Bryan Yoelin',
      thanks: '\u2022 Conversion of this simulation to HTML5 was funded in part by the Royal Society of Chemistry.<br>' +
              '\u2022 Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
    },

    // Preferences
    preferencesModel: new PreferencesModel( {
      simulationOptions: {
        customPreferences: [ {
          createContent: tandem => new ABSPreferencesNode( tandem.createTandem( 'simPreferences' ) ),
          modelLinkables: [
            { property: ABSPreferences.showSolventProperty }
          ]
        } ]
      }
    } ),

    // See https://github.com/phetsims/acid-base-solutions/issues/179
    phetioDesigned: true
  } );

  sim.start();
} );