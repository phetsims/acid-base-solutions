// Copyright 2014-2022, University of Colorado Boulder

/**
 * Main entry point for the 'Acid-Base Solutions' sim.
 *
 * @author Andrew Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import AcidBaseSolutionsStrings from './AcidBaseSolutionsStrings.js';
import IntroductionScreen from './introduction/IntroductionScreen.js';
import MySolutionScreen from './mysolution/MySolutionScreen.js';

simLauncher.launch( () => {

  const screens = [
    new IntroductionScreen( Tandem.ROOT.createTandem( 'introductionScreen' ) ),
    new MySolutionScreen( Tandem.ROOT.createTandem( 'mySolutionScreen' ) )
  ];

  const sim = new Sim( AcidBaseSolutionsStrings[ 'acid-base-solutions' ].titleStringProperty, screens, {
    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Bryce Gruneich, Patricia Loeblein, Emily B. Moore, Robert Parson, Kathy Perkins',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Oliver Orejola, Benjamin Roberts, Bryan Yoelin',
      thanks: '\u2022 Conversion of this simulation to HTML5 was funded in part by the Royal Society of Chemistry.<br>' +
              '\u2022 Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
    }
  } );

  sim.start();
} );