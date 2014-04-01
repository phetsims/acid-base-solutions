// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for the pH paper in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
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
   * @constructor
   */
  function PHPaper( beaker, solutionTypeProperty, pHProperty ) {

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
    var previousSolutionType = null;
    var previousIndicatorHeight = 0;
    this.indicatorHeightProperty = new DerivedProperty( [ solutionTypeProperty, this.locationProperty ],
      function( solutionType, location ) {

        // height will only grow until the solutionType is changed, which clears the paper
        if ( solutionType !== previousSolutionType ) {
          previousSolutionType = solutionType;
          previousIndicatorHeight = 0;
        }

        var indicatorHeight = previousIndicatorHeight;
        if ( self.beaker.containsPoint( location ) ) {
          indicatorHeight = previousIndicatorHeight = Util.clamp( location.y - self.beaker.top + 5, previousIndicatorHeight, self.paperSize.height );
        }

        return indicatorHeight;
      } );
  }

  PHPaper.prototype = {

    reset: function() {
      this.locationProperty.reset();
    }
  };

  return PHPaper;
} );