// Copyright 2002-2014, University of Colorado Boulder

/**
 * The 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ABSColors = require( 'ACID_BASE_SOLUTIONS/common/ABSColors' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroductionModel = require( 'ACID_BASE_SOLUTIONS/introduction/model/IntroductionModel' );
  var IntroductionView = require( 'ACID_BASE_SOLUTIONS/introduction/view/IntroductionView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var introductionTitleString = require( 'string!ACID_BASE_SOLUTIONS/introductionTitle' );

  // images
  var introductionIcon = require( 'image!ACID_BASE_SOLUTIONS/introduction-icon.png' );

  function IntroductionScreen() {
    Screen.call( this,
      introductionTitleString,
      new Image( introductionIcon ),
      function() { return new IntroductionModel(); },
      function( model ) { return new IntroductionView( model ); },
      { backgroundColor: ABSColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, IntroductionScreen );
} );
