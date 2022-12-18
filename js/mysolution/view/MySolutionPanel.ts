// Copyright 2014-2022, University of Colorado Boulder

/**
 * Control for modifying a custom solutions.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Utils from '../../../../dot/js/Utils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignGroup, HBox, HSeparator, Node, Rectangle, Text, VBox } from '../../../../scenery/js/imports.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import ArrowButton from '../../../../sun/js/buttons/ArrowButton.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../../common/ABSConstants.js';
import ConcentrationSlider from './ConcentrationSlider.js';
import StrengthSlider from './StrengthSlider.js';
import { SolutionType } from '../../common/enum/SolutionType.js';
import Property from '../../../../axon/js/Property.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Tandem from '../../../../tandem/js/Tandem.js';

// constants
const CONCENTRATION_DECIMALS = 3;
const SUBTITLE_FONT = new PhetFont( 12 );
const CONTROL_FONT = new PhetFont( 12 );
const ARROW_STEP = Math.pow( 10, -CONCENTRATION_DECIMALS ); // concentration delta for arrow button
const ARROW_HEIGHT = 15;
const ARROW_BUTTON_OPTIONS = {
  arrowHeight: ARROW_HEIGHT,
  arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2,
  touchAreaXDilation: 6,
  touchAreaYDilation: 6
};
const CONCENTRATION_FONT = new PhetFont( 14 );
const TITLE_MAX_WIDTH = 180;
const SWITCH_TEXT_OPTIONS = {
  font: CONTROL_FONT,
  maxWidth: 50
};
const AB_SWITCH_OPTIONS = {
  toggleSwitchOptions: {
    size: new Dimension2( 40, 20 ),
    thumbTouchAreaXDilation: 6,
    thumbTouchAreaYDilation: 6
  }
};

export default class MySolutionPanel extends Panel {

  public constructor( solutionTypeProperty: Property<SolutionType>, concentrationProperty: Property<number>,
                      strengthProperty: Property<number>, contentAlignGroup: AlignGroup, tandem: Tandem ) {

    const options = combineOptions<PanelOptions>( {}, ABSConstants.PANEL_OPTIONS, {
      tandem: tandem
    } );

    // title
    const titleText = new Text( AcidBaseSolutionsStrings.solutionStringProperty, {
      font: ABSConstants.TITLE_FONT,
      maxWidth: TITLE_MAX_WIDTH,
      tandem: tandem.createTandem( 'titleText' )
    } );

    // acid/base switch
    const isAcidProperty = new BooleanProperty( solutionTypeProperty.value === 'weakAcid' || solutionTypeProperty.value === 'strongAcid' );
    const acidBaseSwitch = new ABSwitch( isAcidProperty,
      true, new Text( AcidBaseSolutionsStrings.acidStringProperty, SWITCH_TEXT_OPTIONS ),
      false, new Text( AcidBaseSolutionsStrings.baseStringProperty, SWITCH_TEXT_OPTIONS ),
      AB_SWITCH_OPTIONS );

    // concentration title
    const concentrationTitle = new Text( AcidBaseSolutionsStrings.initialConcentrationStringProperty, {
      font: SUBTITLE_FONT,
      maxWidth: TITLE_MAX_WIDTH,
      layoutOptions: { align: 'left' }
    } );

    // concentration readout
    const readoutText = new Text( Utils.toFixed( concentrationProperty.value, CONCENTRATION_DECIMALS ), { font: CONCENTRATION_FONT } );
    const readoutBackground = new Rectangle( 0, 0, 1.5 * readoutText.width, 1.5 * readoutText.height, 4, 4,
      { fill: 'white', stroke: 'rgb(200,200,200)' } );
    const readoutNode = new Node( { children: [ readoutBackground, readoutText ] } );
    readoutText.center = readoutBackground.center;

    // arrow buttons
    const leftArrowButton = new ArrowButton( 'left', () => {
      concentrationProperty.value = Math.max( concentrationProperty.value - ARROW_STEP, ABSConstants.CONCENTRATION_RANGE.min );
    }, ARROW_BUTTON_OPTIONS );
    const rightArrowButton = new ArrowButton( 'right', () => {
      concentrationProperty.value = Math.min( concentrationProperty.value + ARROW_STEP, ABSConstants.CONCENTRATION_RANGE.max );
    }, ARROW_BUTTON_OPTIONS );

    // concentration value control
    const concentrationValueControl = new HBox( {
      spacing: 8,
      children: [ leftArrowButton, readoutNode, rightArrowButton ]
    } );

    // concentration slider
    const concentrationSlider = new ConcentrationSlider( concentrationProperty, ABSConstants.CONCENTRATION_RANGE );

    // strength control
    const strengthTitle = new Text( AcidBaseSolutionsStrings.strengthStringProperty, {
      font: SUBTITLE_FONT,
      maxWidth: TITLE_MAX_WIDTH,
      layoutOptions: { align: 'left' }
    } );
    const isWeakProperty = new BooleanProperty( solutionTypeProperty.value === 'weakBase' || solutionTypeProperty.value === 'weakAcid' );
    const weakStrongSwitch = new ABSwitch( isWeakProperty,
      true, new Text( AcidBaseSolutionsStrings.weakStringProperty, SWITCH_TEXT_OPTIONS ),
      false, new Text( AcidBaseSolutionsStrings.strongStringProperty, SWITCH_TEXT_OPTIONS ),
      AB_SWITCH_OPTIONS );
    const strengthSlider = new StrengthSlider( solutionTypeProperty, strengthProperty, ABSConstants.WEAK_STRENGTH_RANGE,
      tandem.createTandem( 'strengthSlider' ) );

    const controls = new VBox( {
      excludeInvisibleChildrenFromBounds: false,
      spacing: 6,
      children: [
        acidBaseSwitch,
        new HSeparator(),
        concentrationTitle,
        concentrationValueControl,
        concentrationSlider,
        new HSeparator(),
        strengthTitle,
        weakStrongSwitch,
        strengthSlider
      ]
    } );

    const content = new AlignBox( new VBox( {
      spacing: 8,
      align: 'left',
      children: [ titleText, controls ]
    } ), {
      group: contentAlignGroup,
      xAlign: 'left'
    } );

    super( content, options );

    // update the readout text when concentration value changes
    concentrationProperty.link( concentration => {
      readoutText.text = Utils.toFixed( concentration, CONCENTRATION_DECIMALS );
    } );

    // disable arrow buttons
    concentrationProperty.link( concentration => {
      leftArrowButton.enabled = ( concentration > ABSConstants.CONCENTRATION_RANGE.min );
      rightArrowButton.enabled = ( concentration < ABSConstants.CONCENTRATION_RANGE.max );
    } );

    // flag to prevent circular update of related Properties, see #152
    let updateSolutionTypeEnabled = true;

    // update solution type
    const updateSolutionType = () => {

      if ( updateSolutionTypeEnabled ) {

        const isAcid = isAcidProperty.value;
        const isWeak = isWeakProperty.value;

        if ( isWeak && isAcid ) {
          solutionTypeProperty.value = 'weakAcid';
        }
        else if ( isWeak && !isAcid ) {
          solutionTypeProperty.value = 'weakBase';
        }
        else if ( !isWeak && isAcid ) {
          solutionTypeProperty.value = 'strongAcid';
        }
        else if ( !isWeak && !isAcid ) {
          solutionTypeProperty.value = 'strongBase';
        }
      }
    };
    isAcidProperty.link( updateSolutionType.bind( this ) );
    isWeakProperty.link( updateSolutionType.bind( this ) );

    solutionTypeProperty.link( solutionType => {
      updateSolutionTypeEnabled = false;
      isAcidProperty.value = ( solutionType === 'weakAcid' || solutionType === 'strongAcid' );
      isWeakProperty.value = ( solutionType === 'weakAcid' || solutionType === 'weakBase' );
      updateSolutionTypeEnabled = true;
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

acidBaseSolutions.register( 'MySolutionPanel', MySolutionPanel );