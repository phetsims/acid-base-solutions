// Copyright 2014-2023, University of Colorado Boulder

/**
 * PHMeter is the model of a movable pH meter. Position is at the tip of the probe.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import Beaker from './Beaker.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';

export default class PHMeter extends PhetioObject {

  public readonly beaker: Beaker;
  public readonly pHProperty: TReadOnlyProperty<number>;
  public readonly dragYRange: Range; // drag range (y coordinate)
  public readonly positionProperty: Property<Vector2>; // position, at tip of probe
  public readonly isInSolutionProperty: TReadOnlyProperty<boolean>; // Is the tip of the pH probe in solution?

  public constructor( beaker: Beaker, pHProperty: ReadOnlyProperty<number>, tandem: Tandem ) {

    super( {
      isDisposable: false,
      tandem: tandem,
      phetioState: false,
      phetioFeatured: true
    } );

    this.beaker = beaker;
    this.pHProperty = pHProperty;
    this.dragYRange = new Range( beaker.top - 5, beaker.top + 60 );

    this.positionProperty = new Vector2Property( new Vector2( beaker.right - 65, beaker.top - 5 ), {
      tandem: tandem.createTandem( 'positionProperty' ),
      phetioReadOnly: true // because position is constrained to dragYRange
    } );

    this.isInSolutionProperty = new DerivedProperty( [ this.positionProperty ],
      position => this.beaker.bounds.containsPoint( this.positionProperty.value ), {
        tandem: tandem.createTandem( 'isInSolutionProperty' ),
        phetioValueType: BooleanIO,
        phetioFeatured: true
      } );

    this.addLinkedElement( pHProperty );
  }

  public reset(): void {
    this.positionProperty.reset();
  }

  /**
   * Gets the drag bounds, constrained to vertical dragging.
   */
  public get dragBounds(): Bounds2 {
    const x = this.positionProperty.value.x;
    return new Bounds2( x, this.dragYRange.min, x, this.dragYRange.max );
  }
}

acidBaseSolutions.register( 'PHMeter', PHMeter );