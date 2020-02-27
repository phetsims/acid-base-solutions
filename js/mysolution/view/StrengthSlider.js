// Copyright 2014-2020, University of Colorado Boulder

/**
 * Slider for controlling strength.
 * Adapts a linear slider to a logarithmic strength range.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const HSlider = require( 'SUN/HSlider' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );
  const SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Utils = require( 'DOT/Utils' );

  // strings
  const strongerString = require( 'string!ACID_BASE_SOLUTIONS/stronger' );
  const weakerString = require( 'string!ACID_BASE_SOLUTIONS/weaker' );

  // constants
  const TICK_LABEL_OPTIONS = {
    font: new PhetFont( 12 ),
    maxWidth: 100 // constrain for i18n, determined empirically
  };

  class StrengthSlider extends HSlider {

    /**
     * @param {Property.<SolutionType>} solutionTypeProperty
     * @param {Property.<number>} strengthProperty
     * @param {Range} strengthRange
     */
    constructor( solutionTypeProperty, strengthProperty, strengthRange ) {

      const model = new SliderModel( solutionTypeProperty, strengthProperty, strengthRange );

      super( model.sliderValueProperty, model.sliderValueRange, {
        trackSize: new Dimension2( 125, 4 ),
        thumbSize: new Dimension2( 12, 24 ),
        majorTickLength: 12
      } );

      // add ticks
      this.addMajorTick( model.sliderValueRange.min, new Text( weakerString, TICK_LABEL_OPTIONS ) );
      this.addMajorTick( model.sliderValueRange.max, new Text( strongerString, TICK_LABEL_OPTIONS ) );
    }
  }

  acidBaseSolutions.register( 'StrengthSlider', StrengthSlider );

  /**
   * Model for the strength slider. Maps between the linear slider and the logarithmic range of strength.
   * Implemented as an inner type because this is internal to the slider.
   */
  class SliderModel {

    /**
     * @param {Property.<SolutionType>} solutionTypeProperty
     * @param {Property.<number>} strengthProperty
     * @param {RangeWithValue} strengthRange
     */
    constructor( solutionTypeProperty, strengthProperty, strengthRange ) {

      // @public range of slider values
      this.sliderValueRange = new RangeWithValue(
        Utils.log10( strengthRange.min ),
        Utils.log10( strengthRange.max ),
        Utils.log10( strengthRange.defaultValue ) );

      // @public slider's value
      this.sliderValueProperty = new NumberProperty( Utils.log10( strengthProperty.get() ), {
        reentrant: true
      } );

      // map between linear and logarithmic
      this.sliderValueProperty.link( sliderValue => {
        if ( strengthIsMutable( solutionTypeProperty.get() ) ) {
          strengthProperty.set( Math.pow( 10, sliderValue ) );
        }
      } );
      strengthProperty.link( strength => {
        if ( strengthIsMutable( solutionTypeProperty.get() ) ) {
          this.sliderValueProperty.set( Utils.log10( strength ) );
        }
      } );
    }
  }

  // issues #94: strength can be changed only for weak solutions, use this as a guard
  function strengthIsMutable( solutionType ) {
    return ( solutionType === SolutionType.WEAK_ACID || solutionType === SolutionType.WEAK_BASE );
  }

  return StrengthSlider;
} );