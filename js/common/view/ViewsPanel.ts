// Copyright 2014-2022, University of Colorado Boulder

/**
 * Panel for selecting between a set of mutually-exclusive 'views'.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignGroup, HBox, Image, Text, VBox } from '../../../../scenery/js/imports.js';
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
import Tandem from '../../../../tandem/js/Tandem.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';

// constants
const TEXT_ICON_X_SPACING = 10;
const RADIO_BUTTON_RADIUS = 7;
const LABEL_FONT = new PhetFont( 12 );
const TEXT_MAX_WIDTH = 130; // determined empirically
const TOUCH_AREA_X_DILATION = 10;
const TOUCH_AREA_Y_DILATION = 3;

export default class ViewsPanel extends Panel {

  public constructor( viewModeProperty: StringUnionProperty<ViewMode>,
                      solventVisibleProperty: Property<boolean>,
                      panelAlignGroup: AlignGroup,
                      tandem: Tandem ) {

    const options = combineOptions<PanelOptions>( {}, ABSConstants.PANEL_OPTIONS, {
      tandem: tandem
    } );

    const titleText = new Text( AcidBaseSolutionsStrings.viewsStringProperty, {
      font: ABSConstants.TITLE_FONT,
      maxWidth: 180, // determined empirically
      tandem: tandem.createTandem( 'titleText' )
    } );

    const radioButtonGroupTandem = tandem.createTandem( 'radioButtonGroup' );

    // Molecules radio button
    const moleculesRadioButtonTandem = radioButtonGroupTandem.createTandem( `molecules${AquaRadioButton.TANDEM_NAME_SUFFIX}` );
    const moleculesLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( AcidBaseSolutionsStrings.moleculesStringProperty, {
          font: LABEL_FONT,
          maxWidth: TEXT_MAX_WIDTH,
          tandem: moleculesRadioButtonTandem.createTandem( 'text' )
        } ),
        new Image( magnifierIcon_png, { scale: 0.75 } )
      ]
    } );
    const moleculesRadioButton = new AquaRadioButton( viewModeProperty, 'molecules', moleculesLabel, {
      radius: RADIO_BUTTON_RADIUS,
      tandem: moleculesRadioButtonTandem
    } );
    moleculesRadioButton.touchArea = moleculesRadioButton.localBounds.dilatedXY( TOUCH_AREA_X_DILATION, TOUCH_AREA_Y_DILATION );

    // Solvent checkbox
    const solventCheckboxTandem = radioButtonGroupTandem.createTandem( 'solventCheckbox' );
    const solventLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( AcidBaseSolutionsStrings.solventStringProperty, {
          font: LABEL_FONT,
          maxWidth: TEXT_MAX_WIDTH,
          tandem: solventCheckboxTandem.createTandem( 'text' )
        } ),
        createMoleculeNode( 'H2O' )
      ]
    } );
    const solventCheckbox = new Checkbox( solventVisibleProperty, solventLabel, {
      boxWidth: 15,
      layoutOptions: {
        leftMargin: 20 // indent Solvent checkbox from radio buttons
      },
      enabledProperty: new DerivedProperty( [ viewModeProperty ], viewMode => ( viewMode === 'molecules' ), {
        tandem: solventCheckboxTandem.createTandem( 'enabledProperty' ),
        phetioValueType: BooleanIO
      } ),
      tandem: solventCheckboxTandem
    } );
    solventCheckbox.touchArea = solventCheckbox.localBounds.dilatedXY( TOUCH_AREA_X_DILATION, TOUCH_AREA_Y_DILATION );

    // Graph radio button
    const graphRadioButtonTandem = radioButtonGroupTandem.createTandem( `graph${AquaRadioButton.TANDEM_NAME_SUFFIX}` );
    const graphLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( AcidBaseSolutionsStrings.graphStringProperty, {
          font: LABEL_FONT,
          maxWidth: TEXT_MAX_WIDTH,
          tandem: graphRadioButtonTandem.createTandem( 'text' )
        } ),
        ConcentrationGraphNode.createIcon()
      ]
    } );
    const graphRadioButton = new AquaRadioButton( viewModeProperty, 'graph', graphLabel, {
      radius: RADIO_BUTTON_RADIUS,
      tandem: graphRadioButtonTandem
    } );
    graphRadioButton.touchArea = graphRadioButton.localBounds.dilatedXY( TOUCH_AREA_X_DILATION, TOUCH_AREA_Y_DILATION );

    // Hide Views radio button
    const hideViewsRadioButtonTandem = radioButtonGroupTandem.createTandem( `hideViews${AquaRadioButton.TANDEM_NAME_SUFFIX}` );
    const hideViewsLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( AcidBaseSolutionsStrings.hideViewsStringProperty, {
          font: LABEL_FONT,
          maxWidth: TEXT_MAX_WIDTH,
          tandem: hideViewsRadioButtonTandem.createTandem( 'text' )
        } ),
        BeakerNode.createIcon( 20, 15 )
      ]
    } );
    const hideViewsRadioButton = new AquaRadioButton( viewModeProperty, 'hideViews', hideViewsLabel, {
      radius: RADIO_BUTTON_RADIUS,
      tandem: hideViewsRadioButtonTandem
    } );
    hideViewsRadioButton.touchArea = hideViewsRadioButton.localBounds.dilatedXY( TOUCH_AREA_X_DILATION, TOUCH_AREA_Y_DILATION );

    // Because of the interleaved 'Solvent' checkbox, we're faking things to make this look like an AquaRadioButtonGroup for PhET-iO.
    // See https://github.com/phetsims/acid-base-solutions/issues/161
    const radioButtonGroup = new VBox( {
      spacing: 8,
      align: 'left',
      children: [
        moleculesRadioButton,
        solventCheckbox,
        graphRadioButton,
        hideViewsRadioButton
      ],
      tandem: radioButtonGroupTandem,
      phetioEnabledPropertyInstrumented: true
    } );

    radioButtonGroup.addLinkedElement( viewModeProperty, {
      tandem: radioButtonGroupTandem.createTandem( 'property' )
    } );

    const content = new AlignBox( new VBox( {
      spacing: 8,
      align: 'left',
      children: [ titleText, radioButtonGroup ]
    } ), {
      group: panelAlignGroup,
      xAlign: 'left'
    } );

    super( content, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

acidBaseSolutions.register( 'ViewsPanel', ViewsPanel );