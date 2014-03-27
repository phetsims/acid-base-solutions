// Copyright 2002-2014, University of Colorado Boulder

/**
 * Slider for controlling strength.
 * Adapts a linear slider to a logarithmic strength range.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var strongerString = require( 'string!ACID_BASE_SOLUTIONS/stronger' );
  var weakerString = require( 'string!ACID_BASE_SOLUTIONS/weaker' );

  // constants
  var WEAK_STRENGTH_RANGE = ABSConstants.WEAK_STRENGTH_RANGE;
  var TICK_LABEL_OPTIONS = { font: new PhetFont( 12 ) };

  /**
   * Model for the strength slider.
   * Maps between the linear slider and the logarithmic range of strength.
   * Implemented as an inner type because this is internal to the slider.
   *
   * @param {Property<Number>} strengthProperty
   * @constructor
   */
  function Model( strengthProperty ) {

    var self = this;

    // range of slider values
    this.range = new Range( Util.log10( WEAK_STRENGTH_RANGE.min ), Util.log10( WEAK_STRENGTH_RANGE.max ), Util.log10( WEAK_STRENGTH_RANGE.defaultValue ) );

    // slider's value
    this.sliderValueProperty = new Property( Util.log10( strengthProperty.value ) );

    // map between linear and logarithmic
    this.sliderValueProperty.link( function( sliderValue ) {
      strengthProperty.value = Math.pow( 10, sliderValue );
    } );
    strengthProperty.link( function( strength ) {
      self.sliderValueProperty.value = Util.log10( strength );
    } );
  }

  /**
   * @param {Property<Number>} strengthProperty
   * @constructor
   */
  function StrengthSlider( strengthProperty ) {

    var model = new Model( strengthProperty );

    HSlider.call( this, model.sliderValueProperty, model.range, {
      trackSize: new Dimension2( 125, 4 ),
      thumbSize: new Dimension2( 12, 24 ),
      majorTickLength: 12
    } );

    // add ticks
    this.addMajorTick( model.range.min, new Text( weakerString, TICK_LABEL_OPTIONS ) );
    this.addMajorTick( model.range.max, new Text( strongerString, TICK_LABEL_OPTIONS ) );
  }

  return inherit( HSlider, StrengthSlider );
} );