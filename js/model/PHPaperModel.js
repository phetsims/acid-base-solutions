// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the pH paper in 'Acid Base Solutions' sim.
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
    Constants = require( 'ACID_BASE_SOLUTIONS/model/Constants/Constants' ),

  // constants
    PAPER_LENGTH = 4 * Constants.PH_COLOR_KEY_RECT_HEIGHT;

  function PHPaperModel( beakerModel, solutionProperty, pHProperty, testModeProperty ) {
    var self = this;

    // pH test location
    this.location = beakerModel.location.plusXY( -beakerModel.width / 2 + 20, -beakerModel.height - 115 );

    // pH paper location
    this.paperLocation = new Property( this.location.plusXY( -57.5, -25 ) );

    // length of pH paper
    this.length = PAPER_LENGTH;

    // drag range of pH paper
    this.dragBounds = new Bounds2(
      this.paperLocation.value.x - beakerModel.width + 85,
      this.paperLocation.value.y - 5,
      this.paperLocation.value.x + 50,
      this.paperLocation.value.y + beakerModel.height
    );

    // water surface level
    this.waterSurface = beakerModel.location.y - beakerModel.height - 132;

    // pH property
    this.pH = pHProperty;

    // test mode property
    this.testMode = testModeProperty;

    // visibility of pH paper
    this.visibility = new Property( testModeProperty.value === TestModes.PH_PAPER );

    // height of indicator paper
    this.indicatorHeight = new Property( 0 );

    // add observers
    testModeProperty.link( function( testMode ) {
      self.visibility.value = (testMode === TestModes.PH_PAPER);
    } );

    solutionProperty.link( function() {
      self.indicatorHeight.value = 0;
      self.setIndicatorHeight();
    } );

    this.paperLocation.link( function() {
      self.setIndicatorHeight();
    } );
  }

  PHPaperModel.prototype = {
    reset: function() {
      this.paperLocation.reset();
      this.visibility.reset();
      this.indicatorHeight.reset();
    },
    move: function( v ) {
      // check limitation
      this.paperLocation.value = new Vector2( Util.clamp(
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
      if ( this.paperLocation.value.y > this.waterSurface ) {
        this.indicatorHeight.value = Util.clamp(
          this.paperLocation.value.y - this.waterSurface + 5,
          this.indicatorHeight.value,
          PAPER_LENGTH
        );
      }
    }
  };

  return PHPaperModel;
} );