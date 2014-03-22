// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the pH paper in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' ),
    TestModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/TestModes' ),
    Vector2 = require( 'DOT/Vector2' ),
    Bounds2 = require( 'DOT/Bounds2' ),
    Util = require( 'DOT/Util' ),
    Constants = require( 'ACID_BASE_SOLUTIONS/model/Constants/Constants' );

  // constants
  var PAPER_LENGTH = 4 * Constants.PH_COLOR_KEY_RECT_HEIGHT;

  function PHPaperModel( beakerModel, solutionProperty, pHProperty, testModeProperty ) {
    var self = this;

    // pH test location
    this.location = beakerModel.location.plusXY( -beakerModel.width / 2 + 20, -beakerModel.height - 115 );

    // pH paper location
    this.locationProperty = new Property( this.location.plusXY( -57.5, -25 ) );

    // length of pH paper
    this.length = PAPER_LENGTH;

    // drag range of pH paper
    this.dragBounds = new Bounds2(
      this.locationProperty.value.x - beakerModel.width + 85,
      this.locationProperty.value.y - 5,
      this.locationProperty.value.x + 50,
      this.locationProperty.value.y + beakerModel.height
    );

    // water surface level
    this.waterSurface = beakerModel.location.y - beakerModel.height - 132;

    // pH property
    this.pHProperty = pHProperty;

    // visibility of pH paper
    this.visibleProperty = new Property( testModeProperty.value === TestModes.PH_PAPER );

    // height of indicator paper
    this.indicatorHeightProperty = new Property( 0 );

    // add observers
    testModeProperty.link( function( testMode ) {
      self.visibleProperty.value = (testMode === TestModes.PH_PAPER);
    } );

    solutionProperty.link( function() {
      self.indicatorHeightProperty.value = 0;
      self.setIndicatorHeight();
    } );

    this.locationProperty.link( function() {
      self.setIndicatorHeight();
    } );
  }

  PHPaperModel.prototype = {

    reset: function() {
      this.locationProperty.reset();
      this.visibleProperty.reset();
      this.indicatorHeightProperty.reset();
    },

    move: function( v ) {
      // check limitation
      this.locationProperty.value = new Vector2( Util.clamp(
        v.x,
        this.dragBounds.minX,
        this.dragBounds.maxX
      ), Util.clamp(
        v.y,
        this.dragBounds.minY,
        this.dragBounds.maxY
      ) );
    },

    setIndicatorHeight: function() {
      if ( this.locationProperty.value.y > this.waterSurface ) {
        this.indicatorHeightProperty.value = Util.clamp(
          this.locationProperty.value.y - this.waterSurface + 5,
          this.indicatorHeightProperty.value,
          PAPER_LENGTH
        );
      }
    }
  };

  return PHPaperModel;
} );