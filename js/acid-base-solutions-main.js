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
  var ABSColors = require( 'ACID_BASE_SOLUTIONS/common/ABSColors' );
  var CustomSolutionModel = require( 'ACID_BASE_SOLUTIONS/customsolution/model/CustomSolutionModel' );
  var CustomSolutionView = require( 'ACID_BASE_SOLUTIONS/customsolution/view/CustomSolutionView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var IntroductionModel = require( 'ACID_BASE_SOLUTIONS/introduction/model/IntroductionModel' );
  var IntroductionView = require( 'ACID_BASE_SOLUTIONS/introduction/view/IntroductionView' );
  var MoleculeFactory = require( 'ACID_BASE_SOLUTIONS/common/view/MoleculeFactory' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // images
  var introductionIcon = require( 'image!ACID_BASE_SOLUTIONS/introduction-icon.png' );

  // strings
  var customSolutionTitleString = require( 'string!ACID_BASE_SOLUTIONS/customSolutionTitle' );
  var introductionTitleString = require( 'string!ACID_BASE_SOLUTIONS/introductionTitle' );
  var simTitleString = require( 'string!ACID_BASE_SOLUTIONS/acid-base-solutions.name' );

  /**
   * Create the icon for the 'Custom Solution' screen.
   * @param width
   * @param height
   * @returns {Node}
   */
  var createCustomSolutionsIcon = function( width, height ) {

    var h3oNode = MoleculeFactory.H3O();
    var ohNode = MoleculeFactory.OH();

    // Uniformly scale the molecules to make them fill the available space.
    var xSpace = 0.06 * width; // horizontal space around the molecules
    var maxWidth = Math.max( h3oNode.width, ohNode.width );
    var moleculeScale = 0.5 * ( width - 3 * xSpace ) / maxWidth;
    h3oNode.setScaleMagnitude( moleculeScale, moleculeScale );
    ohNode.setScaleMagnitude( moleculeScale, moleculeScale );

    // position the molecules
    h3oNode.left = xSpace;
    ohNode.right = width - xSpace;
    h3oNode.centerY = ohNode.centerY = height / 2;

    var background = new Rectangle( 0, 0, width, height, { fill: 'white' } );

    return new Node( { children: [ background, h3oNode, ohNode ] } );
  };

  var screens = [
    new Screen( introductionTitleString, new Image( introductionIcon ),
      function() { return new IntroductionModel(); },
      function( model ) { return new IntroductionView( model ); },
      { backgroundColor: ABSColors.SCREEN_BACKGROUND }
    ),
    new Screen( customSolutionTitleString, createCustomSolutionsIcon( 548, 373 ),
      function() { return new CustomSolutionModel(); },
      function( model ) { return new CustomSolutionView( model ); },
      { backgroundColor: ABSColors.SCREEN_BACKGROUND }
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