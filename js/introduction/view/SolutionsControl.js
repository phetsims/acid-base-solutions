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
  var BMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/BMolecule' );
  var ChemUtils = require( 'NITROGLYCERIN/ChemUtils' );
  var H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' );
  var HAMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/HAMolecule' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HTMLText = require( 'SCENERY/nodes/HTMLText' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MOHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/MOHMolecule' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VStrut = require( 'SUN/VStrut' );

  // strings
  var pattern_0solution_1symbol = require( 'string!ACID_BASE_SOLUTIONS/pattern.0solution.1symbol' );
  var strongAcidString = require( 'string!ACID_BASE_SOLUTIONS/strongAcid' );
  var strongBaseString = require( 'string!ACID_BASE_SOLUTIONS/strongBase' );
  var waterString = require( 'string!ACID_BASE_SOLUTIONS/water' );
  var weakAcidString = require( 'string!ACID_BASE_SOLUTIONS/weakAcid' );
  var weakBaseString = require( 'string!ACID_BASE_SOLUTIONS/weakBase' );

  // constants
  var RADIO_BUTTON_OPTIONS = { radius: 7 };
  var TEXT_OPTIONS = { font: new PhetFont( 12 ) };
  var TEXT_ICON_X_SPACING = 10;

  /**
   * @param {Property<SolutionType>} solutionTypeProperty
   * @param options
   * @constructor
   */
  function SolutionsControl( solutionTypeProperty, options ) {

    options = _.extend( {
      spacing: 4,
      align: 'left'
    }, options );

    // Water
    var waterRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.WATER,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new SubSupText( StringUtils.format( pattern_0solution_1symbol, waterString, ChemUtils.toSubscript( 'H2O' ) ), TEXT_OPTIONS ),
          new H2OMolecule()
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Strong Acid
    var strongAcidRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.STRONG_ACID,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new HTMLText( StringUtils.format( pattern_0solution_1symbol, strongAcidString, 'H<i>A</i>' ), TEXT_OPTIONS ),
          new HAMolecule()
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Weak Acid
    var weakAcidRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.WEAK_ACID,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new HTMLText( StringUtils.format( pattern_0solution_1symbol, weakAcidString, 'H<i>A</i>' ), TEXT_OPTIONS ),
          new HAMolecule()
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Strong Base
    var strongBaseRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.STRONG_BASE,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new HTMLText( StringUtils.format( pattern_0solution_1symbol, strongBaseString, '<i>M</i>OH' ), TEXT_OPTIONS ),
          new MOHMolecule()
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Weak Base
    var weakBaseRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionType.WEAK_BASE,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new HTMLText( StringUtils.format( pattern_0solution_1symbol, weakBaseString, '<i>B</i>' ), TEXT_OPTIONS ),
          new BMolecule()
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

    options.children = buttons;
    VBox.call( this, options );
  }

  return inherit( VBox, SolutionsControl );
} );