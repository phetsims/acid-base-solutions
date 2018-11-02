// Copyright 2014-2017, University of Colorado Boulder

/**
 * Model for the pH paper in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Beaker} beaker
   * @param {Property.<SolutionType>} solutionTypeProperty
   * @param {Property.<number>} pHProperty
   * @constructor
   */
  function PHPaper( beaker, solutionTypeProperty, pHProperty ) {

    var self = this;

    // @public
    this.beaker = beaker;
    this.pHProperty = pHProperty;
    this.paperSize = new Dimension2( 16, 110 );

    // @public drag bounds
    this.dragBounds = new Bounds2(
      beaker.left + this.paperSize.width / 2, beaker.top - 20,
      beaker.right - this.paperSize.width / 2, beaker.bottom );

    // @public location
    this.locationProperty = new Property( new Vector2( beaker.right - 60, beaker.top - 10 ) );

    // @public
    // NOTE: Ideally, indicatorHeight should be a DerivedProperty, but that gets quite messy.
    // height of indicator, the portion of the paper that changes color when dipped in solution
    this.indicatorHeightProperty = new NumberProperty( 0 );

    // clear the indicator color from the paper and recompute its height
    var resetIndicator = function() {
      self.indicatorHeightProperty.set( 0 );
      self.updateIndicatorHeight();
    };
    solutionTypeProperty.link( resetIndicator );
    pHProperty.link( resetIndicator );

    this.locationProperty.link( function() {
      self.updateIndicatorHeight();
    } );
  }

  acidBaseSolutions.register( 'PHPaper', PHPaper );

  return inherit( Object, PHPaper, {

    // @public
    reset: function() {
      this.indicatorHeightProperty.reset();
      this.locationProperty.reset();
    },

    /**
     * Updates the height of the indicator. The indicator height only increases, since we want the
     * indicator color to be shown on the paper when it is dipped into solution and pulled out.
     * @private
     */
    updateIndicatorHeight: function() {
      if ( this.beaker.bounds.containsPoint( this.locationProperty.get() ) ) {
        var height = Util.clamp( this.locationProperty.get().y - this.beaker.top + 5, this.indicatorHeightProperty.get(), this.paperSize.height );
        this.indicatorHeightProperty.set( height );
      }
    }
  } );
} );