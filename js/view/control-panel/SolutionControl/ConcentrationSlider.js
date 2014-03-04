// Copyright 2002-2014, University of Colorado Boulder

/**
 * This class presents a slider for the user
 * that allows them to change a initial concentration value.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // Imports
  var ArrowButton = require( 'SCENERY_PHET/ArrowButton' ),
    Dimension2 = require( 'DOT/Dimension2' ),
    inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Panel = require( 'SUN/Panel' ),
    Property = require( 'AXON/Property' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    Text = require( 'SCENERY/nodes/Text' ),
    HSlider = require( 'SUN/HSlider' ),
    StringUtils = require( 'PHETCOMMON/util/StringUtils' ),
    Util = require( 'DOT/Util' ),

  // constants
    READOUT_FONT = new PhetFont( 14 ),
    ARROW_HEIGHT = 15,

  // strings
    pattern_0value_1concentration = require( 'string!ACID_BASE_SOLUTIONS/pattern.0value.1concentration' ),
    molesPerLiterString = require( 'string!ACID_BASE_SOLUTIONS/molesPerLiter' ),

    arrowButtonOptions = { arrowHeight: ARROW_HEIGHT, arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2 };

  function ConcentrationSlider( concentrationProperty, range ) {
    var CONCENTRATION_MIN = Util.log10( range.min ),
      CONCENTRATION_MAX = Util.log10( range.max ),
      CONCENTRATION_STEP = 0.1,
      sliderProperty = new Property( Util.log10( range.defaultValue ) ),
      readoutText = new Text( StringUtils.format( pattern_0value_1concentration, Util.toFixed( concentrationProperty.value, 3 ), molesPerLiterString ), { font: READOUT_FONT } ),
      readoutBackground = new Rectangle( 0, 0, readoutText.width * 2.5, readoutText.height * 1.5 ),
      panelContent = new Node(),
      slider,
      leftArrowButton,
      rightArrowButton;
    Node.call( this, {scale: 0.85} );
    this.property = sliderProperty;

    // add the readout, including the background
    panelContent.addChild( readoutBackground );
    readoutText.centerY = readoutBackground.centerY - 2;
    panelContent.addChild( readoutText );

    // create and add the slider
    slider = new HSlider( sliderProperty, { min: CONCENTRATION_MIN, max: CONCENTRATION_MAX }, {
      thumbSize: new Dimension2( 15, 25 ),
      majorTickLength: 15,
      tickLabelSpacing: 2
    } );
    panelContent.addChild( slider );
    for ( var i = 0, step = (CONCENTRATION_MAX - CONCENTRATION_MIN) / 3; i < 4; i++ ) {
      slider.addMinorTick( CONCENTRATION_MIN + step * i, null );
    }

    // create and add the arrow buttons
    leftArrowButton = new ArrowButton( 'left', function() {
      sliderProperty.value = Math.max( sliderProperty.value - CONCENTRATION_STEP, CONCENTRATION_MIN );
    }, arrowButtonOptions );
    panelContent.addChild( leftArrowButton );
    rightArrowButton = new ArrowButton( 'right', function() {
      sliderProperty.value = Math.min( sliderProperty.value + CONCENTRATION_STEP, CONCENTRATION_MAX );
    }, arrowButtonOptions );
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

    // update the readout text whenever the value changes
    sliderProperty.link( function( value ) {
      concentrationProperty.value = Math.pow( 10, value );
    } );

    concentrationProperty.link( function( value ) {
      readoutText.text = StringUtils.format( pattern_0value_1concentration, Util.toFixed( value, 3 ), molesPerLiterString );
      sliderProperty.value = Util.log10( value );
    } );
  }

  return inherit( Node, ConcentrationSlider );
} );