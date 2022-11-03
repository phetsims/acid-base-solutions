// Copyright 2014-2022, University of Colorado Boulder

/**
 * Panel for selecting between a set of mutually-exclusive 'views'.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import { EmptySelfOptions, optionize3 } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignGroup, HBox, HStrut, Image, Text, VBox } from '../../../../scenery/js/imports.js';
import AquaRadioButton from '../../../../sun/js/AquaRadioButton.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import magnifierIcon_png from '../../../images/magnifierIcon_png.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../ABSConstants.js';
import { ViewMode } from '../enum/ViewMode.js';
import BeakerNode from './BeakerNode.js';
import ConcentrationGraphNode from './graph/ConcentrationGraphNode.js';
import createMoleculeNode from './createMoleculeNode.js';

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

type SelfOptions = EmptySelfOptions;

type ViewsPanelOptions = SelfOptions & PanelOptions;

export default class ViewsPanel extends Panel {

  public constructor( viewModeProperty: StringEnumerationProperty<ViewMode>,
                      solventVisibleProperty: Property<boolean>,
                      panelAlignGroup: AlignGroup,
                      providedOptions?: ViewsPanelOptions ) {

    const options = optionize3<ViewsPanelOptions, SelfOptions, PanelOptions>()(
      {}, ABSConstants.PANEL_OPTIONS, providedOptions );

    const titleText = new Text( AcidBaseSolutionsStrings.viewsStringProperty, {
      font: ABSConstants.TITLE_FONT,
      maxWidth: 180 // determined empirically
    } );

    // Molecules
    const moleculesLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( AcidBaseSolutionsStrings.moleculesStringProperty, TEXT_OPTIONS ),
        new Image( magnifierIcon_png, ICON_OPTIONS )
      ]
    } );
    const moleculesRadioButton = new AquaRadioButton( viewModeProperty, 'molecules', moleculesLabel, RADIO_BUTTON_OPTIONS );
    moleculesRadioButton.touchArea = moleculesRadioButton.localBounds.dilatedXY( TOUCH_AREA_X_DILATION, TOUCH_AREA_Y_DILATION );

    // Solvent
    const solventLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( AcidBaseSolutionsStrings.solventStringProperty, TEXT_OPTIONS ),
        createMoleculeNode( 'H2O' )
      ]
    } );
    const solventCheckbox = new Checkbox( solventVisibleProperty, solventLabel, CHECKBOX_OPTIONS );
    solventCheckbox.touchArea = solventCheckbox.localBounds.dilatedXY( TOUCH_AREA_X_DILATION, TOUCH_AREA_Y_DILATION );

    // Graph
    const graphLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( AcidBaseSolutionsStrings.graphStringProperty, TEXT_OPTIONS ),
        ConcentrationGraphNode.createIcon()
      ]
    } );
    const graphRadioButton = new AquaRadioButton( viewModeProperty, 'graph', graphLabel, RADIO_BUTTON_OPTIONS );
    graphRadioButton.touchArea = graphRadioButton.localBounds.dilatedXY( TOUCH_AREA_X_DILATION, TOUCH_AREA_Y_DILATION );

    // Hide Views
    const hideViewsLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( AcidBaseSolutionsStrings.hideViewsStringProperty, TEXT_OPTIONS ),
        BeakerNode.createIcon( 20, 15 )
      ]
    } );
    const hideViewsRadioButton = new AquaRadioButton( viewModeProperty, 'hideViews',
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
      children: [ titleText, controls ]
    } ), {
      group: panelAlignGroup,
      xAlign: 'left'
    } );

    super( content, options );

    // disable the 'Solvent' checkbox unless 'Molecules' is selected
    viewModeProperty.link( viewMode => {
      solventCheckbox.enabled = ( viewMode === 'molecules' );
    } );
  }
}

acidBaseSolutions.register( 'ViewsPanel', ViewsPanel );