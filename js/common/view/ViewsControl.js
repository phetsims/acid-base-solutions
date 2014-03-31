// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control for selecting between a set of mutually-exclusive 'views'.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var CheckBox = require( 'SUN/CheckBox' );
  var H2OMolecule = require( 'ACID_BASE_SOLUTIONS/common/view/molecules/H2OMolecule' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeColors = require( 'ACID_BASE_SOLUTIONS/common/MoleculeColors' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var ViewMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ViewMode' );

  // strings
  var graphString = require( 'string!ACID_BASE_SOLUTIONS/graph' );
  var hideViewsString = require( 'string!ACID_BASE_SOLUTIONS/hideViews' );
  var moleculesString = require( 'string!ACID_BASE_SOLUTIONS/molecules' );
  var solventString = require( 'string!ACID_BASE_SOLUTIONS/solvent' );

  // images
  var beakerImage = require( 'image!ACID_BASE_SOLUTIONS/beaker.png' );
  var magnifyingGlassImage = require( 'image!ACID_BASE_SOLUTIONS/magnifying-glass.png' );

  // constants
  var TEXT_ICON_X_SPACING = 10;
  var RADIO_BUTTON_OPTIONS = { radius: 7 };
  var CHECK_BOX_OPTIONS = { boxWidth: 15 };
  var TEXT_OPTIONS = { font: new PhetFont( 12 ) };
  var ICON_OPTIONS = { scale: 0.75 };

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

  /**
   * @param {Property<ViewMode>} viewModeProperty
   * @param {Property<ToolMode>} toolModeProperty
   * @param {Property<Boolean>} solventVisibleProperty
   * @param {*} options
   * @constructor
   */
  function ViewsControl( viewModeProperty, toolModeProperty, solventVisibleProperty, options ) {

    var self = this;

    options = _.extend( {
      spacing: 4,
      align: 'left'
    }, options );

    // Molecules
    var moleculesRadioButton = new AquaRadioButton( viewModeProperty, ViewMode.MOLECULES,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new Text( moleculesString, TEXT_OPTIONS ),
          new Image( magnifyingGlassImage, ICON_OPTIONS )
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Solvent
    var solventLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( solventString, TEXT_OPTIONS ),
        new H2OMolecule()
      ]
    } );
    solventLabel.setEnabled = function( enabled ) {
      solventLabel.opacity = ( enabled ? 1 : 0.5 ); // gray out when disabled
    };
    var solventCheckBox = new CheckBox( solventLabel, solventVisibleProperty, CHECK_BOX_OPTIONS );

    // Graph
    var graphRadioButton = new AquaRadioButton( viewModeProperty, ViewMode.GRAPH,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new Text( graphString, TEXT_OPTIONS ),
          createGraphIcon()
        ]
      } ), RADIO_BUTTON_OPTIONS );

    // Hide Views
    var hideViewsRadioButton = new AquaRadioButton( viewModeProperty, ViewMode.HIDE_VIEWS,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new Text( hideViewsString, TEXT_OPTIONS ),
          new Image( beakerImage, ICON_OPTIONS )
        ]
      } ), RADIO_BUTTON_OPTIONS );

    options.children = [
      moleculesRadioButton,
      new HBox( { children: [ new HStrut( 20 ), solventCheckBox ] } ),
      graphRadioButton,
      hideViewsRadioButton
    ];

    VBox.call( this, options );

    // disable the 'Solvent' check box unless 'Molecules' is selected
    viewModeProperty.link( function( viewMode ) {
      solventCheckBox.enabled = ( viewMode === ViewMode.MOLECULES );
    } );

    // disable this control when the conductivity tool is selected
    toolModeProperty.link( function( toolMode ) {
      var enabled = ( toolMode !== ToolMode.CONDUCTIVITY );
      self.opacity = enabled ? 1 : 0.5;
      self.pickable = enabled;
    } );
  }

  return inherit( VBox, ViewsControl );
} );