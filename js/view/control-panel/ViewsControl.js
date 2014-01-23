// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of views mode menu.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' ),
    inherit = require( 'PHET_CORE/inherit' ),
    AquaRadioButton = require( 'SUN/AquaRadioButton' ),
    CheckBox = require( 'SUN/CheckBox' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONT = new PhetFont( 12 ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    HBox = require( 'SCENERY/nodes/HBox' ),
    Image = require( 'SCENERY/nodes/Image' ),

  // strings
    moleculesString = require( 'string!ACID_BASE_SOLUTIONS/molecules' ),
    showSolventString = require( 'string!ACID_BASE_SOLUTIONS/showSolvent' ),
    equilibriumConcentrationString = require( 'string!ACID_BASE_SOLUTIONS/equilibriumConcentration' ),
    liquidString = require( 'string!ACID_BASE_SOLUTIONS/liquid' ),

  // images
    magnifyingGlassImage = require( 'image!ACID_BASE_SOLUTIONS/magnifying-glass.png' ),
    beakerImage = require( 'image!ACID_BASE_SOLUTIONS/beaker.png' );

  var menuOptions = [
    {isRadio: true, text: moleculesString, icon: new Image( magnifyingGlassImage, {scale: 0.75} )},
    {isRadio: false, text: showSolventString, icon: new Node()},
    {isRadio: true, text: equilibriumConcentrationString, icon: new Node()},
    {isRadio: true, text: liquidString, icon: new Image( beakerImage, {scale: 0.75} )}
  ];

  function Views( model, options ) {
    var vBox = new VBox( {spacing: 5, align: 'left'} ), hBox;
    Node.call( this, options );

    // add options to menu
    for ( var i = 0; i < menuOptions.length; i++ ) {
      hBox = new HBox( {spacing: 5, children: [new Text( menuOptions[i].text, {font: FONT} ), menuOptions[i].icon]} );
      if ( menuOptions[i].isRadio ) {
        vBox.addChild( new AquaRadioButton( model.property( 'viewMode' ), i, hBox, {radius: 7} ) );
      }
      else {
        vBox.addChild( new CheckBox( hBox, model.property( 'solvent' ), {boxWidth: 15} ) );
      }

      hBox.updateLayout();
    }

    this.addChild( vBox );
    vBox.updateLayout();
  }

  return inherit( Node, Views );
} );