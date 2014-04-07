// Copyright 2002-2014, University of Colorado Boulder

/**
 * The 'Custom Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ABSColors = require( 'ACID_BASE_SOLUTIONS/common/ABSColors' );
  var CustomSolutionModel = require( 'ACID_BASE_SOLUTIONS/customsolution/model/CustomSolutionModel' );
  var CustomSolutionView = require( 'ACID_BASE_SOLUTIONS/customsolution/view/CustomSolutionView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeFactory = require( 'ACID_BASE_SOLUTIONS/common/view/MoleculeFactory' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var customSolutionTitleString = require( 'string!ACID_BASE_SOLUTIONS/customSolutionTitle' );

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


  function IntroductionScreen() {
    Screen.call( this,
      customSolutionTitleString,
      createCustomSolutionsIcon( 548, 373 ),
      function() { return new CustomSolutionModel(); },
      function( model ) { return new CustomSolutionView( model ); },
      { backgroundColor: ABSColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, IntroductionScreen );
} );