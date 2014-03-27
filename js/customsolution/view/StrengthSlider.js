// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for strength slider in solution control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var strongerString = require( 'string!ACID_BASE_SOLUTIONS/stronger' );
  var weakerString = require( 'string!ACID_BASE_SOLUTIONS/weaker' );

  // constants
  var TICK_LABEL_OPTIONS = { font: new PhetFont( 12 ) };

  /**
   * @param {Property<Number>} sliderValueProperty
   * @param {Range} range
   * @constructor
   */
  function StrengthSlider( sliderValueProperty, range ) {

    HSlider.call( this, sliderValueProperty, range, {
      trackSize: new Dimension2( 125, 4 ),
      thumbSize: new Dimension2( 12, 24 ),
      majorTickLength: 12
    } );

    // add ticks
    this.addMajorTick( range.min, new Text( weakerString, TICK_LABEL_OPTIONS ) );
    this.addMajorTick( range.max, new Text( strongerString, TICK_LABEL_OPTIONS ) );
  }

  return inherit( HSlider, StrengthSlider );
} );