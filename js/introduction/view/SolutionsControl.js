// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control for selecting between a set of mutually-exclusive solutions.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeFactory = require( 'ACID_BASE_SOLUTIONS/common/view/MoleculeFactory' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VStrut = require( 'SUN/VStrut' );

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
   * @param {Property<SolutionType>} solutionTypeProperty
   * @param options
   * @constructor
   */
  function SolutionsControl( solutionTypeProperty, options ) {

    options = _.extend( {
      spacing: 8,
      align: 'left'
    }, options );

    // Water
    var waterRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.WATER,
      new HBox( {
        children: [
          new Text( waterString, TEXT_OPTIONS ),
          new HStrut( 4 ),
          new SubSupText( '(H<sub>2</sub>O)', TEXT_OPTIONS ),
          new HStrut( TEXT_ICON_SPACING ),
          new MoleculeFactory.H2O()
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Strong Acid
    var strongAcidRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.STRONG_ACID,
      new HBox( {
        children: [
        /**
         * Notes about this ugly composition of the radio button labels, used throughout.
         * (1) It would be preferable to use scenery.HTMLText, but that causes out-of-memory issues, see issue #97.
         * (2) Other proposed approached were not maintainable or requried scenery changes.
         * (3) The order of solution 'name' and 'formula' is no longer internationalized.
         */
          new Text( strongAcidString + ' (H', TEXT_OPTIONS ),
          new Text( 'A', ITALIC_TEXT_OPTIONS ),
          new Text( ')', TEXT_OPTIONS ),
          new HStrut( TEXT_ICON_SPACING ),
          new MoleculeFactory.HA()
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Weak Acid
    var weakAcidRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.WEAK_ACID,
      new HBox( {
        children: [
          new Text( weakAcidString + ' (', TEXT_OPTIONS ),
          new Text( 'A', ITALIC_TEXT_OPTIONS ),
          new Text( ')', TEXT_OPTIONS ),
          new HStrut( TEXT_ICON_SPACING ),
          new MoleculeFactory.HA()
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Strong Base
    var strongBaseRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.STRONG_BASE,
      new HBox( {
        children: [
          new Text( strongBaseString + ' (', TEXT_OPTIONS ),
          new Text( 'M', ITALIC_TEXT_OPTIONS ),
          new Text( ')', TEXT_OPTIONS ),
          new HStrut( TEXT_ICON_SPACING ),
          new MoleculeFactory.MOH()
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Weak Base
    var weakBaseRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.WEAK_BASE,
      new HBox( {
        children: [
          new Text( weakBaseString + ' (', TEXT_OPTIONS ),
          new Text( 'B', ITALIC_TEXT_OPTIONS ),
          new Text( ')', TEXT_OPTIONS ),
          new HStrut( TEXT_ICON_SPACING ),
          new MoleculeFactory.B()
        ]
      } ), RADIO_BUTTON_OPTIONS );

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