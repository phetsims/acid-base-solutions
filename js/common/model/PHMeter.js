// Copyright 2014-2021, University of Colorado Boulder

/**
 * pH meter model. Position is at the tip of the probe.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

class PHMeter {

  /**
   * @param {Beaker} beaker
   * @param {Property.<number>} pHProperty
   */
  constructor( beaker, pHProperty ) {

    // @public
    this.beaker = beaker;
    this.pHProperty = pHProperty;

    // @public drag range (y coordinate)
    this.dragYRange = new Range( beaker.top - 5, beaker.top + 60 );

    // @public position, at tip of probe
    this.positionProperty = new Vector2Property( new Vector2( beaker.right - 65, beaker.top - 5 ) );
  }

  // @public
  reset() {
    this.positionProperty.reset();
  }

  // @public Is the tip of the pH probe in solution?
  inSolution() {
    return this.beaker.bounds.containsPoint( this.positionProperty.get() );
  }
}

acidBaseSolutions.register( 'PHMeter', PHMeter );
export default PHMeter;