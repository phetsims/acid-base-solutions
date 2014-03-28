// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for the pH paper in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var Bounds2 = require( 'DOT/Bounds2' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Property = require( 'AXON/Property' );
  var ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Beaker} beaker
   * @param {Property<SolutionType>} solutionTypeProperty
   * @param {Property<Number>} pHProperty
   * @param {Property<ToolMode>} toolModeProperty
   * @constructor
   */
  function PHPaper( beaker, solutionTypeProperty, pHProperty, toolModeProperty ) {

    var self = this;

    this.beaker = beaker;
    this.pHProperty = pHProperty;

    this.paperSize = new Dimension2( 14, 110 );

    // drag bounds
    this.dragBounds = new Bounds2(
      beaker.left + this.paperSize.width/2, beaker.top - 20,
      beaker.right - this.paperSize.width/2, beaker.bottom );

    // location
    this.locationProperty = new Property( new Vector2( beaker.right - 60, beaker.top - 10 ) );

    // height of indicator, the portion of the paper that changes color when dipped in solution
    this.indicatorHeightProperty = new Property( 0 );

    // visibility
    this.visibleProperty = new DerivedProperty( [ toolModeProperty ],
      function( toolMode ) {
        return ( toolMode === ToolMode.PH_PAPER );
      } );

    solutionTypeProperty.link( function() {
      self.indicatorHeightProperty.value = 0; // clear the indicator color from the paper
      self.updateIndicatorHeight();
    } );

    this.locationProperty.link( function() {
      self.updateIndicatorHeight();
    } );
  }

  PHPaper.prototype = {

    reset: function() {
      this.locationProperty.reset();
      this.indicatorHeightProperty.reset();
    },

    /**
     * Updates the height of the indicator. The indicator height only increases, since we want the
     * indicator color to be shown on the paper when it is dipped into solution and pulled out.
     */
    updateIndicatorHeight: function() {
      if ( this.beaker.containsPoint( this.locationProperty.value ) ) {
        this.indicatorHeightProperty.value =
        Util.clamp( this.locationProperty.value.y - this.beaker.top + 5, this.indicatorHeightProperty.value, this.paperSize.height );
      }
    }
  };

  return PHPaper;
} );