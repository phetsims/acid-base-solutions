// Copyright 2022, University of Colorado Boulder

/**
 * AtomNode renders an atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { Circle, CircleOptions, Color, RadialGradient } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

type SelfOptions = EmptySelfOptions;

type AtomNodeOptions = SelfOptions & StrictOmit<CircleOptions, 'radius' | 'fill'>;

export default class AtomNode extends Circle {

  public constructor( radius: number, color: Color | string, providedOptions?: AtomNodeOptions ) {

    const gradient = new RadialGradient( -radius * 0.2, -radius * 0.3, 0.25, -radius * 0.2, -radius * 0.3, radius * 2 )
      .addColorStop( 0, 'white' )
      .addColorStop( 0.33, color )
      .addColorStop( 1, 'black' );

    const options = optionize<AtomNodeOptions, SelfOptions, CircleOptions>()( {
      fill: gradient
    }, providedOptions );

    super( radius, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

acidBaseSolutions.register( 'AtomNode', AtomNode );
