// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the pH meter in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' ),
    TestModes = require( 'ACID_BASE_SOLUTIONS/model/Constants/TestModes' ),
    Vector2 = require( 'DOT/Vector2' ),
    Range = require( 'DOT/Range' ),
    Util = require( 'DOT/Util' );

  function PHMeterModel( beakerModel, pHProperty, testModeProperty ) {
    var self = this;

    // pH meter location
    this.locationProperty = new Property( beakerModel.location.plusXY( beakerModel.width / 2 - 85, -beakerModel.height - 105 ) );

    //TODO this should be based on beaker bounds, not initial meter position
    // drag range of pH meter
    this.dragRange = new Range( this.locationProperty.value.y - 10, this.locationProperty.value.y + 75 );

    // water surface level
    this.waterSurface = beakerModel.location.y - beakerModel.height - 100;

    // pH property
    this.pHProperty = pHProperty;

    // visibility of pH meter
    this.visibleProperty = new Property( testModeProperty.value === TestModes.PH_METER );

    // visibility of text
    this.textVisibileProperty = new Property( false );

    testModeProperty.link( function( testMode ) {
      self.visibleProperty.value = (testMode === TestModes.PH_METER);
    } );

    this.locationProperty.link( function( location ) {
      self.textVisibileProperty.value = (location.y > self.waterSurface);
    } );
  }

  PHMeterModel.prototype = {

    reset: function() {
      this.locationProperty.reset();
      this.visibleProperty.reset();
      this.textVisibileProperty.reset();
    },

    move: function( yCoord ) {
      // check limitation
      this.locationProperty.value = new Vector2( this.locationProperty.value.x, Util.clamp(
        yCoord,
        this.dragRange.min,
        this.dragRange.max
      ) );
    }
  };

  return PHMeterModel;
} );