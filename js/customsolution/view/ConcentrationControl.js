// Copyright 2002-2014, University of Colorado Boulder

/**
 * Concentration control. Includes a slider, arrow buttons, and value display.
 * Adapts a linear slider to a logarithmic concentration range.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // Imports
  var ArrowButton = require( 'SCENERY_PHET/ArrowButton' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Util = require( 'DOT/Util' );

  // strings
  var molesPerLiterString = require( 'string!ACID_BASE_SOLUTIONS/molesPerLiter' );
  var pattern_0value_1concentration = require( 'string!ACID_BASE_SOLUTIONS/pattern.0value.1concentration' );

  // constants
  var ARROW_STEP = 0.1; // concentration delta for arrow button
  var ARROW_HEIGHT = 15;
  var READOUT_FONT = new PhetFont( 14 );
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
    concentrationProperty.link( function( concentration  ) {
      self.sliderValueProperty.value = Util.log10( concentration );
    } );
  }

  // Formats a concentration value with units, properly localized.
  var formatConcentration = function( concentration ) {
    return StringUtils.format( pattern_0value_1concentration, Util.toFixed( concentration, DECIMAL_PLACES ), molesPerLiterString );
  };

  /**
   * @param {Property<Number>} concentrationProperty
   * @param {Range} concentrationRange
   * @constructor
   */
  function ConcentrationControl( concentrationProperty, concentrationRange ) {

    var model = new SliderModel( concentrationProperty, concentrationRange );

    Node.call( this, {scale: 0.85} );

    var panelContent = new Node();

    // add the readout, including the background
    var readoutText = new Text( formatConcentration( concentrationProperty.value ), { font: READOUT_FONT } );
    var readoutBackground = new Rectangle( 0, 0, readoutText.width * 2.5, readoutText.height * 1.5 );
    panelContent.addChild( readoutBackground );
    readoutText.centerY = readoutBackground.centerY - 2;
    panelContent.addChild( readoutText );

    // create and add the slider
    var slider = new HSlider( model.sliderValueProperty, model.sliderValueRange, {
      thumbSize: new Dimension2( 15, 25 ),
      majorTickLength: 15,
      tickLabelSpacing: 2
    } );
    panelContent.addChild( slider );
    for ( var i = 0, step = model.sliderValueRange.getLength() / 3; i < 4; i++ ) {
      slider.addMinorTick( model.sliderValueRange.min + step * i, null );
    }

    // arrow buttons
    var leftArrowButton = new ArrowButton( 'left', function() {
      concentrationProperty.value = Math.max( concentrationProperty.value - ARROW_STEP, concentrationRange.min );
    }, ARROW_BUTTON_OPTIONS );
    panelContent.addChild( leftArrowButton );
    var rightArrowButton = new ArrowButton( 'right', function() {
      concentrationProperty.value = Math.min( concentrationProperty.value + ARROW_STEP, concentrationRange.max );
    }, ARROW_BUTTON_OPTIONS );
    panelContent.addChild( rightArrowButton );
    concentrationProperty.link( function( concentration ) {
      leftArrowButton.setEnabled( concentration > concentrationRange.min );
      rightArrowButton.setEnabled( concentration < concentrationRange.max );
    });

    // layout
    readoutBackground.centerX = slider.bounds.width / 2;
    readoutBackground.top = 0;
    slider.left = 0;
    slider.top = readoutBackground.bottom;
    leftArrowButton.right = slider.left - 12;
    leftArrowButton.centerY = slider.centerY;
    rightArrowButton.left = slider.right + 12;
    rightArrowButton.centerY = slider.centerY;
    readoutText.centerX = readoutBackground.centerX;

    // put the contents into a panel
    this.addChild( new Panel( panelContent, {fill: 'rgba(0,0,0,0)', stroke: 'rgba(0,0,0,0)'} ) );

    // update the readout text when concentration value changes
    concentrationProperty.link( function( value ) {
      readoutText.text = formatConcentration( value );
    } );
  }

  return inherit( Node, ConcentrationControl );
} );