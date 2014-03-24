// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main entry point for the 'Acid-Base Solutions' sim.
 *
 * @author Andrew Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

define( function( require ) {
  'use strict';

  // imports
  var CustomSolutionModel = require( 'ACID_BASE_SOLUTIONS/customsolution/model/CustomSolutionModel' );
  var CustomSolutionView = require( 'ACID_BASE_SOLUTIONS/customsolution/view/CustomSolutionView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var IntroductionModel = require( 'ACID_BASE_SOLUTIONS/introduction/model/IntroductionModel' );
  var IntroductionView = require( 'ACID_BASE_SOLUTIONS/introduction/view/IntroductionView' );
  var Screen = require( 'JOIST/Screen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // images
  var customSolutionIcon = require( 'image!ACID_BASE_SOLUTIONS/../images/custom-solution-icon.png' );
  var introductionIcon = require( 'image!ACID_BASE_SOLUTIONS/../images/introduction-icon.png' );

  // strings
  var customSolutionTitleString = require( 'string!ACID_BASE_SOLUTIONS/customSolutionTitle' );
  var introductionTitleString = require( 'string!ACID_BASE_SOLUTIONS/introductionTitle' );
  var simTitleString = require( 'string!ACID_BASE_SOLUTIONS/acid-base-solutions.name' );

  // constants
  var SCREEN_BACKGROUND_COLOR = 'rgb(230,230,230)';

  var screens = [
    new Screen( introductionTitleString, new Image( introductionIcon ),
      function() { return new IntroductionModel(); },
      function( model ) { return new IntroductionView( model ); },
      { backgroundColor: SCREEN_BACKGROUND_COLOR }
    ),
    new Screen( customSolutionTitleString, new Image( customSolutionIcon ),
      function() { return new CustomSolutionModel(); },
      function( model ) { return new CustomSolutionView( model ); },
      { backgroundColor: SCREEN_BACKGROUND_COLOR }
    )
  ];

  var simOptions = {
    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'Chris Malley',
      designTeam: 'Bryce Gruneich, Patricia Loeblein, Emily B. Moore,\nRobert Parson, Kathy Perkins',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team\nto convert this simulation to HTML5.'
    }
  };

  SimLauncher.launch( function() {
    new Sim( simTitleString, screens, simOptions ).start();
  } );
} );