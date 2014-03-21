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
    this.location = new Property( beakerModel.location.plusXY( beakerModel.width / 2 - 85, -beakerModel.height - 105 ) );

    // drag range of pH meter
    this.dragRange = new Range( this.location.value.y - 10, this.location.value.y + 75 );

    // water surface level
    this.waterSurface = beakerModel.location.y - beakerModel.height - 100;

    // pH property
    this.pH = pHProperty;

    // test mode property
    this.testMode = testModeProperty;

    // visibility of pH meter
    this.visibility = new Property( testModeProperty.value === TestModes.PH_METER );

    // visibility of text
    this.textVisibility = new Property( false );

    testModeProperty.link( function( testMode ) {
      self.visibility.value = (testMode === TestModes.PH_METER);
    } );

    this.location.link( function( location ) {
      self.textVisibility.value = (location.y > self.waterSurface);
    } );
  }

  PHMeterModel.prototype = {
    reset: function() {
      this.location.reset();
      this.visibility.reset();
      this.textVisibility.reset();
    },
    move: function( yCoord ) {
      // check limitation
      this.location.value = new Vector2( this.location.value.x, Util.clamp(
        yCoord,
        this.dragRange.min,
        this.dragRange.max
      ) );
    }
  };

  return PHMeterModel;
} );