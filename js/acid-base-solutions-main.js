// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main entry point for the 'Acid Base Solutions' sim.
 *
 * @author Andrew Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var SimLauncher = require( 'JOIST/SimLauncher' ),
    Sim = require( 'JOIST/Sim' ),
    Screen = require( 'JOIST/Screen' ),
    Image = require( 'SCENERY/nodes/Image' ),
    ScreenView = require( 'JOIST/ScreenView' ),
    AcidBaseSolutionsModel = require( 'ACID_BASE_SOLUTIONS/model/AcidBaseSolutionsModel' ),
    AcidBaseSolutionsView = require( 'ACID_BASE_SOLUTIONS/view/AcidBaseSolutionsView' ),
    introductionIcon = require( 'image!ACID_BASE_SOLUTIONS/../images/introduction-icon.png' ),
    customSolutionIcon = require( 'image!ACID_BASE_SOLUTIONS/../images/custom-solution-icon.png' ),
    introductionTitleString = require( 'string!ACID_BASE_SOLUTIONS/introductionTitle' ),
    customSolutionTitleString = require( 'string!ACID_BASE_SOLUTIONS/customSolutionTitle' ),
    simTitleString = require( 'string!ACID_BASE_SOLUTIONS/acidBaseSolutionsTitle' );

  var simOptions = {
    credits: '',
    thanks: ''
  };

  SimLauncher.launch( function() {
    // create and start the sim
    new Sim( simTitleString, [
      new Screen( introductionTitleString, new Image( introductionIcon ),
        function() { return new AcidBaseSolutionsModel( ScreenView.DEFAULT_LAYOUT_BOUNDS.width, ScreenView.DEFAULT_LAYOUT_BOUNDS.height, introductionTitleString ); },
        function( model ) { return new AcidBaseSolutionsView( model ); },
        {backgroundColor: 'rgb(230,230,230)'}
      ),
      new Screen( customSolutionTitleString, new Image( customSolutionIcon ),
        function() { return new AcidBaseSolutionsModel( ScreenView.DEFAULT_LAYOUT_BOUNDS.width, ScreenView.DEFAULT_LAYOUT_BOUNDS.height, customSolutionTitleString ); },
        function( model ) { return new AcidBaseSolutionsView( model ); },
        {backgroundColor: 'rgb(230,230,230)'}
      )
    ], simOptions ).start();
  } );
} );