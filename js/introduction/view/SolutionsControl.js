// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control for selecting between a set of mutually-exclusive solutions.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeFactory = require( 'ACID_BASE_SOLUTIONS/common/view/MoleculeFactory' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VStrut = require( 'SCENERY/nodes/VStrut' );

  // strings
  var strongAcidString = require( 'string!ACID_BASE_SOLUTIONS/strongAcid' );
  var strongBaseString = require( 'string!ACID_BASE_SOLUTIONS/strongBase' );
  var waterString = require( 'string!ACID_BASE_SOLUTIONS/water' );
  var weakAcidString = require( 'string!ACID_BASE_SOLUTIONS/weakAcid' );
  var weakBaseString = require( 'string!ACID_BASE_SOLUTIONS/weakBase' );

  // constants
  var RADIO_BUTTON_OPTIONS = { radius: 7 };
  var TEXT_OPTIONS = { font: new PhetFont( 12 ) };
  var ITALIC_TEXT_OPTIONS = _.extend( { fontStyle: 'italic' }, TEXT_OPTIONS );
  var TEXT_ICON_SPACING = 10; // space between text and icon
  var TOUCH_AREA_EXPAND_X = 10;
  var TOUCH_AREA_EXPAND_Y = 3;

  /**
   * Notes about this ugly composition of the radio button labels, used throughout.
   * (1) It would be preferable to use scenery.HTMLText, but that causes out-of-memory issues, see issue #97.
   * (2) Other proposed approached were not maintainable or required scenery changes.
   * (3) Order of solution name, formula and molecule is not internationalized.
   */
  var createStyledLabel = function( plainString1, italicString, plainString2, moleculeNode ) {
    return new HBox( {
      children: [
        new Text( plainString1, TEXT_OPTIONS ),
        new Text( italicString, ITALIC_TEXT_OPTIONS ),
        new Text( plainString2, TEXT_OPTIONS ),
        new HStrut( TEXT_ICON_SPACING ),
        moleculeNode
      ]
    } );
  };

  /**
   * @param {Property.<SolutionType>} solutionTypeProperty
   * @param {Object} [options]
   * @constructor
   */
  function SolutionsControl( solutionTypeProperty, options ) {

    options = _.extend( {
      spacing: 8,
      align: 'left'
    }, options );

    // Water (H20)
    var waterRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.WATER,
      new HBox( {
        spacing: TEXT_ICON_SPACING,
        children: [
          new SubSupText( waterString + ' (H<sub>2</sub>O)', TEXT_OPTIONS ),
          new MoleculeFactory.H2O()
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Strong Acid (HA)
    var strongAcidRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.STRONG_ACID,
      createStyledLabel( strongAcidString + ' (H', 'A', ')', new MoleculeFactory.HA() ),
      RADIO_BUTTON_OPTIONS );

    // Weak Acid (A)
    var weakAcidRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.WEAK_ACID,
      createStyledLabel( weakAcidString + ' (', 'A', ')', new MoleculeFactory.HA() ),
      RADIO_BUTTON_OPTIONS );

    // Strong Base (M)
    var strongBaseRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.STRONG_BASE,
      createStyledLabel( strongBaseString + ' (', 'M', 'OH)', new MoleculeFactory.MOH() ),
      RADIO_BUTTON_OPTIONS );

    // Weak Base (B)
    var weakBaseRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.WEAK_BASE,
      createStyledLabel( weakBaseString + ' (', 'B', ')', new MoleculeFactory.B() ),
      RADIO_BUTTON_OPTIONS );

    var buttons = [
      waterRadioButton,
      strongAcidRadioButton,
      weakAcidRadioButton,
      strongBaseRadioButton,
      weakBaseRadioButton
    ];

    // Make all buttons have the same height
    var maxHeight = 0;
    buttons.forEach( function( button ) {
      maxHeight = Math.max( button.height, maxHeight );
    } );
    var vStrut = new VStrut( maxHeight );
    buttons.forEach( function( button ) {
      var buttonCenterY = button.centerY;
      button.addChild( vStrut );
      vStrut.centerY = buttonCenterY;
    } );

    // uniformly expands touch area for buttons
    buttons.forEach( function( button ) {
      button.touchArea = button.localBounds.dilatedXY( TOUCH_AREA_EXPAND_X, TOUCH_AREA_EXPAND_Y );
    } );

    options.children = buttons;
    VBox.call( this, options );
  }

  return inherit( VBox, SolutionsControl );
} );