// Copyright 2002-2014, University of Colorado Boulder

/**
 *  Conductivity tester model.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Dimension2 = require( 'DOT/Dimension2' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Beaker} beaker
   * @param {Property<ToolMode>} toolModeProperty
   * @param {Property<Number>} brightnessProperty
   * @constructor
   */
  function ConductivityTester( beaker, toolModeProperty, brightnessProperty ) {
    var self = this;

    this.beaker = beaker;

    this.probeDragYRange = new Range( beaker.top - 20, beaker.bottom );

    this.probeSize = new Dimension2( 16, 55 );

    // bulb and battery location
    this.location = new Vector2( beaker.location.x - 45, beaker.top - 30 );

    // probe locations
    var probeXOffset = 0.2 * beaker.size.width; // offset from edge of beaker
    this.negativeProbeLocation = new Property( new Vector2( beaker.left + probeXOffset, this.probeDragYRange.min + 10 ) );
    this.positiveProbeLocation = new Property( new Vector2( beaker.right - probeXOffset, this.probeDragYRange.min + 10 ) );

    // visibility of conductivity test
    this.visibleProperty = new Property( toolModeProperty.value === ToolMode.CONDUCTIVITY );

    // property for indicating closing of electric circuit
    this.isClosedProperty = new Property( this.isClosed() );

    // brightness property
    this.brightnessProperty = brightnessProperty;

    toolModeProperty.link( function( toolMode ) {
      self.visibleProperty.value = (toolMode === ToolMode.CONDUCTIVITY);
    } );

    var updateIsClosed = function() {
      self.isClosedProperty.value = self.isClosed();
    };
    this.positiveProbeLocation.link( updateIsClosed );
    this.negativeProbeLocation.link( updateIsClosed );
  }

  ConductivityTester.prototype = {

    reset: function() {
      this.visibleProperty.reset();
      this.isClosedProperty.reset();
      this.positiveProbeLocation.reset();
      this.negativeProbeLocation.reset();
    },

    // the circuit is closed if both probes are in the solution
    isClosed: function() {
      return ( this.beaker.containsPoint( this.positiveProbeLocation.value ) &&  this.beaker.containsPoint( this.negativeProbeLocation.value ) );
    }
  };

  return ConductivityTester;
} );