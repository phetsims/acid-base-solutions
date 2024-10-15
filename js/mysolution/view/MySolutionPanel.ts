// Copyright 2014-2024, University of Colorado Boulder

/**
 * MySolutionPanel is the panel titled 'Solution' in the 'My Solution' screen.
 * It has controls for modifying a custom solutions.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import { HSeparator, Text, VBox } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../../common/ABSConstants.js';
import MySolutionModel from '../model/MySolutionModel.js';
import AcidBaseSwitch from './AcidBaseSwitch.js';
import InitialConcentrationControl from './InitialConcentrationControl.js';
import StrengthControl from './StrengthControl.js';

export default class MySolutionPanel extends Panel {

  public constructor( model: MySolutionModel,
                      concentrationProperty: NumberProperty,
                      strengthProperty: Property<number>,
                      tandem: Tandem ) {

    const options = combineOptions<PanelOptions>( {}, ABSConstants.PANEL_OPTIONS, {
      isDisposable: false,
      tandem: tandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    // title
    const titleText = new Text( AcidBaseSolutionsStrings.solutionStringProperty, {
      font: ABSConstants.TITLE_FONT,
      maxWidth: 180 // determined empirically
    } );

    // Acid/Base switch
    const acidBaseSwitch = new AcidBaseSwitch( model.isAcidProperty, tandem.createTandem( 'acidBaseSwitch' ) );

    // Initial Concentration control
    const initialConcentrationControl = new InitialConcentrationControl( concentrationProperty,
      tandem.createTandem( 'initialConcentrationControl' ) );

    // Strength control
    const strengthControl = new StrengthControl( strengthProperty, model.isWeakProperty,
      tandem.createTandem( 'strengthControl' ) );

    const controls = new VBox( {
      spacing: 6,
      align: 'center',
      children: [
        acidBaseSwitch,
        new HSeparator(),
        initialConcentrationControl,
        new HSeparator(),
        strengthControl
      ]
    } );

    const content = new VBox( {
      spacing: 6,
      align: 'left',
      children: [
        titleText,
        controls
      ]
    } );

    super( content, options );
  }
}

acidBaseSolutions.register( 'MySolutionPanel', MySolutionPanel );