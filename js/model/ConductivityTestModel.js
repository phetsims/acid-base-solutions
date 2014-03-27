// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for the pH meter in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var Range = require( 'DOT/Range' );
  var Property = require( 'AXON/Property' ),
    ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );

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

    this.probeDragYRange = new Range( beaker.top, beaker.bottom );

    // conductivity test location
    this.location = beaker.location.plusXY( -60, -beaker.size.height - 130 );

    // water surface level
    //TODO 60 is a fudge factor, see issue #67
    this.waterSurface = beaker.location.y - beaker.size.height - 60;

    // positive probe y-coordinate
    this.positiveProbeYProperty = new Property( this.probeDragYRange.min );

    // negative probe y-coordinate
    this.negativeProbeYProperty = new Property( this.probeDragYRange.min );

    // visibility of conductivity test
    this.visibleProperty = new Property( toolModeProperty.value === ToolMode.CONDUCTIVITY );

    // property for indicating closing of electric circuit
    this.isClosedProperty = new Property( false );

    // brightness property
    this.brightnessProperty = brightnessProperty;

    toolModeProperty.link( function( toolMode ) {
      self.visibleProperty.value = (toolMode === ToolMode.CONDUCTIVITY);
    } );

    // if both probes in water: isClosedProperty.value === true
    var checkContact = function() {
      self.isClosedProperty.value = ( self.positiveProbeYProperty.value > self.waterSurface && self.negativeProbeYProperty.value > self.waterSurface );
    };
    this.positiveProbeYProperty.link( checkContact );
    this.negativeProbeYProperty.link( checkContact );
  }

  ConductivityTestModel.prototype = {

    reset: function() {
      this.visibleProperty.reset();
      this.isClosedProperty.reset();
      this.positiveProbeYProperty.reset();
      this.negativeProbeYProperty.reset();
    },

    getWireOptions: function() {
      return WIRE_OPTIONS;
    }
  };

  return ConductivityTestModel;
} );