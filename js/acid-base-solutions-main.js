// Copyright 2014-2020, University of Colorado Boulder

/**
 * Main entry point for the 'Acid-Base Solutions' sim.
 *
 * @author Andrew Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import acidBaseSolutionsStrings from './acid-base-solutions-strings.js';
import IntroductionScreen from './introduction/IntroductionScreen.js';
import MySolutionScreen from './mysolution/MySolutionScreen.js';

const acidBaseSolutionsTitleString = acidBaseSolutionsStrings[ 'acid-base-solutions' ].title;

// constants
const tandem = Tandem.ROOT;

const simOptions = {
  credits: {
    leadDesign: 'Kelly Lancaster',
    softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
    team: 'Bryce Gruneich, Patricia Loeblein, Emily B. Moore, Robert Parson, Kathy Perkins',
    qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Oliver Orejola, Benjamin Roberts, Bryan Yoelin',
    thanks: '\u2022 Conversion of this simulation to HTML5 was funded in part by the Royal Society of Chemistry.<br>' +
            '\u2022 Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
  }
};

SimLauncher.launch( () => {
  const screens = [
    new IntroductionScreen( tandem.createTandem( 'introductionScreen' ) ),
    new MySolutionScreen( tandem.createTandem( 'mySolutionScreen' ) )
  ];
  new Sim( acidBaseSolutionsTitleString, screens, simOptions ).start();
} );