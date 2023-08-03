// Copyright 2014-2023, University of Colorado Boulder

/**
 * Beaker is the model for the beaker shape. The origin is at the bottom center.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '../../../../axon/js/Disposable.js';
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

  public readonly size: Dimension2; // dimensions, excluding the rim at the top of the beaker
  public readonly position: Vector2; // bottom-center of the beaker

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
    Disposable.assertNotDisposable();
  }
}

acidBaseSolutions.register( 'Beaker', Beaker );