// Copyright 2014-2019, University of Colorado Boulder

/**
 * pH meter model.
 * Location is at the tip of the probe.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Range = require( 'DOT/Range' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );

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
    this.dragYRange = new Range( beaker.top - 5, beaker.top + 60 );

    // @public location, at tip of probe
    this.locationProperty = new Vector2Property( new Vector2( beaker.right - 65, beaker.top - 5 ) );
  }

  acidBaseSolutions.register( 'PHMeter', PHMeter );

  return inherit( Object, PHMeter, {

    // @public
    reset: function() {
      this.locationProperty.reset();
    },

    // @public Is the tip of the pH probe in solution?
    inSolution: function() {
      return this.beaker.bounds.containsPoint( this.locationProperty.get() );
    }
  } );
} );