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

import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, Image, Node, Text, VBox } from '../../../../scenery/js/imports.js';
import AquaRadioButtonGroup, { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import magnifyingGlassIcon_png from '../../../images/magnifyingGlassIcon_png.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../ABSConstants.js';
import BeakerNode from './BeakerNode.js';
import ConcentrationGraphNode from './ConcentrationGraphNode.js';
import { ViewMode } from './ViewMode.js';

// constants
const LABEL_FONT = new PhetFont( 12 );

export default class ViewsPanel extends Panel {

  public constructor( viewModeProperty: StringUnionProperty<ViewMode>, tandem: Tandem ) {

    const options = combineOptions<PanelOptions>( {}, ABSConstants.PANEL_OPTIONS, {

      // PanelOptions
      isDisposable: false,
      tandem: tandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    const titleText = new Text( AcidBaseSolutionsStrings.viewsStringProperty, {
      font: ABSConstants.TITLE_FONT,
      maxWidth: 180 // determined empirically
    } );

    const radioButtonGroupItems: AquaRadioButtonGroupItem<ViewMode>[] = [
      {
        value: 'particles',
        createNode: () => createLabel( AcidBaseSolutionsStrings.particlesStringProperty, new Image( magnifyingGlassIcon_png, { scale: 0.75 } ) ),
        tandemName: 'particlesRadioButton'
      },
      {
        value: 'graph',
        createNode: () => createLabel( AcidBaseSolutionsStrings.graphStringProperty, ConcentrationGraphNode.createIcon() ),
        tandemName: 'graphRadioButton'
      },
      {
        value: 'hideViews',
        createNode: () => createLabel( AcidBaseSolutionsStrings.hideViewsStringProperty, BeakerNode.createIcon( 20, 15 ) ),
        tandemName: 'hideViewsRadioButton'
      }
    ];

    const radioButtonGroup = new AquaRadioButtonGroup<ViewMode>( viewModeProperty, radioButtonGroupItems, {
      spacing: 8,
      align: 'left',
      radioButtonOptions: {
        radius: 7
      },
      touchAreaXDilation: 10,
      mouseAreaXDilation: 10,
      tandem: tandem.createTandem( 'radioButtonGroup' ),
      phetioVisiblePropertyInstrumented: false // hide the entire panel if you don't want radio buttons
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