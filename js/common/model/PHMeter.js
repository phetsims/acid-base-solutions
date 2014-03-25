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
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var TestMode = require( 'ACID_BASE_SOLUTIONS/common/enum/TestMode' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Beaker} beaker
   * @param {Property<Number>} pHProperty
   * @param {Property<TestsMode>} testModeProperty
   * @constructor
   */
  function PHMeter( beaker, pHProperty, testModeProperty ) {

    var self = this;

    this.beaker = beaker;
    this.pHProperty = pHProperty;

    // drag range (y coordinate)
    this.dragRange = new Range( beaker.top - 15, beaker.top + 75 );

    // location, at tip of probe
    this.locationProperty = new Property( new Vector2( beaker.right - 85, beaker.top - 5 ) );

    // visibility
    this.visibleProperty = new Property( testModeProperty.value === TestMode.PH_METER );

    testModeProperty.link( function( testMode ) {
      self.visibleProperty.value = ( testMode === TestMode.PH_METER );
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