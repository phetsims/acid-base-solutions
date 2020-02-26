// Copyright 2014-2019, University of Colorado Boulder

/**
 * Control for selecting between a set of mutually-exclusive 'views'.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const AquaRadioButton = require( 'SUN/AquaRadioButton' );
  const BeakerNode = require( 'ACID_BASE_SOLUTIONS/common/view/BeakerNode' );
  const Checkbox = require( 'SUN/Checkbox' );
  const ConcentrationGraphNode = require( 'ACID_BASE_SOLUTIONS/common/view/graph/ConcentrationGraphNode' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HStrut = require( 'SCENERY/nodes/HStrut' );
  const Image = require( 'SCENERY/nodes/Image' );
  const merge = require( 'PHET_CORE/merge' );
  const MoleculeFactory = require( 'ACID_BASE_SOLUTIONS/common/view/MoleculeFactory' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const ViewMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ViewMode' );

  // strings
  const graphString = require( 'string!ACID_BASE_SOLUTIONS/graph' );
  const hideViewsString = require( 'string!ACID_BASE_SOLUTIONS/hideViews' );
  const moleculesString = require( 'string!ACID_BASE_SOLUTIONS/molecules' );
  const solventString = require( 'string!ACID_BASE_SOLUTIONS/solvent' );

  // images
  const magnifierImage = require( 'image!ACID_BASE_SOLUTIONS/magnifier-icon.png' );

  // constants
  const TEXT_ICON_X_SPACING = 10;
  const RADIO_BUTTON_OPTIONS = { radius: 7 };
  const CHECKBOX_OPTIONS = { boxWidth: 15 };
  const TEXT_OPTIONS = { font: new PhetFont( 12 ) };
  const ICON_OPTIONS = { scale: 0.75 };
  const TOUCH_AREA_X_DILATION = 10;
  const TOUCH_AREA_Y_DILATION = 3;

  class ViewsControl extends VBox {
    /**
     * @param {Property.<ViewMode>} viewModeProperty
     * @param {Property.<boolean>} solventVisibleProperty
     * @param {Object} [options]
     */
    constructor( viewModeProperty, solventVisibleProperty, options ) {

      options = merge( {
        spacing: 8,
        align: 'left'
      }, options );

      // Molecules
      const moleculesRadioButton = new AquaRadioButton( viewModeProperty, ViewMode.MOLECULES,
        new HBox( {
          spacing: TEXT_ICON_X_SPACING,
          children: [
            new Text( moleculesString, TEXT_OPTIONS ),
            new Image( magnifierImage, ICON_OPTIONS )
          ]
        } ), RADIO_BUTTON_OPTIONS );
      dilateTouchArea( moleculesRadioButton );

      // Solvent
      const solventLabel = new HBox( {
        spacing: TEXT_ICON_X_SPACING,
        children: [
          new Text( solventString, TEXT_OPTIONS ),
          MoleculeFactory.H2O()
        ]
      } );
      solventLabel.setEnabled = function( enabled ) {
        solventLabel.opacity = ( enabled ? 1 : 0.5 ); // gray out when disabled
      };
      const solventCheckbox = new Checkbox( solventLabel, solventVisibleProperty, CHECKBOX_OPTIONS );
      dilateTouchArea( solventCheckbox );

      // Graph
      const graphRadioButton = new AquaRadioButton( viewModeProperty, ViewMode.GRAPH,
        new HBox( {
          spacing: TEXT_ICON_X_SPACING,
          children: [
            new Text( graphString, TEXT_OPTIONS ),
            ConcentrationGraphNode.createIcon()
          ]
        } ), RADIO_BUTTON_OPTIONS );
      dilateTouchArea( graphRadioButton );

      // Hide Views
      const hideViewsRadioButton = new AquaRadioButton( viewModeProperty, ViewMode.HIDE_VIEWS,
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
        new HBox( { children: [ new HStrut( 20 ), solventCheckbox ] } ),
        graphRadioButton,
        hideViewsRadioButton
      ];

      super( options );

      // disable the 'Solvent' checkbox unless 'Molecules' is selected
      viewModeProperty.link( function( viewMode ) {
        solventCheckbox.enabled = ( viewMode === ViewMode.MOLECULES );
      } );
    }
  }

  // uniformly expands touch area for controls
  function dilateTouchArea( node ) {
    node.touchArea = node.localBounds.dilatedXY( TOUCH_AREA_X_DILATION, TOUCH_AREA_Y_DILATION );
  }

  return acidBaseSolutions.register( 'ViewsControl', ViewsControl );
} );