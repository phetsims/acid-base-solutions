// Copyright 2014-2022, University of Colorado Boulder

/**
 * Beaker is the model for the beaker. The origin is at the bottom center.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

type SelfOptions = {
  size?: Dimension2;
  position?: Vector2;
};

type BeakerOptions = SelfOptions;

export default class Beaker {

  public readonly size: Dimension2;
  public readonly position: Vector2;

  // convenience fields related to size and position
  public readonly left: number;
  public readonly right: number;
  public readonly top: number;
  public readonly bottom: number;

  public readonly bounds: Bounds2;

  public constructor( providedOptions?: BeakerOptions ) {

    const options = optionize<BeakerOptions, SelfOptions>()( {
      size: new Dimension2( 360, 270 ),
      position: new Vector2( 230, 410 )
    }, providedOptions );

    this.size = options.size;
    this.position = options.position;
    this.left = this.position.x - this.size.width / 2;
    this.right = this.left + this.size.width;
    this.bottom = this.position.y;
    this.top = this.bottom - this.size.height;

    this.bounds = new Bounds2( this.left, this.top, this.right, this.bottom );
  }

  public dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
  }
}

acidBaseSolutions.register( 'Beaker', Beaker );