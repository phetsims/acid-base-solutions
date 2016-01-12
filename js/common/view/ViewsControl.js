// Copyright 2014-2015, University of Colorado Boulder

/**
 * Control for selecting between a set of mutually-exclusive 'views'.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var BeakerNode = require( 'ACID_BASE_SOLUTIONS/common/view/BeakerNode' );
  var CheckBox = require( 'SUN/CheckBox' );
  var ConcentrationGraphNode = require( 'ACID_BASE_SOLUTIONS/common/view/graph/ConcentrationGraphNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeFactory = require( 'ACID_BASE_SOLUTIONS/common/view/MoleculeFactory' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var ViewMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ViewMode' );

  // strings
  var graphString = require( 'string!ACID_BASE_SOLUTIONS/graph' );
  var hideViewsString = require( 'string!ACID_BASE_SOLUTIONS/hideViews' );
  var moleculesString = require( 'string!ACID_BASE_SOLUTIONS/molecules' );
  var solventString = require( 'string!ACID_BASE_SOLUTIONS/solvent' );

  // images
  var magnifierImage = require( 'image!ACID_BASE_SOLUTIONS/magnifier-icon.png' );

  // constants
  var TEXT_ICON_X_SPACING = 10;
  var RADIO_BUTTON_OPTIONS = { radius: 7 };
  var CHECK_BOX_OPTIONS = { boxWidth: 15 };
  var TEXT_OPTIONS = { font: new PhetFont( 12 ) };
  var ICON_OPTIONS = { scale: 0.75 };
  var TOUCH_AREA_X_DILATION = 10;
  var TOUCH_AREA_Y_DILATION = 3;

  /**
   * @param {Property.<ViewMode>} viewModeProperty
   * @param {Property.<boolean>} solventVisibleProperty
   * @param {Object} [options]
   * @constructor
   */
  function ViewsControl( viewModeProperty, solventVisibleProperty, options ) {

    options = _.extend( {
      spacing: 8,
      align: 'left'
    }, options );

    // Molecules
    var moleculesRadioButton = new AquaRadioButton( viewModeProperty, ViewMode.MOLECULES,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new Text( moleculesString, TEXT_OPTIONS ),
          new Image( magnifierImage, ICON_OPTIONS )
        ]
      } ), RADIO_BUTTON_OPTIONS );
    dilateTouchArea( moleculesRadioButton );

    // Solvent
    var solventLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( solventString, TEXT_OPTIONS ),
        MoleculeFactory.H2O()
      ]
    } );
    solventLabel.setEnabled = function( enabled ) {
      solventLabel.opacity = ( enabled ? 1 : 0.5 ); // gray out when disabled
    };
    var solventCheckBox = new CheckBox( solventLabel, solventVisibleProperty, CHECK_BOX_OPTIONS );
    dilateTouchArea( solventCheckBox );

    // Graph
    var graphRadioButton = new AquaRadioButton( viewModeProperty, ViewMode.GRAPH,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new Text( graphString, TEXT_OPTIONS ),
          ConcentrationGraphNode.createIcon()
        ]
      } ), RADIO_BUTTON_OPTIONS );
    dilateTouchArea( graphRadioButton );

    // Hide Views
    var hideViewsRadioButton = new AquaRadioButton( viewModeProperty, ViewMode.HIDE_VIEWS,
      new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new Text( hideViewsString, TEXT_OPTIONS ),
          BeakerNode.createIcon( 20, 15 )
        ]
      } ), RADIO_BUTTON_OPTIONS );
    dilateTouchArea( hideViewsRadioButton );

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
  }

  acidBaseSolutions.register( 'ViewsControl', ViewsControl );

  // uniformly expands touch area for controls
  var dilateTouchArea = function( node ) {
    node.touchArea = node.localBounds.dilatedXY( TOUCH_AREA_X_DILATION, TOUCH_AREA_Y_DILATION );
  };

  return inherit( VBox, ViewsControl );
} );