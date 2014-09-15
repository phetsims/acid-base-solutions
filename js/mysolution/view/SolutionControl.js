// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control for modifying a custom solutions.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );
  var ABSwitch = require( 'SUN/ABSwitch' );
  var ArrowButton = require( 'SCENERY_PHET/ArrowButton' );
  var ConcentrationSlider = require( 'ACID_BASE_SOLUTIONS/mysolution/view/ConcentrationSlider' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HSeparator = require( 'SUN/HSeparator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );
  var StrengthSlider = require( 'ACID_BASE_SOLUTIONS/mysolution/view/StrengthSlider' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var acidString = require( 'string!ACID_BASE_SOLUTIONS/acid' );
  var baseString = require( 'string!ACID_BASE_SOLUTIONS/base' );
  var initialConcentrationString = require( 'string!ACID_BASE_SOLUTIONS/initialConcentration' );
  var strengthString = require( 'string!ACID_BASE_SOLUTIONS/strength' );
  var strongString = require( 'string!ACID_BASE_SOLUTIONS/strong' );
  var weakString = require( 'string!ACID_BASE_SOLUTIONS/weak' );

  // constants
  var CONCENTRATION_DECIMALS = 3;
  var SUBTITLE_FONT = new PhetFont( 12 );
  var CONTROL_FONT = new PhetFont( 12 );
  var ARROW_STEP = Math.pow( 10, -CONCENTRATION_DECIMALS ); // concentration delta for arrow button
  var ARROW_HEIGHT = 15;
  var ARROW_BUTTON_OPTIONS = { arrowHeight: ARROW_HEIGHT, arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2 };
  var CONCENTRATION_FONT = new PhetFont( 14 );
  var AB_SWITCH_SIZE = new Dimension2( 40, 20 );

  /**
   * @param {Property<SolutionType>} solutionTypeProperty
   * @param {Property<Number>} concentrationProperty
   * @param {Property<Number>} strengthProperty
   * @param {Object} [options]
   * @constructor
   */
  function SolutionControl( solutionTypeProperty, concentrationProperty, strengthProperty, options ) {

    options = _.extend( {
      spacing: 4,
      align: 'left'
    }, options );

    var concentrationRange = ABSConstants.CONCENTRATION_RANGE;

    // acid/base switch
    var isAcidProperty = new Property( solutionTypeProperty.value === SolutionType.WEAK_ACID || solutionTypeProperty.value === SolutionType.STRONG_ACID );
    var acidBaseSwitch = new ABSwitch( isAcidProperty,
      true, new Text( acidString, {font: CONTROL_FONT} ),
      false, new Text( baseString, {font: CONTROL_FONT} ),
      { switchSize: AB_SWITCH_SIZE } );

    // concentration title
    var concentrationTitle = new Text( initialConcentrationString, { font: SUBTITLE_FONT } );

    // concentration readout
    var readoutText = new Text( Util.toFixed( concentrationProperty.value, CONCENTRATION_DECIMALS ), { font: CONCENTRATION_FONT } );
    var readoutBackground = new Rectangle( 0, 0, 1.5 * readoutText.width, 1.5 * readoutText.height, 4, 4,
      { fill: 'white', stroke: 'rgb(200,200,200)' } );
    var readoutNode = new Node( { children: [ readoutBackground, readoutText ] } );
    readoutText.center = readoutBackground.center;

    // arrow buttons
    var leftArrowButton = new ArrowButton( 'left', function() {
      concentrationProperty.value = Math.max( concentrationProperty.value - ARROW_STEP, concentrationRange.min );
    }, ARROW_BUTTON_OPTIONS );
    var rightArrowButton = new ArrowButton( 'right', function() {
      concentrationProperty.value = Math.min( concentrationProperty.value + ARROW_STEP, concentrationRange.max );
    }, ARROW_BUTTON_OPTIONS );

    // concentration value control
    var concentrationValueControl = new HBox( {
      spacing: 8,
      children: [ leftArrowButton, readoutNode, rightArrowButton ]
    } );

    // concentration slider
    var concentrationSlider = new ConcentrationSlider( concentrationProperty, concentrationRange );

    // strength control
    var strengthTitle = new Text( strengthString, { font: SUBTITLE_FONT } );
    var isWeakProperty = new Property( solutionTypeProperty.value === SolutionType.WEAK_ACID || solutionTypeProperty.value === SolutionType.WEAK_ACID );
    var weakStrongSwitch = new ABSwitch( isWeakProperty,
      true, new Text( weakString, {font: CONTROL_FONT} ),
      false, new Text( strongString, {font: CONTROL_FONT} ),
      { switchSize: AB_SWITCH_SIZE }
    );
    var strengthSlider = new StrengthSlider( solutionTypeProperty, strengthProperty, ABSConstants.WEAK_STRENGTH_RANGE );

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
    var separatorWidth = 0;
    options.children.forEach( function( child ) {
      separatorWidth = Math.max( child.width, separatorWidth );
    } );

    // separators for sub-panels
    var concentrationSeparator = new HSeparator( separatorWidth );
    var strengthSeparator = new HSeparator( separatorWidth );
    options.children.splice( options.children.indexOf( concentrationTitle ), 0, concentrationSeparator );
    options.children.splice( options.children.indexOf( strengthTitle ), 0, strengthSeparator );

    // brute-force layout
    var subtitleYSpacing = 6;
    var separatorYSpacing = 6;
    var controlYSpacing = 6;
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
      leftArrowButton.setEnabled( concentration > concentrationRange.min );
      rightArrowButton.setEnabled( concentration < concentrationRange.max );
    } );

    // hide strength slider for weak solutions
    isWeakProperty.link( function( isWeak ) {
      strengthSlider.visible = isWeak;
    } );

    // update solution type
    var updateSolutionType = function() {

      var isAcid = isAcidProperty.value;
      var isWeak = isWeakProperty.value;

      if ( isWeak && isAcid ) {
        solutionTypeProperty.value = SolutionType.WEAK_ACID;
      }
      else if ( isWeak && !isAcid ) {
        solutionTypeProperty.value = SolutionType.WEAK_BASE;
      }
      else if ( !isWeak && isAcid ) {
        solutionTypeProperty.value = SolutionType.STRONG_ACID;
      }
      else if ( !isWeak && !isAcid ) {
        solutionTypeProperty.value = SolutionType.STRONG_BASE;
      }
    };
    isAcidProperty.link( updateSolutionType.bind( this ) );
    isWeakProperty.link( updateSolutionType.bind( this ) );

    solutionTypeProperty.link( function( solutionType ) {
      isAcidProperty.value = ( solutionType === SolutionType.WEAK_ACID || solutionType === SolutionType.STRONG_ACID );
      isWeakProperty.value = ( solutionType === SolutionType.WEAK_ACID || solutionType === SolutionType.WEAK_BASE );
    } );
  }

  return inherit( Node, SolutionControl );
} );