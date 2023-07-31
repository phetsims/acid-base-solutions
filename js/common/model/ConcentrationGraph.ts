// Copyright 2014-2023, University of Colorado Boulder

/**
 * ConcentrationGraph is the model for the concentration graph.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import Beaker from './Beaker.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import AqueousSolution from './solutions/AqueousSolution.js';

export default class ConcentrationGraph {

  public readonly solutionProperty: TReadOnlyProperty<AqueousSolution>;
  public readonly width: number; // dimensions of the graph's background
  public readonly height: number;
  public readonly position: Vector2; // position, origin at upper-left corner

  public constructor( beaker: Beaker, solutionProperty: ReadOnlyProperty<AqueousSolution> ) {

    this.solutionProperty = solutionProperty;
    this.width = 0.5 * beaker.size.width;
    this.height = 0.9 * beaker.size.height;
    this.position = beaker.position.plusXY( ( this.width - beaker.size.width ) / 2, -( beaker.size.height + this.height ) / 2 );
  }

  public dispose(): void {
    Disposable.assertNotDisposable();
  }
}

acidBaseSolutions.register( 'ConcentrationGraph', ConcentrationGraph );