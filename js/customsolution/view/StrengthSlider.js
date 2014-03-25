// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for strength slider in solution control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    HSlider = require( 'SUN/HSlider' ),
    Dimension2 = require( 'DOT/Dimension2' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // strings
  var weakerString = require( 'string!ACID_BASE_SOLUTIONS/weaker' ),
    strongerString = require( 'string!ACID_BASE_SOLUTIONS/stronger' );

  // constants
  var FONT = new PhetFont( 12 ),
    SLIDER_TICK_LENGTH = 8,
    SLIDER_TICK_OFFSET = 4,
    SLIDER_TRACK_WIDTH = 125;

  function StrengthSlider( strengthSliderModel, coords ) {
    var range = strengthSliderModel.range,
      sliderValueProperty = strengthSliderModel.sliderValueProperty,
      slider;
    Node.call( this, coords );

    // add horizontal part
    this.addChild( slider = new HSlider( sliderValueProperty, range, {
      trackSize: new Dimension2( SLIDER_TRACK_WIDTH, 4 ),
      thumbSize: new Dimension2( 12, 21 ),
      majorTickLength: -12
    } ) );

    // add ticks
    slider.addMajorTick( range.min, null );
    slider.addMajorTick( range.max, null );

    // add text
    this.addChild( new Text( weakerString, {font: FONT, centerX: 0, centerY: 2 * SLIDER_TICK_OFFSET + SLIDER_TICK_LENGTH} ) );
    this.addChild( new Text( strongerString, {font: FONT, centerX: SLIDER_TRACK_WIDTH, centerY: 2 * SLIDER_TICK_OFFSET + SLIDER_TICK_LENGTH} ) );
  }

  return inherit( Node, StrengthSlider );
} );