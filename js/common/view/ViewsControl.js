// Copyright 2014-2020, University of Colorado Boulder

/**
 * Control for selecting between a set of mutually-exclusive 'views'.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import HStrut from '../../../../scenery/js/nodes/HStrut.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import AquaRadioButton from '../../../../sun/js/AquaRadioButton.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import magnifierImage from '../../../images/magnifier-icon_png.js';
import acidBaseSolutionsStrings from '../../acid-base-solutions-strings.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ViewMode from '../enum/ViewMode.js';
import BeakerNode from './BeakerNode.js';
import MoleculeFactory from './MoleculeFactory.js';
import ConcentrationGraphNode from './graph/ConcentrationGraphNode.js';

const graphString = acidBaseSolutionsStrings.graph;
const hideViewsString = acidBaseSolutionsStrings.hideViews;
const moleculesString = acidBaseSolutionsStrings.molecules;
const solventString = acidBaseSolutionsStrings.solvent;


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

acidBaseSolutions.register( 'ViewsControl', ViewsControl );
export default ViewsControl;