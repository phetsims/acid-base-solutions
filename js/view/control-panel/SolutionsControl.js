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
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONT = new PhetFont( 12 ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    HBox = require( 'SCENERY/nodes/HBox' ),
    H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),
    HAMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/HAMolecule' ),
    MOHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/MOHMolecule' ),
    BMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/BMolecule' ),

  // strings
    waterString = require( 'string!ACID_BASE_SOLUTIONS/water' ),
    strongAcidString = require( 'string!ACID_BASE_SOLUTIONS/strongAcid' ),
    weakAcidString = require( 'string!ACID_BASE_SOLUTIONS/weakAcid' ),
    strongBaseString = require( 'string!ACID_BASE_SOLUTIONS/strongBase' ),
    weakBaseString = require( 'string!ACID_BASE_SOLUTIONS/weakBase' );

  var menuOptions = [
    {text: waterString + ' (H20)', icon: H2OMolecule},
    {text: strongAcidString + ' (HA)', icon: HAMolecule},
    {text: weakAcidString + ' (HA)', icon: HAMolecule},
    {text: strongBaseString + ' (MOH)', icon: MOHMolecule},
    {text: weakBaseString + ' (B)', icon: BMolecule}
  ];

  function Solutions( model, options ) {
    var vBox = new VBox( {spacing: 5, align: 'left'} );
    Node.call( this, options );

    // add options to menu
    for ( var i = 0; i < menuOptions.length; i++ ) {
      vBox.addChild( new AquaRadioButton( model.property( 'solution' ), i, new HBox( {spacing: 5, children: [
        new Text( menuOptions[i].text, {font: FONT} ),
        new menuOptions[i].icon()
      ]
      } ), {radius: 7} ) );
    }

    this.addChild( vBox );
    vBox.updateLayout();
  }

  return inherit( Node, Solutions );
} );