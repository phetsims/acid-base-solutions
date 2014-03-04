// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of solutions radio buttons menu.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' ),
    inherit = require( 'PHET_CORE/inherit' ),
    AquaRadioButton = require( 'SUN/AquaRadioButton' ),
    Text = require( 'SCENERY/nodes/Text' ),
    HTMLText = require( 'SCENERY/nodes/HTMLText' ),
    ChemUtils = require( 'NITROGLYCERIN/ChemUtils' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),

    VBox = require( 'SCENERY/nodes/VBox' ),
    HBox = require( 'SCENERY/nodes/HBox' ),
    VStrut = require( 'SUN/VStrut' ),
    H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),
    HAMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/HAMolecule' ),
    MOHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/MOHMolecule' ),
    BMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/BMolecule' ),

  // strings
    waterString = require( 'string!ACID_BASE_SOLUTIONS/water' ),
    strongAcidString = require( 'string!ACID_BASE_SOLUTIONS/strongAcid' ),
    weakAcidString = require( 'string!ACID_BASE_SOLUTIONS/weakAcid' ),
    strongBaseString = require( 'string!ACID_BASE_SOLUTIONS/strongBase' ),
    weakBaseString = require( 'string!ACID_BASE_SOLUTIONS/weakBase' ),

  // constants
    FONT = new PhetFont( 12 ),
    RADIO_BUTTON_RADIUS = 7;

  var menuOptions = [
    {text: new HTMLText( waterString + ChemUtils.toSubscript( ' (H2O)' ), {font: FONT, centerX: 49, centerY: 0} ), value: 'WATER', icon: H2OMolecule},
    {text: new Text( strongAcidString + ' (HA)', {font: FONT} ), value: 'STRONG_ACID', icon: HAMolecule},
    {text: new Text( weakAcidString + ' (HA)', {font: FONT} ), value: 'WEAK_ACID', icon: HAMolecule},
    {text: new Text( strongBaseString + ' (MOH)', {font: FONT} ), value: 'STRONG_BASE', icon: MOHMolecule},
    {text: new Text( weakBaseString + ' (B)', {font: FONT} ), value: 'WEAK_BASE', icon: BMolecule}
  ];

  function SolutionsControl( model, options ) {
    var vBox = new VBox( {align: 'left'} ),
      radioButtons = [],
      maxHeight = 0;
    Node.call( this, options );

    // define radio buttons and find max height of single button
    for ( var i = 0; i < menuOptions.length; i++ ) {
      radioButtons[i] = new AquaRadioButton( model.property( 'solution' ), menuOptions[i].value, new HBox( {spacing: 5, children: [
        menuOptions[i].text,
        new menuOptions[i].icon()
      ]
      } ), {radius: RADIO_BUTTON_RADIUS} );
      maxHeight = Math.max( radioButtons[i].getHeight(), maxHeight );
    }

    // add options to menu
    for ( i = 0; i < radioButtons.length; i++ ) {
      vBox.addChild( new HBox( {align: 'left', children: [new VStrut( maxHeight ), radioButtons[i]]} ) );
    }

    this.addChild( vBox );
    vBox.updateLayout();

    // adjust node position
    this.setX( this.getX() - RADIO_BUTTON_RADIUS );
  }

  return inherit( Node, SolutionsControl );
} );