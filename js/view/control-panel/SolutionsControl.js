// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of solutions radio buttons menu.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' ),
    AquaRadioButton = require( 'SUN/AquaRadioButton' ),
    StringUtils = require( 'PHETCOMMON/util/StringUtils' ),
    SubSupText = require( 'SCENERY_PHET/SubSupText' ),
    HTMLText = require( 'SCENERY/nodes/HTMLText' ),
    ChemUtils = require( 'NITROGLYCERIN/ChemUtils' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Solutions = require( 'model/Constants/Solutions' ),

    VBox = require( 'SCENERY/nodes/VBox' ),
    HBox = require( 'SCENERY/nodes/HBox' ),
    VStrut = require( 'SUN/VStrut' ),
    H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),
    HAMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/HAMolecule' ),
    MOHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/MOHMolecule' ),
    BMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/BMolecule' ),

  // strings
    pattern_0solution_1symbol = require( 'string!ACID_BASE_SOLUTIONS/pattern.0solution.1symbol' ),
    waterString = require( 'string!ACID_BASE_SOLUTIONS/water' ),
    strongAcidString = require( 'string!ACID_BASE_SOLUTIONS/strongAcid' ),
    weakAcidString = require( 'string!ACID_BASE_SOLUTIONS/weakAcid' ),
    strongBaseString = require( 'string!ACID_BASE_SOLUTIONS/strongBase' ),
    weakBaseString = require( 'string!ACID_BASE_SOLUTIONS/weakBase' ),

  // constants
    FONT = new PhetFont( 12 ),
    RADIO_BUTTON_RADIUS = 7;

  /*
   * value: value which will be assigned to model property after choosing radio button
   * text: description text for button
   * icon: icon for radio button
   */
  var radioButtonOptions = [
    {
      value: Solutions.WATER,
      text: new SubSupText( StringUtils.format( pattern_0solution_1symbol, waterString, ChemUtils.toSubscript( 'H2O' ) ), {font: FONT} ),
      icon: H2OMolecule
    },
    {
      value: Solutions.STRONG_ACID,
      text: new HTMLText( StringUtils.format( pattern_0solution_1symbol, strongAcidString, 'H<i>A</i>' ), {font: FONT} ),
      icon: HAMolecule
    },
    {
      value: Solutions.WEAK_ACID,
      text: new HTMLText( StringUtils.format( pattern_0solution_1symbol, weakAcidString, 'H<i>A</i>' ), {font: FONT} ),
      icon: HAMolecule
    },
    {
      value: Solutions.STRONG_BASE,
      text: new HTMLText( StringUtils.format( pattern_0solution_1symbol, strongBaseString, '<i>M</i>OH' ), {font: FONT} ),
      icon: MOHMolecule
    },
    {
      text: new HTMLText( StringUtils.format( pattern_0solution_1symbol, weakBaseString, '<i>B</i>' ), {font: FONT} ),
      value: Solutions.WEAK_BASE,
      icon: BMolecule
    }
  ];

  function SolutionsControl( solutionMenuModel, options ) {
    var self = this,
      solutionProperty = solutionMenuModel.solution,
      radioButtons = [],
      maxHeight = 0;
    VBox.call( this, _.extend( {align: 'left'}, options ) );

    // define radio buttons and find max height of single button
    radioButtonOptions.forEach( function( radioButtonOption, i ) {
      radioButtons[i] = createRadioButton( solutionProperty, radioButtonOption );
      maxHeight = Math.max( radioButtons[i].getHeight(), maxHeight );
    } );

    // add options to menu
    radioButtons.forEach( function( radioButton ) {
      self.addChild( new HBox( {align: 'left', children: [new VStrut( maxHeight ), radioButton]} ) );
    } );

    this.updateLayout();

    // adjust node position
    this.setX( this.getX() - RADIO_BUTTON_RADIUS );
  }

  var createRadioButton = function( property, options ) {
    return new AquaRadioButton( property, options.value, new HBox( {spacing: 5, children: [
      options.text,
      new options.icon()
    ]
    } ), {radius: RADIO_BUTTON_RADIUS} );
  };

  return inherit( VBox, SolutionsControl );
} );