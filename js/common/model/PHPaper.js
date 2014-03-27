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
  var ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' );
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

    // drag bounds
    this.dragBounds = new Bounds2( beaker.left + 20, beaker.top - 20, beaker.right - 20, beaker.bottom - 20 );

    // location
    this.locationProperty = new Property( new Vector2( beaker.right - 60, beaker.top - 10 ) );

    // visibility
    this.visibleProperty = new Property( toolModeProperty.value === ToolMode.PH_PAPER );

    // height of indicator, the portion of the paper that changes color when dipped in solution
    this.indicatorHeightProperty = new Property( 0 );

    toolModeProperty.link( function( toolMode ) {
      self.visibleProperty.value = (toolMode === ToolMode.PH_PAPER);
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
      this.visibleProperty.reset();
      this.indicatorHeightProperty.reset();
    },

    // move to {Vector2} v, constrained to drag bounds
    movePoint: function( v ) {
      this.locationProperty.value = new Vector2(
        Util.clamp( v.x, this.dragBounds.minX, this.dragBounds.maxX ),
        Util.clamp( v.y, this.dragBounds.minY, this.dragBounds.maxY ) );
    },

    /**
     * Updates the height of the indicator. The indicator height only increases, since we want the
     * indicator color to be shown on the paper when it is dipped into solution and pulled out.
     */
    updateIndicatorHeight: function() {
      if ( this.beaker.containsPoint( this.locationProperty.value ) ) {
        this.indicatorHeightProperty.value =
        Util.clamp( this.locationProperty.value.y - this.beaker.top + 5, this.indicatorHeightProperty.value, ABSConstants.PH_PAPER_SIZE.height );
      }
    }
  };

  return PHPaper;
} );