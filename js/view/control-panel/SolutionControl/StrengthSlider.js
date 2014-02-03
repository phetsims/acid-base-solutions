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
    FONT = new PhetFont( 12 ),
    LN10 = Math.LN10,

  // strings
    weakerString = require( 'string!ACID_BASE_SOLUTIONS/weaker' ),
    strongerString = require( 'string!ACID_BASE_SOLUTIONS/stronger' );

  function StrengthSlider( property, range, coords ) {
    var width = 150,
      tickLength = 10,
      sliderValue = new Property( Math.log( range.defaultValue ) / LN10 ),
      STRENGTH_MIN = Math.log( range.min ) / LN10,
      STRENGTH_MAX = Math.log( range.max ) / LN10,
      tickOffset = 5,
      slider;
    Node.call( this, coords );

    // add horizontal part
    this.addChild( slider = new HSlider( sliderValue, {min: STRENGTH_MIN, max: STRENGTH_MAX}, {
      trackSize: new Dimension2( width, 5 ),
      thumbSize: new Dimension2( 15, 25 ),
      majorTickLength: -15
    } ) );

    // add ticks
    slider.addMajorTick( STRENGTH_MIN, null );
    slider.addMajorTick( STRENGTH_MAX, null );

    sliderValue.link( function( value ) {
      property.value = parseFloat( Math.pow( 10, value ) );
    } );

    // add text
    this.addChild( new Text( weakerString, {font: FONT, centerX: 0, centerY: 2 * tickOffset + tickLength} ) );
    this.addChild( new Text( strongerString, {font: FONT, centerX: width, centerY: 2 * tickOffset + tickLength} ) );
  }

  return inherit( Node, StrengthSlider );
} );