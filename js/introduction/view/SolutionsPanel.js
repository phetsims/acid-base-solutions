// Copyright 2002-2014, University of Colorado Boulder

/**
 * 'Solutions' control panel, for switching between solution types.
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
  var SolutionTypes = require( 'ACID_BASE_SOLUTIONS/model/Constants/SolutionTypes' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
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
  function SolutionsPanel( solutionTypeProperty, options ) {

    options = _.extend( {
      spacing: 0,
      align: 'left'
    }, options );

    // Water
    var waterRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionTypes.WATER,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new SubSupText( StringUtils.format( pattern_0solution_1symbol, waterString, ChemUtils.toSubscript( 'H2O' ) ), TEXT_OPTIONS ),
          new H2OMolecule()
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Strong Acid
    var strongAcidRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionTypes.STRONG_ACID,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new HTMLText( StringUtils.format( pattern_0solution_1symbol, strongAcidString, 'H<i>A</i>' ), TEXT_OPTIONS ),
          new HAMolecule()
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Weak Acid
    var weakAcidRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionTypes.WEAK_ACID,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new HTMLText( StringUtils.format( pattern_0solution_1symbol, weakAcidString, 'H<i>A</i>' ), TEXT_OPTIONS ),
          new HAMolecule()
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Strong Base
    var strongBaseRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionTypes.STRONG_BASE,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new HTMLText( StringUtils.format( pattern_0solution_1symbol, strongBaseString, '<i>M</i>OH' ), TEXT_OPTIONS ),
          new MOHMolecule()
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Weak Base
    var weakBaseRadioButton = new AquaRadioButton( solutionTypeProperty, SolutionTypes.WEAK_BASE,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new HTMLText( StringUtils.format( pattern_0solution_1symbol, weakBaseString, '<i>B</i>' ), TEXT_OPTIONS ),
          new BMolecule()
        ]
      } ), RADIO_BUTTON_OPTIONS );

    options.children = [
      waterRadioButton,
      strongAcidRadioButton,
      weakAcidRadioButton,
      strongBaseRadioButton,
      weakBaseRadioButton
    ];

    // Make all controls have the same height
    var maxHeight = 0;
    options.children.forEach( function( control, i ) {
      maxHeight = Math.max( control.height, maxHeight );
    } );
    options.children.forEach( function( control ) {
      control.addChild( new VStrut( maxHeight ) );
    } );

    VBox.call( this, options );
  }

  return inherit( VBox, SolutionsPanel );
} );