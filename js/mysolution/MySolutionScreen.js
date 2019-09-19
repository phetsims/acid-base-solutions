// Copyright 2014-2017, University of Colorado Boulder

/**
 * The 'My Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ABSColors = require( 'ACID_BASE_SOLUTIONS/common/ABSColors' );
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MoleculeFactory = require( 'ACID_BASE_SOLUTIONS/common/view/MoleculeFactory' );
  const MySolutionModel = require( 'ACID_BASE_SOLUTIONS/mysolution/model/MySolutionModel' );
  const MySolutionScreenView = require( 'ACID_BASE_SOLUTIONS/mysolution/view/MySolutionScreenView' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenMySolutionString = require( 'string!ACID_BASE_SOLUTIONS/screen.mySolution' );

  /**
   * @constructor
   */
  function MySolutionScreen( tandem ) {

    const options = {
      name: screenMySolutionString,
      backgroundColorProperty: new Property( ABSColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon(),
      tandem: tandem
    };

    Screen.call( this,
      function() { return new MySolutionModel(); },
      function( model ) { return new MySolutionScreenView( model ); },
      options );
  }

  acidBaseSolutions.register( 'MySolutionScreen', MySolutionScreen );

  /**
   * Creates the icon for this screen.
   * @returns {Node}
   */
  var createScreenIcon = function() {

    const width = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width;
    const height = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height;

    const h3oNode = MoleculeFactory.H3O();
    const ohNode = MoleculeFactory.OH();

    // Uniformly scale the molecules to make them fill the available space.
    const xSpace = 0.06 * width; // horizontal space around the molecules
    const maxWidth = Math.max( h3oNode.width, ohNode.width );
    const moleculeScale = 0.5 * ( width - 3 * xSpace ) / maxWidth;
    h3oNode.setScaleMagnitude( moleculeScale, moleculeScale );
    ohNode.setScaleMagnitude( moleculeScale, moleculeScale );

    // position the molecules
    h3oNode.left = xSpace;
    ohNode.right = width - xSpace;
    h3oNode.centerY = ohNode.centerY = height / 2;

    const background = new Rectangle( 0, 0, width, height, { fill: 'white' } );

    return new Node( { children: [ background, h3oNode, ohNode ] } );
  };

  return inherit( Screen, MySolutionScreen );
} );