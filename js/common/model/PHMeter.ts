// Copyright 2014-2021, University of Colorado Boulder

/**
 * pH meter model. Position is at the tip of the probe.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import Beaker from './Beaker.js';

export default class PHMeter {

  public readonly beaker: Beaker;
  public readonly pHProperty: TReadOnlyProperty<number>;
  public readonly dragYRange: Range; // drag range (y coordinate)
  public readonly positionProperty: Property<Vector2>; // position, at tip of probe

  public constructor( beaker: Beaker, pHProperty: TReadOnlyProperty<number> ) {
    this.beaker = beaker;
    this.pHProperty = pHProperty;
    this.dragYRange = new Range( beaker.top - 5, beaker.top + 60 );
    this.positionProperty = new Vector2Property( new Vector2( beaker.right - 65, beaker.top - 5 ) );
  }

  public reset(): void {
    this.positionProperty.reset();
  }

  // Is the tip of the pH probe in solution?
  public inSolution(): boolean {
    return this.beaker.bounds.containsPoint( this.positionProperty.get() );
  }
}

acidBaseSolutions.register( 'PHMeter', PHMeter );