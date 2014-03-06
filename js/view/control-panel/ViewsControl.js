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
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    AquaRadioButton = require( 'SUN/AquaRadioButton' ),
    CheckBox = require( 'SUN/CheckBox' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONT = new PhetFont( 12 ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    HBox = require( 'SCENERY/nodes/HBox' ),
    Image = require( 'SCENERY/nodes/Image' ),
    H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),
    MOLECULES_COLORS = require( 'model/Constants/MoleculesColors' ),
    HStrut = require( 'SUN/HStrut' ),
    ViewModes = require( 'model/ViewModes' ),
    TestModes = require( 'model/TestModes' ),

  // strings
    moleculesString = require( 'string!ACID_BASE_SOLUTIONS/molecules' ),
    showSolventString = require( 'string!ACID_BASE_SOLUTIONS/showSolvent' ),
    equilibriumString = require( 'string!ACID_BASE_SOLUTIONS/equilibrium' ),
    concentrationString = require( 'string!ACID_BASE_SOLUTIONS/concentration' ),
    liquidString = require( 'string!ACID_BASE_SOLUTIONS/liquid' ),

  // images
    magnifyingGlassImage = require( 'image!ACID_BASE_SOLUTIONS/magnifying-glass.png' ),
    beakerImage = require( 'image!ACID_BASE_SOLUTIONS/beaker.png' );

  function ViewsControl( model, options ) {
    var vBox = new VBox( {spacing: 4, align: 'left'} ),
      hBox;
    Node.call( this, options );
    this.model = model;

    // settings for menu options
    var menuOptions = [
      {isRadio: true, value: ViewModes.MOLECULES, text: new Text( moleculesString, {font: FONT} ), icon: new Image( magnifyingGlassImage, {scale: 0.75} )},
      {isRadio: false, text: showSolventString, icon: new H2OMolecule()},
      {isRadio: true, value: ViewModes.EQUILIBRIUM, text: new Node( {children: [
        new Text( equilibriumString, {font: FONT, centerX: -6} ),
        new Text( concentrationString, {font: FONT, centerX: 0, centerY: 8} )
      ]} ), icon: new Node( {children: [
        new Rectangle( 0, 0, 24.5, 18, {fill: 'white', stroke: 'black', lineWidth: 0.5} ),
        new Rectangle( 2, 6, 3, 12, {fill: MOLECULES_COLORS.B} ),
        new Rectangle( 7.5, 3, 3, 15, {fill: MOLECULES_COLORS.H2O} ),
        new Rectangle( 13, 9, 3, 9, {fill: MOLECULES_COLORS.A} ),
        new Rectangle( 18.5, 9, 3, 9, {fill: MOLECULES_COLORS.H3O} )
      ]} )},
      {isRadio: true, value: ViewModes.LIQUID, text: new Text( liquidString, {font: FONT} ), icon: new Image( beakerImage, {scale: 0.75} )}
    ];

    this.checkbox = {};
    this.radioButtons = [];

    // add options to menu
    for ( var i = 0; i < menuOptions.length; i++ ) {
      if ( menuOptions[i].isRadio ) {
        hBox = new HBox( {spacing: 5, children: [menuOptions[i].text, menuOptions[i].icon]} );
        this.radioButtons.push( new AquaRadioButton( model.property( 'viewMode' ), menuOptions[i].value, hBox, {radius: 7} ) );
        vBox.addChild( this.radioButtons[this.radioButtons.length - 1] );
      }
      else {
        this.checkbox.button = new CheckBox( new Text( menuOptions[i].text, {font: FONT} ), model.property( 'solvent' ), { boxWidth: 15 } );
        hBox = new HBox( { spacing: 5, children: [ new HStrut( 20 ), this.checkbox.button, this.checkbox.icon = menuOptions[i].icon ] } );
        vBox.addChild( hBox );
      }
    }

    this.addChild( vBox );
    vBox.updateLayout();

    model.property( 'testMode' ).link( this.enableRadioButtons.bind( this ) );
    model.property( 'viewMode' ).link( this.setCheckboxAvailability.bind( this ) );
  }

  return inherit( Node, ViewsControl, {
    setCheckboxAvailability: function() {
      this.checkbox.button.enabled = (this.model.viewMode === ViewModes.MOLECULES && this.model.testMode !== TestModes.CONDUCTIVITY);
      /*this.checkbox.text.setFill( (value ? 'black' : 'gray') );
       this.checkbox.icon.getChildren().forEach( function( atom ) {
       atom['fill' + (value ? 'Default' : 'Gray')]();
       } );*/
    },
    enableRadioButtons: function( isEnable ) {
      this.radioButtons.forEach( function( radioButton ) {
        //radioButton.enabled = isEnable;
        //console.log(radioButton);
      } );
      this.setCheckboxAvailability();
    }
  } );
} );