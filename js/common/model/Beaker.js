// Copyright 2014-2021, University of Colorado Boulder

// @ts-nocheck
/**
 * Model for the beaker in 'Acid-Base Solutions' sim.
 * Origin is at bottom center.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

class Beaker {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      size: new Dimension2( 360, 270 ),
      position: new Vector2( 230, 410 )
    }, options );

    this.size = options.size; // @public
    this.position = options.position; // @public

    // @public convenience coordinates
    this.left = this.position.x - this.size.width / 2;
    this.right = this.left + this.size.width;
    this.bottom = this.position.y;
    this.top = this.bottom - this.size.height;

    this.bounds = new Bounds2( this.left, this.top, this.right, this.bottom ); // @public
  }
}

acidBaseSolutions.register( 'Beaker', Beaker );
export default Beaker;