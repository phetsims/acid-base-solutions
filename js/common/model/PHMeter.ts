// Copyright 2014-2022, University of Colorado Boulder

/**
 * pH meter model. Position is at the tip of the probe.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import Property from '../../../../axon/js/Property.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import Beaker from './Beaker.js';

export default class PHMeter extends PhetioObject {

  public readonly beaker: Beaker;
  public readonly pHProperty: TReadOnlyProperty<number>;
  public readonly dragYRange: Range; // drag range (y coordinate)
  public readonly positionProperty: Property<Vector2>; // position, at tip of probe

  public constructor( beaker: Beaker, pHProperty: ReadOnlyProperty<number>, tandem: Tandem ) {

    super( {
      tandem: tandem,
      phetioState: false
    } );

    this.beaker = beaker;
    this.pHProperty = pHProperty;
    this.dragYRange = new Range( beaker.top - 5, beaker.top + 60 );

    this.positionProperty = new Vector2Property( new Vector2( beaker.right - 65, beaker.top - 5 ), {
      tandem: tandem.createTandem( 'positionProperty' ),
      phetioReadOnly: true // because position is constrained to dragYRange
    } );

    this.addLinkedElement( pHProperty, {
      tandem: tandem.createTandem( pHProperty.tandem.name )
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public reset(): void {
    this.positionProperty.reset();
  }

  // Is the tip of the pH probe in solution?
  public inSolution(): boolean {
    return this.beaker.bounds.containsPoint( this.positionProperty.value );
  }
}

acidBaseSolutions.register( 'PHMeter', PHMeter );