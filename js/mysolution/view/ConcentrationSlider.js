// Copyright 2002-2014, University of Colorado Boulder

/**
 * Concentration slider.
 * Adapts a linear slider to a logarithmic concentration range.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // Imports
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  /**
   * Model for the concentration slider.
   * Maps between the linear slider and the logarithmic range of concentration.
   * Implemented as an inner type because this is internal to the slider.
   *
   * @param {Property.<number>} concentrationProperty
   * @param {Range} concentrationRange
   * @constructor
   */
  function SliderModel( concentrationProperty, concentrationRange ) {
    var self = this;

    this.concentrationProperty = concentrationProperty;

    // range of slider
    this.sliderValueRange = new Range( Util.log10( concentrationRange.min ), Util.log10( concentrationRange.max ), Util.log10( concentrationRange.defaultValue ) );

    // property for slider value
    this.sliderValueProperty = new Property( Util.log10( concentrationProperty.value ) );

    this.sliderValueProperty.link( function( sliderValue ) {
      self.concentrationProperty.value = Util.toFixedNumber( Math.pow( 10, sliderValue ), 10 ); // see issue#73
    } );
    concentrationProperty.link( function( concentration  ) {
      self.sliderValueProperty.value = Util.log10( concentration );
    } );
  }

  /**
   * @param {Property.<number>} concentrationProperty
   * @param {Range} concentrationRange
   * @constructor
   */
  function ConcentrationSlider( concentrationProperty, concentrationRange ) {

    var model = new SliderModel( concentrationProperty, concentrationRange );

    HSlider.call( this, model.sliderValueProperty, model.sliderValueRange, {
      trackSize: new Dimension2( 125, 4 ),
      thumbSize: new Dimension2( 12, 24 ),
      majorTickLength: 12,
      tickLabelSpacing: 2
    } );

    // add labels tick marks
    var numberOfTicks = 4;
    for ( var i = 0, step = model.sliderValueRange.getLength() / ( numberOfTicks - 1 ); i < numberOfTicks; i++ ) {
      this.addMajorTick( model.sliderValueRange.min + step * i, new Text( concentrationRange.min * Math.pow( 10, i ), { font: new PhetFont( 10 ) } ) );
    }
  }

  return inherit( HSlider, ConcentrationSlider );
} );