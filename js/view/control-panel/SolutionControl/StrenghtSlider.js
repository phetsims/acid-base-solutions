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
    Path = require( 'SCENERY/nodes/Path' ),
    Shape = require( 'KITE/Shape' ),
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
      tickOffset = 5;
    Node.call( this, coords );

    // add ticks
    for ( var i = 0, del = range.max - range.min; i <= del; i += del ) {
      this.addChild( new Path( Shape.lineSegment(
        width * i / del, tickOffset,
        width * i / del, tickOffset + tickLength
      ), {stroke: 'black', lineWidth: 1} ) );
    }

    // add text
    this.addChild( new Text( weakString, {font: FONT, centerX: 0, centerY: 2 * tickOffset + tickLength} ) );
    this.addChild( new Text( strongString, {font: FONT, centerX: width, centerY: 2 * tickOffset + tickLength} ) );

    // add horizontal part
    this.addChild( new HSlider( property, range, {
      trackSize: new Dimension2( width, 2 ),
      thumbSize: new Dimension2( 15, 25 )
    } ) );
  }

  return inherit( Node, StrenghtSlider );
} );