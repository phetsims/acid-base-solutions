// Copyright 2022, University of Colorado Boulder

/**
 * InitialConcentrationControl is the control for 'Initial Concentration' in MySolutionPanel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { HBox, Node, Rectangle, Text, VBox } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../../common/ABSConstants.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import ArrowButton, { ArrowButtonOptions } from '../../../../sun/js/buttons/ArrowButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import InitialConcentrationSlider from './InitialConcentrationSlider.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';

//TODO are some of these shared with StrengthControl?
const CONCENTRATION_DECIMALS = 3;
const SUBTITLE_FONT = new PhetFont( 12 );
const ARROW_STEP = Math.pow( 10, -CONCENTRATION_DECIMALS ); // concentration delta for arrow button
const ARROW_HEIGHT = 15;
const ARROW_BUTTON_OPTIONS: ArrowButtonOptions = {
  arrowHeight: ARROW_HEIGHT,
  arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2,
  touchAreaXDilation: 6,
  touchAreaYDilation: 6
};
const CONCENTRATION_FONT = new PhetFont( 14 );
const TITLE_MAX_WIDTH = 180;

export default class InitialConcentrationControl extends VBox {

  public constructor( concentrationProperty: Property<number>, tandem: Tandem ) {

    // Initial Concentration title
    const titleText = new Text( AcidBaseSolutionsStrings.initialConcentrationStringProperty, {
      font: SUBTITLE_FONT,
      maxWidth: TITLE_MAX_WIDTH,
      layoutOptions: { align: 'left' }
    } );

    const valueTextTandem = tandem.createTandem( 'valueText' );

    const valueTextStringProperty = new DerivedProperty( [ concentrationProperty ],
      concentration => Utils.toFixed( concentration, CONCENTRATION_DECIMALS ), {
        tandem: valueTextTandem.createTandem( Text.STRING_PROPERTY_TANDEM_NAME ),
        phetioValueType: StringIO
      } );

    // Initial Concentration display
    const valueText = new Text( valueTextStringProperty, {
      font: CONCENTRATION_FONT,
      tandem: valueTextTandem
    } );
    const valueBackgroundNode = new Rectangle( 0, 0, 1.5 * valueText.width, 1.5 * valueText.height, 4, 4,
      { fill: 'white', stroke: 'rgb(200,200,200)' } );
    const readoutNode = new Node( { children: [ valueBackgroundNode, valueText ] } );
    valueText.center = valueBackgroundNode.center;

    // arrow buttons
    const leftArrowButton = new ArrowButton( 'left', () => {
      concentrationProperty.value = Math.max( concentrationProperty.value - ARROW_STEP, ABSConstants.CONCENTRATION_RANGE.min );
    }, ARROW_BUTTON_OPTIONS );
    const rightArrowButton = new ArrowButton( 'right', () => {
      concentrationProperty.value = Math.min( concentrationProperty.value + ARROW_STEP, ABSConstants.CONCENTRATION_RANGE.max );
    }, ARROW_BUTTON_OPTIONS );

    // Initial Concentration slider
    const slider = new InitialConcentrationSlider( concentrationProperty, ABSConstants.CONCENTRATION_RANGE,
      tandem.createTandem( 'slider' ) );

    super( {
      children: [
        titleText,
        new HBox( {
          children: [ leftArrowButton, readoutNode, rightArrowButton ],
          spacing: 8
        } ),
        slider
      ],
      spacing: 6,
      tandem: tandem
    } );

    // disable arrow buttons
    //TODO https://github.com/phetsims/acid-base-solutions/issues/178 use enabledProperty
    concentrationProperty.link( concentration => {
      leftArrowButton.enabled = ( concentration > ABSConstants.CONCENTRATION_RANGE.min );
      rightArrowButton.enabled = ( concentration < ABSConstants.CONCENTRATION_RANGE.max );
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

acidBaseSolutions.register( 'InitialConcentrationControl', InitialConcentrationControl );