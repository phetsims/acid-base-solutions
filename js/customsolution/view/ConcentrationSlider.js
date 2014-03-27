// Copyright 2002-2014, University of Colorado Boulder

/**
 * This class presents a slider for the user
 * that allows them to change a initial concentration value.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // Imports
  var ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' ),
    ArrowButton = require( 'SCENERY_PHET/ArrowButton' ),
    Dimension2 = require( 'DOT/Dimension2' ),
    inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Panel = require( 'SUN/Panel' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Property = require( 'AXON/Property' ),
    Range = require( 'DOT/Range' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    Text = require( 'SCENERY/nodes/Text' ),
    HSlider = require( 'SUN/HSlider' ),
    StringUtils = require( 'PHETCOMMON/util/StringUtils' ),
    Util = require( 'DOT/Util' );

  // strings
  var molesPerLiterString = require( 'string!ACID_BASE_SOLUTIONS/molesPerLiter' );
  var pattern_0value_1concentration = require( 'string!ACID_BASE_SOLUTIONS/pattern.0value.1concentration' );

  // constants
  var CONCENTRATION_RANGE = ABSConstants.CONCENTRATION_RANGE;
  var ARROW_HEIGHT = 15;
  var READOUT_FONT = new PhetFont( 14 );
  var ARROW_BUTTON_OPTIONS = {arrowHeight: ARROW_HEIGHT, arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2 };

  /**
   * Model for the concentration slider.
   * Maps between the linear slider and the logarithmic range of concentration.
   * Implemented as an inner type because this is internal to the slider.
   *
   * @param {Property<Number>} concentrationProperty
   * @constructor
   */
  function Model( concentrationProperty ) {
    var self = this;

    this.concentrationProperty = concentrationProperty;

    // range of slider
    this.range = new Range( Util.log10( CONCENTRATION_RANGE.min ), Util.log10( CONCENTRATION_RANGE.max ), Util.log10( CONCENTRATION_RANGE.defaultValue ) );

    // property for slider value
    this.sliderValueProperty = new Property( Util.log10( concentrationProperty.value ) );

    // concentration step for arrow button
    this.arrowStep = 0.1;

    this.sliderValueProperty.link( function( sliderValue ) {
      self.concentrationProperty.value = Math.pow( 10, sliderValue );
    } );
    concentrationProperty.link( function( concentration  ) {
      self.sliderValueProperty.value = Util.log10( concentration );
    } );
  }

  /**
   * @param {Property<Number>} concentrationProperty
   * @constructor
   */
  function ConcentrationSlider( concentrationProperty ) {

    var model = new Model( concentrationProperty );

    var range = model.range,
      sliderValueProperty = model.sliderValueProperty,
      readoutText = new Text( StringUtils.format( pattern_0value_1concentration, Util.toFixed( concentrationProperty.value, 3 ), molesPerLiterString ), { font: READOUT_FONT } ),
      readoutBackground = new Rectangle( 0, 0, readoutText.width * 2.5, readoutText.height * 1.5 ),
      panelContent = new Node(),
      slider,
      leftArrowButton,
      rightArrowButton;
    Node.call( this, {scale: 0.85} );

    // add the readout, including the background
    panelContent.addChild( readoutBackground );
    readoutText.centerY = readoutBackground.centerY - 2;
    panelContent.addChild( readoutText );

    // create and add the slider
    slider = new HSlider( sliderValueProperty, range, {
      thumbSize: new Dimension2( 15, 25 ),
      majorTickLength: 15,
      tickLabelSpacing: 2
    } );
    panelContent.addChild( slider );
    for ( var i = 0, step = (range.max - range.min) / 3; i < 4; i++ ) {
      slider.addMinorTick( range.min + step * i, null );
    }

    // create and add the arrow buttons
    leftArrowButton = new ArrowButton( 'left', function() {
      sliderValueProperty.value = Math.max( sliderValueProperty.value - model.arrowStep, range.min );
    }, ARROW_BUTTON_OPTIONS );
    panelContent.addChild( leftArrowButton );
    rightArrowButton = new ArrowButton( 'right', function() {
      sliderValueProperty.value = Math.min( sliderValueProperty.value + model.arrowStep, range.max );
    }, ARROW_BUTTON_OPTIONS );
    panelContent.addChild( rightArrowButton );

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
      readoutText.text = StringUtils.format( pattern_0value_1concentration, Util.toFixed( value, 3 ), molesPerLiterString );
    } );
  }

  return inherit( Node, ConcentrationSlider );
} );