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
import magnifyingGlassIcon_png from '../../../images/magnifyingGlassIcon_png.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../ABSConstants.js';
import { ViewMode } from './ViewMode.js';
import BeakerNode from './BeakerNode.js';
import ConcentrationGraphNode from './ConcentrationGraphNode.js';
import createParticleNode from './createParticleNode.js';
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
                      contentAlignGroup: AlignGroup, // so that both control panels have the same width
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

    // Particles radio button
    const particlesRadioButtonTandem = radioButtonGroupTandem.createTandem( `particles${AquaRadioButton.TANDEM_NAME_SUFFIX}` );
    const particlesLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( AcidBaseSolutionsStrings.particlesStringProperty, {
          font: LABEL_FONT,
          maxWidth: TEXT_MAX_WIDTH,
          tandem: particlesRadioButtonTandem.createTandem( 'text' )
        } ),
        new Image( magnifyingGlassIcon_png, { scale: 0.75 } )
      ]
    } );
    const particlesRadioButton = new AquaRadioButton( viewModeProperty, 'particles', particlesLabel, {
      radius: RADIO_BUTTON_RADIUS,
      tandem: particlesRadioButtonTandem
    } );
    particlesRadioButton.touchArea = particlesRadioButton.localBounds.dilatedXY( TOUCH_AREA_X_DILATION, TOUCH_AREA_Y_DILATION );

    // Solvent checkbox
    const solventCheckboxTandem = particlesRadioButtonTandem.createTandem( 'solventCheckbox' );
    const solventLabel = new HBox( {
      spacing: TEXT_ICON_X_SPACING,
      children: [
        new Text( AcidBaseSolutionsStrings.solventStringProperty, {
          font: LABEL_FONT,
          maxWidth: TEXT_MAX_WIDTH,
          tandem: solventCheckboxTandem.createTandem( 'text' )
        } ),
        createParticleNode( 'H2O' )
      ]
    } );
    const solventCheckbox = new Checkbox( solventVisibleProperty, solventLabel, {
      boxWidth: 15,
      layoutOptions: {
        leftMargin: 20 // indent Solvent checkbox from radio buttons
      },
      enabledProperty: new DerivedProperty( [ viewModeProperty ], viewMode => ( viewMode === 'particles' ), {
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
        particlesRadioButton,
        solventCheckbox,
        graphRadioButton,
        hideViewsRadioButton
      ],
      tandem: radioButtonGroupTandem,
      phetioVisiblePropertyInstrumented: false, // hide the entire panel if you don't want radio buttons
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
      group: contentAlignGroup,
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