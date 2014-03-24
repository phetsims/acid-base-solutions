// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of views mode menu.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
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
    ViewModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/ViewModes' ),
    MoleculeColors = require( 'model/Constants/MoleculesColors' );

  // strings
  var moleculesString = require( 'string!ACID_BASE_SOLUTIONS/molecules' ),
    solventString = require( 'string!ACID_BASE_SOLUTIONS/solvent' ),
    graphString = require( 'string!ACID_BASE_SOLUTIONS/graph' ),
    hideViewsString = require( 'string!ACID_BASE_SOLUTIONS/hideViews' );

  // images
  var magnifyingGlassImage = require( 'image!ACID_BASE_SOLUTIONS/magnifying-glass.png' ),
    beakerImage = require( 'image!ACID_BASE_SOLUTIONS/beaker.png' );

  // constants
  var FONT = new PhetFont( 12 ),
    RADIO_BUTTON_RADIUS = 7,
    TEXT_ICON_X_SPACING = 10,
    CHECK_BOX_WIDTH = 15,
    ICON_SCALE = 0.75; // TODO rescale image files so that this is unnecessary

  // Creates an icon of the graph, with 4 bars (similar to weak acid)
  var createGraphIcon = function() {
    return new Node( {children: [
      new Rectangle( 0, 0, 24.5, 18, {fill: 'white', stroke: 'black', lineWidth: 0.5} ),
      new Rectangle( 2, 6, 3, 12, {fill: MoleculeColors.B} ),
      new Rectangle( 7.5, 3, 3, 15, {fill: MoleculeColors.H2O} ),
      new Rectangle( 13, 9, 3, 9, {fill: MoleculeColors.A} ),
      new Rectangle( 18.5, 9, 3, 9, {fill: MoleculeColors.H3O} )
    ]} );
  };

  function ViewsControl( viewModesMenuModel, options ) {

    options = _.extend( {
      spacing: 4,
      align: 'left'
    }, options );

    // Molecules
    var moleculesRadioButton = new AquaRadioButton( viewModesMenuModel.viewModeProperty, ViewModes.MOLECULES,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new Text( moleculesString, {font: FONT} ),
          new Image( magnifyingGlassImage, {scale: ICON_SCALE} )
        ]
      } ), {radius: RADIO_BUTTON_RADIUS} );

    // Solvent
    var solventCheckBox = new CheckBox( new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( solventString, {font: FONT} ),
        new H2OMolecule()
      ]
    } ), viewModesMenuModel.solventVisibleProperty, { boxWidth: CHECK_BOX_WIDTH } );

    // Graph
    var graphRadioButton = new AquaRadioButton( viewModesMenuModel.viewModeProperty, ViewModes.GRAPH,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new Text( graphString, {font: FONT} ),
          createGraphIcon()
        ]
      } ), {radius: RADIO_BUTTON_RADIUS} );

    // Hide Views
    var hideViewsRadioButton = new AquaRadioButton( viewModesMenuModel.viewModeProperty, ViewModes.HIDE_VIEWS,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new Text( hideViewsString, {font: FONT} ),
          new Image( beakerImage, {scale: ICON_SCALE} )
        ]
      } ), {radius: RADIO_BUTTON_RADIUS} );

    options.children = [
      moleculesRadioButton,
      new HBox( { children: [ new HStrut( 10 ), solventCheckBox ] } ),
      graphRadioButton,
      hideViewsRadioButton
    ];

    // disable the 'Solvent' check box unless 'Molecules' is selected
    viewModesMenuModel.viewModeProperty.link( function( viewMode ) {
      solventCheckBox.enabled = ( viewMode === ViewModes.MOLECULES );
    } );

    VBox.call( this, options );
  }

  return inherit( VBox, ViewsControl );
} );