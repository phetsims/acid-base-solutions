// Copyright 2014-2015, University of Colorado Boulder

/**
 * Slider for controlling strength.
 * Adapts a linear slider to a logarithmic strength range.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var SolutionType = require( 'ACID_BASE_SOLUTIONS/common/enum/SolutionType' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var strongerString = require( 'string!ACID_BASE_SOLUTIONS/stronger' );
  var weakerString = require( 'string!ACID_BASE_SOLUTIONS/weaker' );

  // constants
  var TICK_LABEL_OPTIONS = {
    font: new PhetFont( 12 ),
    maxWidth: 100 // constrain for i18n, determined empirically
  };

  /**
   * @param {Property.<SolutionType>} solutionTypeProperty
   * @param {Property.<number>} strengthProperty
   * @param {Range} strengthRange
   * @constructor
   */
  function StrengthSlider( solutionTypeProperty, strengthProperty, strengthRange ) {

    var model = new SliderModel( solutionTypeProperty, strengthProperty, strengthRange );

    HSlider.call( this, model.sliderValueProperty, model.sliderValueRange, {
      trackSize: new Dimension2( 125, 4 ),
      thumbSize: new Dimension2( 12, 24 ),
      majorTickLength: 12
    } );

    // add ticks
    this.addMajorTick( model.sliderValueRange.min, new Text( weakerString, TICK_LABEL_OPTIONS ) );
    this.addMajorTick( model.sliderValueRange.max, new Text( strongerString, TICK_LABEL_OPTIONS ) );
  }

  acidBaseSolutions.register( 'StrengthSlider', StrengthSlider );

  /**
   * Model for the strength slider.
   * Maps between the linear slider and the logarithmic range of strength.
   * Implemented as an inner type because this is internal to the slider.
   *
   * @param {Property.<SolutionType>} solutionTypeProperty
   * @param {Property.<number>} strengthProperty
   * @param {Range} strengthRange
   * @constructor
   */
  function SliderModel( solutionTypeProperty, strengthProperty, strengthRange ) {

    var self = this;

    // @public range of slider values
    this.sliderValueRange = new Range( Util.log10( strengthRange.min ), Util.log10( strengthRange.max ), Util.log10( strengthRange.defaultValue ) );

    // @public slider's value
    this.sliderValueProperty = new Property( Util.log10( strengthProperty.value ) );

    // map between linear and logarithmic
    this.sliderValueProperty.link( function( sliderValue ) {
      if ( strengthIsMutable( solutionTypeProperty.value ) ) {
        strengthProperty.value = Math.pow( 10, sliderValue );
      }
    } );
    strengthProperty.link( function( strength ) {
      if ( strengthIsMutable( solutionTypeProperty.value ) ) {
        self.sliderValueProperty.value = Util.log10( strength );
      }
    } );
  }

  acidBaseSolutions.register( 'StrengthSlider.SliderModel', SliderModel );

  // issues #94: strength can be changed only for weak solutions, use this as a guard
  var strengthIsMutable = function( solutionType ) {
    return ( solutionType === SolutionType.WEAK_ACID || solutionType === SolutionType.WEAK_BASE );
  };

  return inherit( HSlider, StrengthSlider );
} );