// Copyright 2014-2021, University of Colorado Boulder

/**
 * Panel for selecting between a set of mutually-exclusive 'views'.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignBox from '../../../../scenery/js/nodes/AlignBox.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import HStrut from '../../../../scenery/js/nodes/HStrut.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import AquaRadioButton from '../../../../sun/js/AquaRadioButton.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel from '../../../../sun/js/Panel.js';
import magnifierImage from '../../../images/magnifier-icon_png.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import acidBaseSolutionsStrings from '../../acidBaseSolutionsStrings.js';
import ABSConstants from '../ABSConstants.js';
import ViewMode from '../enum/ViewMode.js';
import BeakerNode from './BeakerNode.js';
import ConcentrationGraphNode from './graph/ConcentrationGraphNode.js';
import MoleculeFactory from './MoleculeFactory.js';

// constants
const TEXT_ICON_X_SPACING = 10;
const RADIO_BUTTON_OPTIONS = { radius: 7 };
const CHECKBOX_OPTIONS = { boxWidth: 15 };
const TEXT_OPTIONS = {
  font: new PhetFont( 12 ),
  maxWidth: 130 // determined empirically
};
const ICON_OPTIONS = { scale: 0.75 };
const TOUCH_AREA_X_DILATION = 10;
const TOUCH_AREA_Y_DILATION = 3;

class ViewsPanel extends Panel {

  /**
   * @param {EnumerationProperty.<ViewMode>} viewModeProperty
   * @param {Property.<boolean>} solventVisibleProperty
   * @param {AlignGroup} panelAlignGroup
   * @param {Object} [options]
   */
  constructor( viewModeProperty, solventVisibleProperty, panelAlignGroup, options ) {

    options = merge( {}, ABSConstants.PANEL_OPTIONS, options );

    const titleNode = new Text( acidBaseSolutionsStrings.views, {
      font: ABSConstants.TITLE_FONT,
      maxWidth: 180 // determined empirically
    } );

    // Molecules
    const moleculesLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( acidBaseSolutionsStrings.molecules, TEXT_OPTIONS ),
        new Image( magnifierImage, ICON_OPTIONS )
      ]
    } );
    const moleculesRadioButton = new AquaRadioButton( viewModeProperty, ViewMode.MOLECULES, moleculesLabel, RADIO_BUTTON_OPTIONS );
    moleculesRadioButton.touchArea = moleculesRadioButton.localBounds.dilatedXY( TOUCH_AREA_X_DILATION, TOUCH_AREA_Y_DILATION );

    // Solvent
    const solventLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( acidBaseSolutionsStrings.solvent, TEXT_OPTIONS ),
        MoleculeFactory.H2O()
      ]
    } );
    const solventCheckbox = new Checkbox( solventLabel, solventVisibleProperty, CHECKBOX_OPTIONS );
    solventCheckbox.touchArea = solventCheckbox.localBounds.dilatedXY( TOUCH_AREA_X_DILATION, TOUCH_AREA_Y_DILATION );
    solventLabel.setEnabled = enabled => {
      solventLabel.opacity = ( enabled ? 1 : 0.5 ); // gray out when disabled
    };

    // Graph
    const graphLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( acidBaseSolutionsStrings.graph, TEXT_OPTIONS ),
        ConcentrationGraphNode.createIcon()
      ]
    } );
    const graphRadioButton = new AquaRadioButton( viewModeProperty, ViewMode.GRAPH, graphLabel, RADIO_BUTTON_OPTIONS );
    graphRadioButton.touchArea = graphRadioButton.localBounds.dilatedXY( TOUCH_AREA_X_DILATION, TOUCH_AREA_Y_DILATION );

    // Hide Views
    const hideViewsLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( acidBaseSolutionsStrings.hideViews, TEXT_OPTIONS ),
        BeakerNode.createIcon( 20, 15 )
      ]
    } );
    const hideViewsRadioButton = new AquaRadioButton( viewModeProperty, ViewMode.HIDE_VIEWS,
      hideViewsLabel, RADIO_BUTTON_OPTIONS );
    hideViewsRadioButton.touchArea = hideViewsRadioButton.localBounds.dilatedXY( TOUCH_AREA_X_DILATION, TOUCH_AREA_Y_DILATION );

    const controls = new VBox( {
      spacing: 8,
      align: 'left',
      children: [
        moleculesRadioButton,
        new HBox( { children: [ new HStrut( 20 ), solventCheckbox ] } ),
        graphRadioButton,
        hideViewsRadioButton
      ]
    } );

    const content = new AlignBox( new VBox( {
      spacing: 8,
      align: 'left',
      children: [ titleNode, controls ]
    } ), {
      group: panelAlignGroup,
      xAlign: 'left'
    } );

    super( content, options );

    // disable the 'Solvent' checkbox unless 'Molecules' is selected
    viewModeProperty.link( viewMode => {
      solventCheckbox.enabled = ( viewMode === ViewMode.MOLECULES );
    } );
  }
}

acidBaseSolutions.register( 'ViewsPanel', ViewsPanel );
export default ViewsPanel;