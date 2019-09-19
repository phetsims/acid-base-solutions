// Copyright 2014-2018, University of Colorado Boulder

/**
 * Control for modifying a custom solutions.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );
  const ABSwitch = require( 'SUN/ABSwitch' );
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const ArrowButton = require( 'SUN/buttons/ArrowButton' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const ConcentrationSlider = require( 'ACID_BASE_SOLUTIONS/mysolution/view/ConcentrationSlider' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HSeparator = require( 'SUN/HSeparator' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );
  const StrengthSlider = require( 'ACID_BASE_SOLUTIONS/mysolution/view/StrengthSlider' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );

  // strings
  const acidString = require( 'string!ACID_BASE_SOLUTIONS/acid' );
  const baseString = require( 'string!ACID_BASE_SOLUTIONS/base' );
  const initialConcentrationString = require( 'string!ACID_BASE_SOLUTIONS/initialConcentration' );
  const strengthString = require( 'string!ACID_BASE_SOLUTIONS/strength' );
  const strongString = require( 'string!ACID_BASE_SOLUTIONS/strong' );
  const weakString = require( 'string!ACID_BASE_SOLUTIONS/weak' );

  // constants
  const CONCENTRATION_DECIMALS = 3;
  const SUBTITLE_FONT = new PhetFont( 12 );
  const CONTROL_FONT = new PhetFont( 12 );
  const ARROW_STEP = Math.pow( 10, -CONCENTRATION_DECIMALS ); // concentration delta for arrow button
  const ARROW_HEIGHT = 15;
  const ARROW_BUTTON_OPTIONS = { arrowHeight: ARROW_HEIGHT, arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2 };
  const CONCENTRATION_FONT = new PhetFont( 14 );
  const AB_SWITCH_SIZE = new Dimension2( 40, 20 );

  /**
   * @param {Property.<SolutionType>} solutionTypeProperty
   * @param {Property.<number>} concentrationProperty
   * @param {Property.<number>} strengthProperty
   * @param {Object} [options]
   * @constructor
   */
  function SolutionControl( solutionTypeProperty, concentrationProperty, strengthProperty, options ) {

    options = _.extend( {
      spacing: 4,
      align: 'left'
    }, options );

    const concentrationRange = ABSConstants.CONCENTRATION_RANGE;

    // acid/base switch
    const isAcidProperty = new BooleanProperty( solutionTypeProperty.get() === SolutionType.WEAK_ACID || solutionTypeProperty.get() === SolutionType.STRONG_ACID );
    const acidBaseSwitch = new ABSwitch( isAcidProperty,
      true, new Text( acidString, { font: CONTROL_FONT } ),
      false, new Text( baseString, { font: CONTROL_FONT } ),
      { switchSize: AB_SWITCH_SIZE } );

    // concentration title
    const concentrationTitle = new Text( initialConcentrationString, { font: SUBTITLE_FONT } );

    // concentration readout
    const readoutText = new Text( Util.toFixed( concentrationProperty.get(), CONCENTRATION_DECIMALS ), { font: CONCENTRATION_FONT } );
    const readoutBackground = new Rectangle( 0, 0, 1.5 * readoutText.width, 1.5 * readoutText.height, 4, 4,
      { fill: 'white', stroke: 'rgb(200,200,200)' } );
    const readoutNode = new Node( { children: [ readoutBackground, readoutText ] } );
    readoutText.center = readoutBackground.center;

    // arrow buttons
    const leftArrowButton = new ArrowButton( 'left', function() {
      concentrationProperty.set( Math.max( concentrationProperty.get() - ARROW_STEP, concentrationRange.min ) );
    }, ARROW_BUTTON_OPTIONS );
    const rightArrowButton = new ArrowButton( 'right', function() {
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
      false, new Text( strongString, { font: CONTROL_FONT } ),
      { switchSize: AB_SWITCH_SIZE }
    );
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
    options.children.forEach( function( child ) {
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
    acidBaseSwitch.centerX = concentrationValueControl.centerX = concentrationSlider.centerX = weakStrongSwitch.centerX = strengthSlider.centerX = separatorWidth / 2;
    // subtitles are left justified
    concentrationSeparator.top = acidBaseSwitch.bottom + separatorYSpacing;
    concentrationTitle.top = concentrationSeparator.bottom + separatorYSpacing;
    concentrationValueControl.top = concentrationTitle.bottom + subtitleYSpacing;
    concentrationSlider.top = concentrationValueControl.bottom + controlYSpacing;
    strengthSeparator.top = concentrationSlider.bottom + separatorYSpacing;
    strengthTitle.top = strengthSeparator.bottom + separatorYSpacing;
    weakStrongSwitch.top = strengthTitle.bottom + subtitleYSpacing;
    strengthSlider.top = weakStrongSwitch.bottom + controlYSpacing;

    Node.call( this, options );

    // update the readout text when concentration value changes
    concentrationProperty.link( function( concentration ) {
      readoutText.text = Util.toFixed( concentration, CONCENTRATION_DECIMALS );
    } );

    // disable arrow buttons
    concentrationProperty.link( function( concentration ) {
      leftArrowButton.enabled = ( concentration > concentrationRange.min );
      rightArrowButton.enabled = ( concentration < concentrationRange.max );
    } );

    // hide strength slider for weak solutions
    isWeakProperty.link( function( isWeak ) {
      strengthSlider.visible = isWeak;
    } );

    // flag to prevent circular update of related Properties, see #152
    let updateSolutionTypeEnabled = true;

    // update solution type
    const updateSolutionType = function() {

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

    solutionTypeProperty.link( function( solutionType ) {
      updateSolutionTypeEnabled = false;
      isAcidProperty.set( ( solutionType === SolutionType.WEAK_ACID || solutionType === SolutionType.STRONG_ACID ) );
      isWeakProperty.set( ( solutionType === SolutionType.WEAK_ACID || solutionType === SolutionType.WEAK_BASE ) );
      updateSolutionTypeEnabled = true;
    } );
  }

  acidBaseSolutions.register( 'SolutionControl', SolutionControl );

  return inherit( Node, SolutionControl );
} );