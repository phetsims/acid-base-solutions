// Copyright 2002-2013, University of Colorado Boulder

/**
 * pH meter model.
 * Location is at the tip of the probe.
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

  function PHMeter( beaker, pHProperty, testModeProperty ) {
    var self = this;

    this.beaker = beaker;

    // location, at tip of probe
    this.locationProperty = new Property( beaker.location.plusXY( beaker.size.width / 2 - 85, -beaker.size.height - 5 ) );

    // drag range (y coordinate)
    this.dragRange = new Range( this.locationProperty.value.y - 10, this.locationProperty.value.y + 75 );

    // pH property
    this.pHProperty = pHProperty;

    // visibility of pH meter
    this.visibleProperty = new Property( testModeProperty.value === TestModes.PH_METER );

    testModeProperty.link( function( testMode ) {
      self.visibleProperty.value = ( testMode === TestModes.PH_METER );
    } );
  }

  PHMeter.prototype = {

    reset: function() {
      this.locationProperty.reset();
      this.visibleProperty.reset();
    },

    moveY: function( y ) {
      this.locationProperty.value = new Vector2( this.locationProperty.value.x,
        Util.clamp( y, this.dragRange.min, this.dragRange.max ) );  // constrain to drag bounds
    },

    // Is the tip of the pH probe in solution?
    inSolution: function() {
      return this.beaker.containsPoint( this.locationProperty.value );
    }
  };

  return PHMeter;
} );