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
    VBox = require( 'SCENERY/nodes/VBox' ),
    HBox = require( 'SCENERY/nodes/HBox' ),
    Image = require( 'SCENERY/nodes/Image' ),
    H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),
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
    beakerImage = require( 'image!ACID_BASE_SOLUTIONS/beaker.png' ),

  // constants
    FONT = new PhetFont( 12 ),
    RADIO_BUTTON_RADIUS = 7,
    CHECK_BOX_WIDTH = 15,
    MOLECULES_COLORS = require( 'model/Constants/MoleculesColors' );

  /*
   * isRadio: flag for choosing type of button. True - radio button, false - checkbox
   * value: value which will be assigned to model property after choosing radio button
   * text: description text for button
   * icon: icon for radio button
   */
  var buttonOptions = [
    {
      isRadio: true,
      value: ViewModes.MOLECULES,
      text: new Text( moleculesString, {font: FONT} ),
      icon: new Image( magnifyingGlassImage, {scale: 0.75} )
    },
    {
      isRadio: false,
      text: showSolventString,
      icon: new H2OMolecule()
    },
    {
      isRadio: true,
      value: ViewModes.EQUILIBRIUM,
      text: new Node( {children: [
        new Text( equilibriumString, {font: FONT, centerX: -6} ),
        new Text( concentrationString, {font: FONT, centerX: 0, centerY: 8} )
      ]} ),
      icon: new Node( {children: [
        new Rectangle( 0, 0, 24.5, 18, {fill: 'white', stroke: 'black', lineWidth: 0.5} ),
        new Rectangle( 2, 6, 3, 12, {fill: MOLECULES_COLORS.B} ),
        new Rectangle( 7.5, 3, 3, 15, {fill: MOLECULES_COLORS.H2O} ),
        new Rectangle( 13, 9, 3, 9, {fill: MOLECULES_COLORS.A} ),
        new Rectangle( 18.5, 9, 3, 9, {fill: MOLECULES_COLORS.H3O} )
      ]} )},
    {
      isRadio: true,
      value: ViewModes.LIQUID,
      text: new Text( liquidString, {font: FONT} ),
      icon: new Image( beakerImage, {scale: 0.75} )
    }
  ];

  function ViewsControl( model, options ) {
    var self = this,
      solventProperty = model.property( 'solvent' ),
      viewModeProperty = model.property( 'viewMode' );
    VBox.call( this, _.extend( {spacing: 4, align: 'left'}, options ) );

    // add options to menu
    buttonOptions.forEach( function( buttonOption ) {
      if ( buttonOption.isRadio ) {
        self.addChild( createRadioButton( viewModeProperty, buttonOption ) );
      }
      else {
        self.addChild( createCheckBox.call( self, solventProperty, buttonOption ) );

        // add observers
        var setCheckboxAvailabilityBinded = setCheckboxAvailability.bind( self, model );
        model.property( 'testMode' ).link( setCheckboxAvailabilityBinded );
        model.property( 'viewMode' ).link( setCheckboxAvailabilityBinded );
      }
    } );

    this.updateLayout();
  }

  var createRadioButton = function( property, options ) {
    return new AquaRadioButton( property, options.value, new HBox( {
      spacing: 5,
      children: [options.text, options.icon]} ), {radius: RADIO_BUTTON_RADIUS} );
  };

  var createCheckBox = function( property, options ) {
    return new HBox( { spacing: 5, children: [
      new HStrut( 20 ),
      this._checkbox = new CheckBox( new HBox( {spacing: 5, children: [
        new Text( options.text, {font: FONT} ),
        options.icon
      ]} ),
        property,
        { boxWidth: CHECK_BOX_WIDTH } )
    ] } );
  };

  var setCheckboxAvailability = function( model ) {
    this._checkbox.enabled = (model.viewMode === ViewModes.MOLECULES && model.testMode !== TestModes.CONDUCTIVITY);
  };

  return inherit( VBox, ViewsControl );
} );