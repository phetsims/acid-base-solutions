[object Promise]

/**
 * Main entry point for the 'Acid-Base Solutions' sim.
 *
 * @author Andrew Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import acidBaseSolutionsStrings from './acidBaseSolutionsStrings.js';
import IntroductionScreen from './introduction/IntroductionScreen.js';
import MySolutionScreen from './mysolution/MySolutionScreen.js';

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

simLauncher.launch( () => {
  const screens = [
    new IntroductionScreen( Tandem.ROOT.createTandem( 'introductionScreen' ) ),
    new MySolutionScreen( Tandem.ROOT.createTandem( 'mySolutionScreen' ) )
  ];
  new Sim( acidBaseSolutionsStrings[ 'acid-base-solutions' ].title, screens, simOptions ).start();
} );