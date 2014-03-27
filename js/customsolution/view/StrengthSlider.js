// Copyright 2002-2014, University of Colorado Boulder

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
  var TICK_LABEL_OPTIONS = { font: new PhetFont( 12 ) };

  function StrengthSlider( strengthSliderModel, coords ) {
    var range = strengthSliderModel.range,
      sliderValueProperty = strengthSliderModel.sliderValueProperty,
      slider;
    Node.call( this, coords );

    // add horizontal part
    this.addChild( slider = new HSlider( sliderValueProperty, range, {
      trackSize: new Dimension2( 125, 4 ),
      thumbSize: new Dimension2( 12, 24 ),
      majorTickLength: 12
    } ) );

    // add ticks
    slider.addMajorTick( range.min, new Text( weakerString, TICK_LABEL_OPTIONS ) );
    slider.addMajorTick( range.max, new Text( strongerString, TICK_LABEL_OPTIONS ) );
  }

  return inherit( Node, StrengthSlider );
} );