// Copyright 2002-2014, University of Colorado Boulder

/**
 * Concentration control. Includes a slider, arrow buttons, and value display.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // Imports
  var ArrowButton = require( 'SCENERY_PHET/ArrowButton' );
  var ConcentrationSlider = require( 'ACID_BASE_SOLUTIONS/customsolution/view/ConcentrationSlider' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Util = require( 'DOT/Util' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var initialConcentrationString = require( 'string!ACID_BASE_SOLUTIONS/initialConcentration' );
  var molesPerLiterString = require( 'string!ACID_BASE_SOLUTIONS/molesPerLiter' );
  var pattern_0value_1concentration = require( 'string!ACID_BASE_SOLUTIONS/pattern.0value.1concentration' );

  // constants
  var ARROW_STEP = 0.1; // concentration delta for arrow button
  var ARROW_HEIGHT = 15;
  var READOUT_FONT = new PhetFont( 12 );
  var ARROW_BUTTON_OPTIONS = {arrowHeight: ARROW_HEIGHT, arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2 };
  var DECIMAL_PLACES = 3;

  /**
   * Model for the concentration slider.
   * Maps between the linear slider and the logarithmic range of concentration.
   * Implemented as an inner type because this is internal to the slider.
   *
   * @param {Property<Number>} concentrationProperty
   * @param {Range} concentrationRange
   * @constructor
   */
  function SliderModel( concentrationProperty, concentrationRange ) {
    var self = this;

    this.concentrationProperty = concentrationProperty;

    // range of slider
    this.sliderValueRange = new Range( Util.log10( concentrationRange.min ), Util.log10( concentrationRange.max ), Util.log10( concentrationRange.defaultValue ) );

    // property for slider value
    this.sliderValueProperty = new Property( Util.log10( concentrationProperty.value ) );

    this.sliderValueProperty.link( function( sliderValue ) {
      self.concentrationProperty.value = Util.toFixedNumber( Math.pow( 10, sliderValue ), 4 * DECIMAL_PLACES ); // see issue#73
    } );
    concentrationProperty.link( function( concentration ) {
      self.sliderValueProperty.value = Util.log10( concentration );
    } );
  }

  /**
   * @param {Property<Number>} concentrationProperty
   * @param {Range} concentrationRange
   * @constructor
   */
  function ConcentrationControl( concentrationProperty, concentrationRange ) {

    // readout
    var readoutText = new Text( Util.toFixed( concentrationProperty.value, DECIMAL_PLACES ), { font: READOUT_FONT } );
    var readoutBackground = new Rectangle( 0, 0, 1.25 * readoutText.width, 1.25 * readoutText.height, 4, 4, { fill: 'white' } );
    var readoutNode = new Node( { children: [ readoutBackground, readoutText ] } );
    readoutText.center = readoutBackground.center;

    // slider
    var slider = new ConcentrationSlider( concentrationProperty, concentrationRange );

    // arrow buttons
    var leftArrowButton = new ArrowButton( 'left', function() {
      concentrationProperty.value = Math.max( concentrationProperty.value - ARROW_STEP, concentrationRange.min );
    }, ARROW_BUTTON_OPTIONS );
    var rightArrowButton = new ArrowButton( 'right', function() {
      concentrationProperty.value = Math.min( concentrationProperty.value + ARROW_STEP, concentrationRange.max );
    }, ARROW_BUTTON_OPTIONS );
    concentrationProperty.link( function( concentration ) {
      leftArrowButton.setEnabled( concentration > concentrationRange.min );
      rightArrowButton.setEnabled( concentration < concentrationRange.max );
    } );

    VBox.call( this, {
      resize: false,
      align: 'center',
      spacing: 8,
      children: [
        new HBox( {
          spacing: 8,
          children: [ leftArrowButton, readoutNode, rightArrowButton ]
        } ),
        slider
      ]
    } );

    // update the readout text when concentration value changes
    concentrationProperty.link( function( concentration ) {
      readoutText.text = Util.toFixed( concentration, DECIMAL_PLACES );
    } );
  }

  return inherit( VBox, ConcentrationControl );
} );