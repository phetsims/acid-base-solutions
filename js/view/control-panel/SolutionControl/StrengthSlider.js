// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for strength slider in solution control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' ),
    Property = require( 'AXON/Property' ),
    Node = require( 'SCENERY/nodes/Node' ),
    HSlider = require( 'SUN/HSlider' ),
    Dimension2 = require( 'DOT/Dimension2' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Util = require( 'DOT/Util' ),

  // strings
    weakerString = require( 'string!ACID_BASE_SOLUTIONS/weaker' ),
    strongerString = require( 'string!ACID_BASE_SOLUTIONS/stronger' ),

  // constants
    FONT = new PhetFont( 14 ),
    SLIDER_TRACK_WIDTH = 150,
    SLIDER_TICK_OFFSET = 5,
    SLIDER_TICK_LENGTH = 10;

  function StrengthSlider( strengthProperty, range, coords ) {
    var sliderProperty = new Property( Util.log10( range.defaultValue ) ),
      STRENGTH_MIN = Util.log10( range.min ),
      STRENGTH_MAX = Util.log10( range.max ),
      slider;
    Node.call( this, coords );
    this.scale( 0.83 );
    this.property = sliderProperty;

    // add horizontal part
    this.addChild( slider = new HSlider( sliderProperty, {min: STRENGTH_MIN, max: STRENGTH_MAX}, {
      trackSize: new Dimension2( SLIDER_TRACK_WIDTH, 5 ),
      thumbSize: new Dimension2( 15, 25 ),
      majorTickLength: -15
    } ) );

    // add ticks
    slider.addMajorTick( STRENGTH_MIN, null );
    slider.addMajorTick( STRENGTH_MAX, null );

    // add text
    this.addChild( new Text( weakerString, {font: FONT, centerX: 0, centerY: 2 * SLIDER_TICK_OFFSET + SLIDER_TICK_LENGTH} ) );
    this.addChild( new Text( strongerString, {font: FONT, centerX: SLIDER_TRACK_WIDTH, centerY: 2 * SLIDER_TICK_OFFSET + SLIDER_TICK_LENGTH} ) );

    sliderProperty.link( function( value ) {
      strengthProperty.value = Math.pow( 10, value );
    } );

    strengthProperty.link( function( value ) {
      sliderProperty.value = Util.log10( value );
    } );
  }

  return inherit( Node, StrengthSlider );
} );