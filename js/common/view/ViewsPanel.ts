// Copyright 2014-2023, University of Colorado Boulder

/**
 * ViewsPanel is the panel titled 'Views', for selecting between a set of mutually-exclusive representations of the
 * solutions, shown in the beaker.
 *
 * Note that because the 'Solvent' checkbox is interleaved with the radio button, we cannot use a radio button group
 * here. So the structure of the PhET-iO tree is custom, and we're faking things to make it look like an
 * AquaRadioButtonGroup. See https://github.com/phetsims/acid-base-solutions/issues/186
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, Image, Node, Text, VBox } from '../../../../scenery/js/imports.js';
import AquaRadioButton, { AquaRadioButtonOptions } from '../../../../sun/js/AquaRadioButton.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import magnifyingGlassIcon_png from '../../../images/magnifyingGlassIcon_png.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../ABSConstants.js';
import { ViewMode } from './ViewMode.js';
import ConcentrationGraphNode from './ConcentrationGraphNode.js';
import createParticleNode from './createParticleNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import BeakerNode from './BeakerNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import multiSelectionSoundPlayerFactory from '../../../../tambo/js/multiSelectionSoundPlayerFactory.js';

// constants
const LABEL_FONT = new PhetFont( 12 );
const RADIO_BUTTONS_Y_SPACING = 8;
const POINT_AREA_X_DILATION = 10;
const POINT_AREA_Y_DILATION = RADIO_BUTTONS_Y_SPACING / 2; // to mimic AquaRadioButtonGroup

// pdom - Used for the 'name' attribute of the radio buttons so that the browser can uniquely identify this group of
// UI components for traversal, see https://github.com/phetsims/acid-base-solutions/issues/213
let instanceCount = 0;

export default class ViewsPanel extends Panel {

  public constructor( viewModeProperty: StringUnionProperty<ViewMode>,
                      solventVisibleProperty: Property<boolean>,
                      tandem: Tandem ) {

    const options = combineOptions<PanelOptions>( {}, ABSConstants.PANEL_OPTIONS, {
      isDisposable: false,
      tandem: tandem
    } );

    const titleText = new Text( AcidBaseSolutionsStrings.viewsStringProperty, {
      font: ABSConstants.TITLE_FONT,
      maxWidth: 180 // determined empirically
    } );

    const radioButtonOptions: AquaRadioButtonOptions = {
      radius: 7,
      touchAreaXDilation: POINT_AREA_X_DILATION,
      touchAreaYDilation: POINT_AREA_Y_DILATION,
      mouseAreaXDilation: POINT_AREA_X_DILATION,
      mouseAreaYDilation: POINT_AREA_Y_DILATION,
      layoutOptions: { stretch: true },
      a11yNameAttribute: `viewsButtonGroup-${instanceCount++}`
    };

    const radioButtonGroupTandem = tandem.createTandem( 'radioButtonGroup' );

    let soundPlayerIndex = 0;

    // Particles radio button
    const particlesRadioButton = new AquaRadioButton( viewModeProperty, 'particles',
      createLabel( AcidBaseSolutionsStrings.particlesStringProperty, new Image( magnifyingGlassIcon_png, { scale: 0.75 } ) ),
      combineOptions<AquaRadioButtonOptions>( {
        tandem: radioButtonGroupTandem.createTandem( 'particlesRadioButton' ),
        soundPlayer: multiSelectionSoundPlayerFactory.getSelectionSoundPlayer( soundPlayerIndex++ )
      }, radioButtonOptions ) );

    // Solvent checkbox
    const solventCheckboxTandem = particlesRadioButton.tandem.createTandem( 'solventCheckbox' );
    const solventCheckbox = new Checkbox( solventVisibleProperty,
      createLabel( AcidBaseSolutionsStrings.solventStringProperty, createParticleNode( 'H2O' ) ), {
        boxWidth: 15,
        layoutOptions: {
          stretch: true,
          leftMargin: 20 // indent Solvent checkbox from radio buttons
        },
        touchAreaXDilation: POINT_AREA_X_DILATION,
        touchAreaYDilation: POINT_AREA_Y_DILATION,
        mouseAreaXDilation: POINT_AREA_X_DILATION,
        mouseAreaYDilation: POINT_AREA_Y_DILATION,
        enabledProperty: new DerivedProperty( [ viewModeProperty ], viewMode => ( viewMode === 'particles' ), {
          tandem: solventCheckboxTandem.createTandem( 'enabledProperty' ),
          phetioValueType: BooleanIO
        } ),
        tandem: solventCheckboxTandem
      } );

    // Wrap the 'Particles' radio button and 'Solvent' checkbox with a parent Node, so that hiding the 'Particles'
    // radio button will also hide the 'Solvent' checkbox.
    const particlesControls = new VBox( {
      children: [ particlesRadioButton, solventCheckbox ],
      visibleProperty: particlesRadioButton.visibleProperty,
      spacing: 8,
      align: 'left',
      layoutOptions: { stretch: true }
    } );

    // Graph radio button
    const graphRadioButton = new AquaRadioButton( viewModeProperty, 'graph',
      createLabel( AcidBaseSolutionsStrings.graphStringProperty, ConcentrationGraphNode.createIcon() ),
      combineOptions<AquaRadioButtonOptions>( {
        tandem: radioButtonGroupTandem.createTandem( 'graphRadioButton' ),
        soundPlayer: multiSelectionSoundPlayerFactory.getSelectionSoundPlayer( soundPlayerIndex++ )
      }, radioButtonOptions ) );

    // Hide Views radio button
    const hideViewsRadioButton = new AquaRadioButton( viewModeProperty, 'hideViews',
      createLabel( AcidBaseSolutionsStrings.hideViewsStringProperty, BeakerNode.createIcon( 20, 15 ) ),
      combineOptions<AquaRadioButtonOptions>( {
        tandem: radioButtonGroupTandem.createTandem( 'hideViewsRadioButton' ),
        soundPlayer: multiSelectionSoundPlayerFactory.getSelectionSoundPlayer( soundPlayerIndex++ )
      }, radioButtonOptions ) );

    const radioButtonGroup = new VBox( {
      spacing: RADIO_BUTTONS_Y_SPACING,
      align: 'left',
      children: [
        particlesControls,
        graphRadioButton,
        hideViewsRadioButton
      ],
      groupFocusHighlight: true, // to mimic AquaRadioButtonGroup
      tandem: radioButtonGroupTandem,
      phetioVisiblePropertyInstrumented: false, // hide the entire panel if you don't want radio buttons
      phetioEnabledPropertyInstrumented: true // to mimic AquaRadioButtonGroup
    } );

    // to mimic AquaRadioButtonGroup
    radioButtonGroup.addLinkedElement( viewModeProperty, {
      tandemName: 'property'
    } );

    const content = new VBox( {
      spacing: 8,
      align: 'left',
      children: [ titleText, radioButtonGroup ]
    } );

    super( content, options );
  }
}

// Creates a control label that consists of text and an icon.
function createLabel( stringProperty: TReadOnlyProperty<string>, icon: Node ): Node {
  const text = new Text( stringProperty, {
    font: LABEL_FONT,
    maxWidth: 130 // determined empirically
  } );

  // text to the left of icon
  const hBox = new HBox( {
    spacing: 10,
    children: [ text, icon ]
  } );

  // Wrap in a Node, to prevent space from being introduced between text and icon when the controls are stretched by scenery layout.
  return new Node( {
    children: [ hBox ],
    isDisposable: false
  } );
}

acidBaseSolutions.register( 'ViewsPanel', ViewsPanel );