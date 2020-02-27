// Copyright 2014-2020, University of Colorado Boulder

/**
 * Control for modifying a custom solutions.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ABSwitch from '../../../../sun/js/ABSwitch.js';
import ArrowButton from '../../../../sun/js/buttons/ArrowButton.js';
import HSeparator from '../../../../sun/js/HSeparator.js';
import acidBaseSolutionsStrings from '../../acid-base-solutions-strings.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSConstants from '../../common/ABSConstants.js';
import SolutionType from '../../common/enum/SolutionType.js';
import ConcentrationSlider from './ConcentrationSlider.js';
import StrengthSlider from './StrengthSlider.js';

const acidString = acidBaseSolutionsStrings.acid;
const baseString = acidBaseSolutionsStrings.base;
const initialConcentrationString = acidBaseSolutionsStrings.initialConcentration;
const strengthString = acidBaseSolutionsStrings.strength;
const strongString = acidBaseSolutionsStrings.strong;
const weakString = acidBaseSolutionsStrings.weak;

// constants
const CONCENTRATION_DECIMALS = 3;
const SUBTITLE_FONT = new PhetFont( 12 );
const CONTROL_FONT = new PhetFont( 12 );
const ARROW_STEP = Math.pow( 10, -CONCENTRATION_DECIMALS ); // concentration delta for arrow button
const ARROW_HEIGHT = 15;
const ARROW_BUTTON_OPTIONS = { arrowHeight: ARROW_HEIGHT, arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2 };
const CONCENTRATION_FONT = new PhetFont( 14 );
const AB_SWITCH_SIZE = new Dimension2( 40, 20 );

class SolutionControl extends Node {

  /**
   * @param {Property.<SolutionType>} solutionTypeProperty
   * @param {Property.<number>} concentrationProperty
   * @param {Property.<number>} strengthProperty
   * @param {Object} [options]
   */
  constructor( solutionTypeProperty, concentrationProperty, strengthProperty, options ) {

    options = merge( {
      spacing: 4,
      align: 'left'
    }, options );

    const concentrationRange = ABSConstants.CONCENTRATION_RANGE;

    // acid/base switch
    const isAcidProperty = new BooleanProperty( solutionTypeProperty.get() === SolutionType.WEAK_ACID || solutionTypeProperty.get() === SolutionType.STRONG_ACID );
    const acidBaseSwitch = new ABSwitch( isAcidProperty,
      true, new Text( acidString, { font: CONTROL_FONT } ),
      false, new Text( baseString, { font: CONTROL_FONT } ), {
        toggleSwitchOptions: {
          size: AB_SWITCH_SIZE
        }
      } );

    // concentration title
    const concentrationTitle = new Text( initialConcentrationString, { font: SUBTITLE_FONT } );

    // concentration readout
    const readoutText = new Text( Utils.toFixed( concentrationProperty.get(), CONCENTRATION_DECIMALS ), { font: CONCENTRATION_FONT } );
    const readoutBackground = new Rectangle( 0, 0, 1.5 * readoutText.width, 1.5 * readoutText.height, 4, 4,
      { fill: 'white', stroke: 'rgb(200,200,200)' } );
    const readoutNode = new Node( { children: [ readoutBackground, readoutText ] } );
    readoutText.center = readoutBackground.center;

    // arrow buttons
    const leftArrowButton = new ArrowButton( 'left', () => {
      concentrationProperty.set( Math.max( concentrationProperty.get() - ARROW_STEP, concentrationRange.min ) );
    }, ARROW_BUTTON_OPTIONS );
    const rightArrowButton = new ArrowButton( 'right', () => {
      concentrationProperty.set( Math.min( concentrationProperty.get() + ARROW_STEP, concentrationRange.max ) );
    }, ARROW_BUTTON_OPTIONS );

    // concentration value control
    const concentrationValueControl = new HBox( {
      spacing: 8,
      children: [ leftArrowButton, readoutNode, rightArrowButton ]
    } );

    // concentration slider
    const concentrationSlider = new ConcentrationSlider( concentrationProperty, concentrationRange );

    // strength control
    const strengthTitle = new Text( strengthString, { font: SUBTITLE_FONT } );
    const isWeakProperty = new BooleanProperty( solutionTypeProperty.get() === SolutionType.WEAK_ACID || solutionTypeProperty.get() === SolutionType.WEAK_ACID );
    const weakStrongSwitch = new ABSwitch( isWeakProperty,
      true, new Text( weakString, { font: CONTROL_FONT } ),
      false, new Text( strongString, { font: CONTROL_FONT } ), {
        toggleSwitchOptions: {
          size: AB_SWITCH_SIZE
        }
      } );
    const strengthSlider = new StrengthSlider( solutionTypeProperty, strengthProperty, ABSConstants.WEAK_STRENGTH_RANGE );

    options.children = [
      acidBaseSwitch,
      concentrationTitle,
      concentrationValueControl,
      concentrationSlider,
      strengthTitle,
      weakStrongSwitch,
      strengthSlider
    ];

    // compute separator width
    let separatorWidth = 0;
    options.children.forEach( child => {
      separatorWidth = Math.max( child.width, separatorWidth );
    } );

    // separators for sub-panels
    const concentrationSeparator = new HSeparator( separatorWidth );
    const strengthSeparator = new HSeparator( separatorWidth );
    options.children.splice( options.children.indexOf( concentrationTitle ), 0, concentrationSeparator );
    options.children.splice( options.children.indexOf( strengthTitle ), 0, strengthSeparator );

    // brute-force layout
    const subtitleYSpacing = 6;
    const separatorYSpacing = 6;
    const controlYSpacing = 6;

    // controls are all center justified
    const centerX = separatorWidth / 2;
    acidBaseSwitch.centerX = centerX;
    concentrationValueControl.centerX = centerX;
    concentrationSlider.centerX = centerX;
    weakStrongSwitch.centerX = centerX;
    strengthSlider.centerX = centerX;

    // subtitles are left justified
    concentrationSeparator.top = acidBaseSwitch.bottom + separatorYSpacing;
    concentrationTitle.top = concentrationSeparator.bottom + separatorYSpacing;
    concentrationValueControl.top = concentrationTitle.bottom + subtitleYSpacing;
    concentrationSlider.top = concentrationValueControl.bottom + controlYSpacing;
    strengthSeparator.top = concentrationSlider.bottom + separatorYSpacing;
    strengthTitle.top = strengthSeparator.bottom + separatorYSpacing;
    weakStrongSwitch.top = strengthTitle.bottom + subtitleYSpacing;
    strengthSlider.top = weakStrongSwitch.bottom + controlYSpacing;

    super( options );

    // update the readout text when concentration value changes
    concentrationProperty.link( concentration => {
      readoutText.text = Utils.toFixed( concentration, CONCENTRATION_DECIMALS );
    } );

    // disable arrow buttons
    concentrationProperty.link( concentration => {
      leftArrowButton.enabled = ( concentration > concentrationRange.min );
      rightArrowButton.enabled = ( concentration < concentrationRange.max );
    } );

    // hide strength slider for weak solutions
    isWeakProperty.link( isWeak => {
      strengthSlider.visible = isWeak;
    } );

    // flag to prevent circular update of related Properties, see #152
    let updateSolutionTypeEnabled = true;

    // update solution type
    const updateSolutionType = () => {

      if ( updateSolutionTypeEnabled ) {

        const isAcid = isAcidProperty.get();
        const isWeak = isWeakProperty.get();

        if ( isWeak && isAcid ) {
          solutionTypeProperty.set( SolutionType.WEAK_ACID );
        }
        else if ( isWeak && !isAcid ) {
          solutionTypeProperty.set( SolutionType.WEAK_BASE );
        }
        else if ( !isWeak && isAcid ) {
          solutionTypeProperty.set( SolutionType.STRONG_ACID );
        }
        else if ( !isWeak && !isAcid ) {
          solutionTypeProperty.set( SolutionType.STRONG_BASE );
        }
      }
    };
    isAcidProperty.link( updateSolutionType.bind( this ) );
    isWeakProperty.link( updateSolutionType.bind( this ) );

    solutionTypeProperty.link( solutionType => {
      updateSolutionTypeEnabled = false;
      isAcidProperty.set( ( solutionType === SolutionType.WEAK_ACID || solutionType === SolutionType.STRONG_ACID ) );
      isWeakProperty.set( ( solutionType === SolutionType.WEAK_ACID || solutionType === SolutionType.WEAK_BASE ) );
      updateSolutionTypeEnabled = true;
    } );
  }
}

acidBaseSolutions.register( 'SolutionControl', SolutionControl );
export default SolutionControl;