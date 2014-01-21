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
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    FONT = new PhetFont( 12 ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    HBox = require( 'SCENERY/nodes/HBox' ),

  // strings
    moleculesString = require( 'string!ACID_BASE_SOLUTIONS/molecules' ),
    showSolventString = require( 'string!ACID_BASE_SOLUTIONS/showSolvent' ),
    equilibriumConcentrationString = require( 'string!ACID_BASE_SOLUTIONS/equilibriumConcentration' ),
    liquidString = require( 'string!ACID_BASE_SOLUTIONS/liquid' );

  var menuOptions = [
    {isRadio: true, text: moleculesString},
    {isRadio: false, text: showSolventString},
    {isRadio: true, text: equilibriumConcentrationString},
    {isRadio: true, text: liquidString}
  ];

  function Views( model, options ) {
    var vBox = new VBox( {spacing: 5, align: 'left'} ), hBox;
    Node.call( this, options );

    // add options to menu
    for ( var i = 0; i < menuOptions.length; i++ ) {
      hBox = new HBox( {spacing: 5} );
      if ( menuOptions[i].isRadio ) {
        hBox.addChild( new AquaRadioButton( model.property( 'viewMode' ), i, new Text( menuOptions[i].text, {font: FONT} ), {radius: 7} ) );
      }
      else {
        hBox.addChild( new CheckBox( new Node( {children: [new Text( menuOptions[i].text, {font: FONT} )]} ), model.property( 'solvent' ) ) );
      }
      vBox.addChild( hBox );
      hBox.updateLayout();
    }

    this.addChild( vBox );
    vBox.updateLayout();
  }

  return inherit( Node, Views );
} );