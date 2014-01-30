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
    H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),

  // strings
    moleculesString = require( 'string!ACID_BASE_SOLUTIONS/molecules' ),
    showSolventString = require( 'string!ACID_BASE_SOLUTIONS/showSolvent' ),
    equilibriumConcentrationString = require( 'string!ACID_BASE_SOLUTIONS/equilibriumConcentration' ),
    liquidString = require( 'string!ACID_BASE_SOLUTIONS/liquid' ),

  // images
    magnifyingGlassImage = require( 'image!ACID_BASE_SOLUTIONS/magnifying-glass.png' ),
    beakerImage = require( 'image!ACID_BASE_SOLUTIONS/beaker.png' );

  // settings for menu options
  var menuOptions = [
    {isRadio: true, value: 'MOLECULES', text: moleculesString, icon: new Image( magnifyingGlassImage, {scale: 0.75} )},
    {isRadio: false, text: showSolventString, icon: new H2OMolecule()},
    {isRadio: true, value: 'EQUILIBRIUM', text: equilibriumConcentrationString, icon: new Node()},
    {isRadio: true, value: 'LIQUID', text: liquidString, icon: new Image( beakerImage, {scale: 0.75} )}
  ];

  function ViewsControl( model, options ) {
    var self = this,
      vBox = new VBox( {spacing: 5, align: 'left'} ),
      hBox;
    Node.call( this, options );

    this.checkbox = {};

    // add options to menu
    for ( var i = 0; i < menuOptions.length; i++ ) {
      if ( menuOptions[i].isRadio ) {
        hBox = new HBox( {spacing: 5, children: [new Text( menuOptions[i].text, {font: FONT} ), menuOptions[i].icon]} );
        vBox.addChild( new AquaRadioButton( model.property( 'viewMode' ), menuOptions[i].value, hBox, {radius: 7} ) );
      }
      else {
        hBox = new HBox( {spacing: 5, children: [this.checkbox.text = new Text( menuOptions[i].text, {font: FONT} ), this.checkbox.icon = menuOptions[i].icon]} );
        vBox.addChild( this.checkbox.button = new CheckBox( hBox, model.property( 'solvent' ), {boxWidth: 15} ) );
      }

      hBox.updateLayout();
    }

    this.addChild( vBox );
    vBox.updateLayout();

    model.property( 'viewMode' ).link( function( mode ) {
      self.enableCheckbox( mode === 'MOLECULES' );
    } );
  }

  return inherit( Node, ViewsControl, {
    enableCheckbox: function( value ) {
      this.checkbox.button.enabled = value;
      this.checkbox.text.setFill( (value ? 'black' : 'gray') );
      this.checkbox.icon.getChildren().forEach( function( atom ) {
        atom['fill' + (value ? 'Default' : 'Gray')]();
      } );
    }} );
} );