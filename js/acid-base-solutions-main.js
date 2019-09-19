// Copyright 2014-2017, University of Colorado Boulder

/**
 * Main entry point for the 'Acid-Base Solutions' sim.
 *
 * @author Andrew Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const IntroductionScreen = require( 'ACID_BASE_SOLUTIONS/introduction/IntroductionScreen' );
  const MySolutionScreen = require( 'ACID_BASE_SOLUTIONS/mysolution/MySolutionScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const acidBaseSolutionsTitleString = require( 'string!ACID_BASE_SOLUTIONS/acid-base-solutions.title' );

  // constants
  var tandem = Tandem.rootTandem;

  var simOptions = {
    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Bryce Gruneich, Patricia Loeblein, Emily B. Moore, Robert Parson, Kathy Perkins',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Oliver Orejola, Benjamin Roberts, Bryan Yoelin',
      thanks: '\u2022 Conversion of this simulation to HTML5 was funded in part by the Royal Society of Chemistry.<br>' +
              '\u2022 Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
    }
  };

  SimLauncher.launch( function() {
    var screens = [
      new IntroductionScreen( tandem.createTandem( 'introductionScreen' ) ),
      new MySolutionScreen( tandem.createTandem( 'mySolutionScreen' ) )
    ];
    new Sim( acidBaseSolutionsTitleString, screens, simOptions ).start();
  } );
} );