// Copyright 2014-2019, University of Colorado Boulder

/**
 * Control for selecting between a set of mutually-exclusive solutions.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const AquaRadioButton = require( 'SUN/AquaRadioButton' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HStrut = require( 'SCENERY/nodes/HStrut' );
  const merge = require( 'PHET_CORE/merge' );
  const MoleculeFactory = require( 'ACID_BASE_SOLUTIONS/common/view/MoleculeFactory' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VStrut = require( 'SCENERY/nodes/VStrut' );

  // strings
  const strongAcidString = require( 'string!ACID_BASE_SOLUTIONS/strongAcid' );
  const strongBaseString = require( 'string!ACID_BASE_SOLUTIONS/strongBase' );
  const waterString = require( 'string!ACID_BASE_SOLUTIONS/water' );
  const weakAcidString = require( 'string!ACID_BASE_SOLUTIONS/weakAcid' );
  const weakBaseString = require( 'string!ACID_BASE_SOLUTIONS/weakBase' );

  // constants
  const RADIO_BUTTON_OPTIONS = { radius: 7 };
  const TEXT_OPTIONS = { font: new PhetFont( 12 ) };
  const ITALIC_TEXT_OPTIONS = merge( { fontStyle: 'italic' }, TEXT_OPTIONS );
  const TEXT_ICON_SPACING = 10; // space between text and icon
  const TOUCH_AREA_X_DILATION = 10;
  const TOUCH_AREA_Y_DILATION = 3;

  class SolutionsControl extends VBox {

    /**
     * @param {Property.<SolutionType>} solutionTypeProperty
     * @param {Object} [options]
     */
    constructor( solutionTypeProperty, options ) {

      options = merge( {
        spacing: 8,
        align: 'left'
      }, options );

      // Water (H20)
      const waterRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.WATER,
        new HBox( {
          spacing: TEXT_ICON_SPACING,
          children: [
            new RichText( waterString + ' (H<sub>2</sub>O)', TEXT_OPTIONS ),
            new MoleculeFactory.H2O()
          ]
        } ), RADIO_BUTTON_OPTIONS );

      // Strong Acid (HA)
      const strongAcidRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.STRONG_ACID,
        createStyledLabel( strongAcidString + ' (H', 'A', ')', new MoleculeFactory.HA() ),
        RADIO_BUTTON_OPTIONS );

      // Weak Acid (HA)
      const weakAcidRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.WEAK_ACID,
        createStyledLabel( weakAcidString + ' (H', 'A', ')', new MoleculeFactory.HA() ),
        RADIO_BUTTON_OPTIONS );

      // Strong Base (M)
      const strongBaseRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.STRONG_BASE,
        createStyledLabel( strongBaseString + ' (', 'M', 'OH)', new MoleculeFactory.MOH() ),
        RADIO_BUTTON_OPTIONS );

      // Weak Base (B)
      const weakBaseRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.WEAK_BASE,
        createStyledLabel( weakBaseString + ' (', 'B', ')', new MoleculeFactory.B() ),
        RADIO_BUTTON_OPTIONS );

      const buttons = [
        waterRadioButton,
        strongAcidRadioButton,
        weakAcidRadioButton,
        strongBaseRadioButton,
        weakBaseRadioButton
      ];

      // Make all buttons have the same height
      let maxHeight = 0;
      buttons.forEach( button => {
        maxHeight = Math.max( button.height, maxHeight );
      } );
      const vStrut = new VStrut( maxHeight );
      buttons.forEach( button => {
        const buttonCenterY = button.centerY;
        button.addChild( vStrut );
        vStrut.centerY = buttonCenterY;
      } );

      // uniformly expands touch area for buttons
      buttons.forEach( button => {
        button.touchArea = button.localBounds.dilatedXY( TOUCH_AREA_X_DILATION, TOUCH_AREA_Y_DILATION );
      } );

      options.children = buttons;
      super( options );
    }
  }

  /**
   * Notes about this ugly composition of the radio button labels, used throughout.
   * (1) It would be preferable to use scenery.HTMLText, but that causes out-of-memory issues, see issue #97.
   * (2) Other proposed approaches were not maintainable or required scenery changes.
   * (3) Order of solution name, formula and molecule is not internationalized.
   */
  function createStyledLabel( plainString1, italicString, plainString2, moleculeNode ) {
    return new HBox( {
      children: [
        new Text( plainString1, TEXT_OPTIONS ),
        new Text( italicString, ITALIC_TEXT_OPTIONS ),
        new Text( plainString2, TEXT_OPTIONS ),
        new HStrut( TEXT_ICON_SPACING ),
        moleculeNode
      ]
    } );
  }

  return acidBaseSolutions.register( 'SolutionsControl', SolutionsControl );
} );