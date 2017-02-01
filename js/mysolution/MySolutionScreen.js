// Copyright 2014-2015, University of Colorado Boulder

/**
 * The 'My Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ABSColors = require( 'ACID_BASE_SOLUTIONS/common/ABSColors' );
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeFactory = require( 'ACID_BASE_SOLUTIONS/common/view/MoleculeFactory' );
  var MySolutionModel = require( 'ACID_BASE_SOLUTIONS/mysolution/model/MySolutionModel' );
  var MySolutionView = require( 'ACID_BASE_SOLUTIONS/mysolution/view/MySolutionView' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenMySolutionString = require( 'string!ACID_BASE_SOLUTIONS/screen.mySolution' );

  /**
   * @constructor
   */
  function MySolutionScreen( tandem ) {

    var options = {
      name: screenMySolutionString,
      backgroundColorProperty: new Property( ABSColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon(),
      tandem: tandem
    };

    Screen.call( this,
      function() { return new MySolutionModel(); },
      function( model ) { return new MySolutionView( model ); },
      options );
  }

  acidBaseSolutions.register( 'MySolutionScreen', MySolutionScreen );

  /**
   * Creates the icon for this screen.
   * @returns {Node}
   */
  var createScreenIcon = function() {

    var width = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width;
    var height = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height;

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

  return inherit( Screen, MySolutionScreen );
} );