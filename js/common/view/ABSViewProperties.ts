// Copyright 2016-2023, University of Colorado Boulder

/**
 * ABSViewProperties is the set of view-specific Properties for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import { ToolMode, ToolModeValues } from './ToolMode.js';
import { ViewMode, ViewModeValues } from './ViewMode.js';

export default class ABSViewProperties {

  // Which representation of the solution appears in the beaker
  public readonly viewModeProperty: StringUnionProperty<ViewMode>;

  // Which tool is selected for measuring the pH of the solution
  public readonly toolModeProperty: StringUnionProperty<ToolMode>;

  public constructor( tandem: Tandem ) {

    this.viewModeProperty = new StringUnionProperty( 'particles', {
      validValues: ViewModeValues,
      tandem: tandem.createTandem( 'viewModeProperty' )
    } );

    this.toolModeProperty = new StringUnionProperty( 'pHMeter', {
      validValues: ToolModeValues,
      tandem: tandem.createTandem( 'toolModeProperty' )
    } );
  }

  public dispose(): void {
    Disposable.assertNotDisposable();
  }

  public reset(): void {
    this.viewModeProperty.reset();
    this.toolModeProperty.reset();
  }
}

acidBaseSolutions.register( 'ABSViewProperties', ABSViewProperties );