// Copyright 2014-2015, University of Colorado Boulder

/**
 * Main entry point for the 'Acid-Base Solutions' sim.
 *
 * @author Andrew Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var IntroductionScreen = require( 'ACID_BASE_SOLUTIONS/introduction/IntroductionScreen' );
  var MySolutionScreen = require( 'ACID_BASE_SOLUTIONS/mysolution/MySolutionScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var acidBaseSolutionsTitleString = require( 'string!ACID_BASE_SOLUTIONS/acid-base-solutions.title' );

  // constants
  var tandem = Tandem.createRootTandem();

  var simOptions = {
    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Bryce Gruneich, Patricia Loeblein, Emily B. Moore, Robert Parson, Kathy Perkins',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Oliver Orejola,\nBenjamin Roberts, Bryan Yoelin',
      thanks: '\u2022 Conversion of this simulation to HTML5 was funded in part by the Royal Society of Chemistry.\n' +
              '\u2022 Thanks to Mobile Learner Labs for working with the PhET development team to convert this\nsimulation to HTML5.'
    },
    tandem: tandem
  };

  SimLauncher.launch( function() {
    var screens = [
      new IntroductionScreen( tandem.createTandem( 'introductionScreen' ) ),
      new MySolutionScreen( tandem.createTandem( 'mySolutionScreen' ) )
    ];
    new Sim( acidBaseSolutionsTitleString, screens, simOptions ).start();
  } );
} );