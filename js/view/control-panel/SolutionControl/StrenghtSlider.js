// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for strength slider in solution control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    HSlider = require( 'SUN/HSlider' ),
    Range = require( 'DOT/Range' ),
    Dimension2 = require( 'DOT/Dimension2' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONT = new PhetFont( 12 ),

  // strings
    weakString = require( 'string!ACID_BASE_SOLUTIONS/weak' ),
    strongString = require( 'string!ACID_BASE_SOLUTIONS/strong' );

  function StrenghtSlider( property, coords ) {
    var range = new Range( 0, 2, property.get() ),
      width = 150,
      tickLength = 10,
      tickOffset = 5, slider;
    Node.call( this, coords );

    // add horizontal part
    this.addChild( slider = new HSlider( property, range, {
      trackSize: new Dimension2( width, 5 ),
      thumbSize: new Dimension2( 15, 25 ),
      majorTickLength: -15
    } ) );

    // add ticks
    slider.addMajorTick( range.min, null );
    slider.addMajorTick( range.max, null );

    // add text
    this.addChild( new Text( weakString, {font: FONT, centerX: 0, centerY: 2 * tickOffset + tickLength} ) );
    this.addChild( new Text( strongString, {font: FONT, centerX: width, centerY: 2 * tickOffset + tickLength} ) );
  }

  return inherit( Node, StrenghtSlider );
} );