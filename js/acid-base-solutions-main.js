// Copyright 2002-2014, University of Colorado Boulder

/**
 * Main entry point for the 'Acid-Base Solutions' sim.
 *
 * @author Andrew Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var CustomSolutionScreen = require( 'ACID_BASE_SOLUTIONS/customsolution/CustomSolutionScreen' );
  var IntroductionScreen = require( 'ACID_BASE_SOLUTIONS/introduction/IntroductionScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var simTitleString = require( 'string!ACID_BASE_SOLUTIONS/acid-base-solutions.name' );

  var screens = [
    new IntroductionScreen(),
    new CustomSolutionScreen()
  ];

  var simOptions = {
    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'Chris Malley',
      designTeam: 'Bryce Gruneich, Patricia Loeblein, Emily B. Moore,\nRobert Parson, Kathy Perkins',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team\nto convert this simulation to HTML5.'
    }
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( window.phetcommon.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      showHomeScreen: false,
      screenIndex: 1
    }, simOptions );
  }

  SimLauncher.launch( function() {
    new Sim( simTitleString, screens, simOptions ).start();
  } );
} );