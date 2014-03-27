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
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var WIRES_INITIAL_Y = 60,
    WIRE_OPTIONS = {
      positive: {
        start: {x: 125, y: 84},
        end: {x: 163, y: WIRES_INITIAL_Y}
      },
      negative: {
        start: {x: 16, y: 75},
        end: {x: -22, y: WIRES_INITIAL_Y}
      }
    };

  /**
   * @param {Beaker} beaker
   * @param {Property<ToolMode>} toolModeProperty
   * @param {Property<Number>} brightnessProperty
   * @constructor
   */
  function ConductivityTestModel( beaker, toolModeProperty, brightnessProperty ) {
    var self = this;

    this.beaker = beaker;

    this.probeDragYRange = new Range( beaker.top - 20, beaker.bottom );

    // bulb and battery location
    this.location = new Vector2( beaker.location.x, beaker.top - 40 );

    // probe locations
    this.positiveProbeLocation = new Property( new Vector2( beaker.left + 40, this.probeDragYRange.min ) );
    this.negativeProbeLocation = new Property( new Vector2( beaker.right - 40, this.probeDragYRange.min ) );

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

  ConductivityTestModel.prototype = {

    reset: function() {
      this.visibleProperty.reset();
      this.isClosedProperty.reset();
      this.positiveProbeLocation.reset();
      this.negativeProbeLocation.reset();
    },

    // the circuit is closed if both probes are in the solution
    isClosed: function() {
      return ( this.beaker.containsPoint( this.positiveProbeLocation.value ) &&  this.beaker.containsPoint( this.negativeProbeLocation.value ) );
    },

    getWireOptions: function() {
      return WIRE_OPTIONS;
    }
  };

  return ConductivityTestModel;
} );