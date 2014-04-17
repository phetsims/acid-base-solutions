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
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroductionModel = require( 'ACID_BASE_SOLUTIONS/introduction/model/IntroductionModel' );
  var IntroductionView = require( 'ACID_BASE_SOLUTIONS/introduction/view/IntroductionView' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var Shape = require( 'KITE/Shape' );

  // strings
  var introductionTitleString = require( 'string!ACID_BASE_SOLUTIONS/introductionTitle' );

  /**
   * Create the icon for the 'Introduction' screen.
   * @param width
   * @param height
   * @returns {Node}
   */
  var createIntroductionIcon = function( width, height ) {

    var background = new Rectangle( 0, 0, width, height, { fill: 'white' } );

    var beakerWidth = 0.6 * width;
    var beakerHeight = 0.75 * height;
    var lipOffset = 0.05 * width;

    var beakerNode = new Path( new Shape()
      .moveTo( -lipOffset, -lipOffset )
      .lineTo( 0, 0 )
      .lineTo( 0, beakerHeight )
      .lineTo( beakerWidth, beakerHeight )
      .lineTo( beakerWidth, 0 )
      .lineTo( beakerWidth + lipOffset, -lipOffset ),
      { stroke: 'black', lineWidth: Math.max( 1, beakerHeight / 40 ), center: background.center } );

    var waterNode = new Rectangle( 0, 0, beakerWidth, beakerHeight,
      { fill: 'rgb(213,231,233)', translation: beakerNode.translation } );

    var lensRadius = 0.4 * beakerHeight;
    var lensNode = new Circle( lensRadius,
      { stroke: 'black', lineWidth: lensRadius / 6, center: waterNode.center } );

    var handleNode = new Rectangle( lensRadius + 2, -lensRadius / 7, lensRadius, lensRadius / 3, 8, 8,
      { fill: 'rgb(85,55,33)', stroke: 'black', lineWidth: 1, translation: lensNode.translation } );
    handleNode.rotate( Math.PI / 6 );

    return new Node( { children: [ background, waterNode, beakerNode, handleNode, lensNode ] } );
  };

  function IntroductionScreen() {
    Screen.call( this,
      introductionTitleString,
      createIntroductionIcon( 548, 373 ),
      function() { return new IntroductionModel(); },
      function( model ) { return new IntroductionView( model ); },
      { backgroundColor: ABSColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, IntroductionScreen );
} );
