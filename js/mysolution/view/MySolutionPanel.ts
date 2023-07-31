// Copyright 2014-2023, University of Colorado Boulder

/**
 * MySolutionPanel is the panel titled 'Solution' in the 'MySolution' screen.
 * It has controls for modifying a custom solutions.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AlignBox, AlignGroup, HSeparator, Text, VBox } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../../common/ABSConstants.js';
import Property from '../../../../axon/js/Property.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import InitialConcentrationControl from './InitialConcentrationControl.js';
import StrengthControl from './StrengthControl.js';
import StringSwitch from './StringSwitch.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import MySolutionModel from '../model/MySolutionModel.js';

export default class MySolutionPanel extends Panel {

  public constructor( model: MySolutionModel,
                      concentrationProperty: NumberProperty,
                      strengthProperty: Property<number>,
                      contentAlignGroup: AlignGroup, // so that both control panels have the same width
                      tandem: Tandem ) {

    const options = combineOptions<PanelOptions>( {}, ABSConstants.PANEL_OPTIONS, {
      isDisposable: false,
      tandem: tandem
    } );

    // title
    const titleText = new Text( AcidBaseSolutionsStrings.solutionStringProperty, {
      font: ABSConstants.TITLE_FONT,
      layoutOptions: {
        align: 'left'
      },
      maxWidth: 180 // determined empirically
    } );

    // Acid/Base switch
    const acidBaseSwitch = new StringSwitch( model.isAcidProperty, tandem.createTandem( 'acidBaseSwitch' ) );

    // Initial Concentration control
    const initialConcentrationControl = new InitialConcentrationControl( concentrationProperty,
      tandem.createTandem( 'initialConcentrationControl' ) );

    // Strength control
    const strengthControl = new StrengthControl( strengthProperty, model.isWeakProperty,
      tandem.createTandem( 'strengthControl' ) );

    const content = new AlignBox( new VBox( {
      spacing: 6,
      align: 'center',
      children: [
        titleText,
        acidBaseSwitch,
        new HSeparator(),
        initialConcentrationControl,
        new HSeparator(),
        strengthControl
      ]
    } ), {
      group: contentAlignGroup,
      xAlign: 'left'
    } );

    super( content, options );
  }
}

acidBaseSolutions.register( 'MySolutionPanel', MySolutionPanel );