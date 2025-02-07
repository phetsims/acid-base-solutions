// Copyright 2022-2025, University of Colorado Boulder

/**
 * AtomNode renders an atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Circle, { CircleOptions } from '../../../../scenery/js/nodes/Circle.js';
import RadialGradient from '../../../../scenery/js/util/RadialGradient.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

type SelfOptions = EmptySelfOptions;

type AtomNodeOptions = SelfOptions & StrictOmit<CircleOptions, 'radius' | 'fill'>;

export default class AtomNode extends Circle {

  public constructor( radius: number, color: TColor, providedOptions?: AtomNodeOptions ) {

    const gradient = new RadialGradient( -radius * 0.2, -radius * 0.3, 0.25, -radius * 0.2, -radius * 0.3, radius * 2 )
      .addColorStop( 0, 'white' )
      .addColorStop( 0.33, color )
      .addColorStop( 1, 'black' );

    const options = optionize<AtomNodeOptions, SelfOptions, CircleOptions>()( {
      fill: gradient,
      isDisposable: false
    }, providedOptions );

    super( radius, options );
  }
}

acidBaseSolutions.register( 'AtomNode', AtomNode );