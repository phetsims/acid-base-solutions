// Copyright 2014-2015, University of Colorado Boulder

/**
 * pH meter model.
 * Location is at the tip of the probe.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Beaker} beaker
   * @param {Property.<number>} pHProperty
   * @constructor
   */
  function PHMeter( beaker, pHProperty ) {

    // @public
    this.beaker = beaker;
    this.pHProperty = pHProperty;

    // @public drag range (y coordinate)
    this.dragYRange = new Range( beaker.top - 15, beaker.top + 70 );

    // @public location, at tip of probe
    this.locationProperty = new Property( new Vector2( beaker.right - 65, beaker.top - 5 ) );
  }

  return inherit( Object, PHMeter, {

    // @public
    reset: function() {
      this.locationProperty.reset();
    },

    // @public Is the tip of the pH probe in solution?
    inSolution: function() {
      return this.beaker.bounds.containsPoint( this.locationProperty.value );
    }
  } );
} );