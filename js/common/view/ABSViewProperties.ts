// Copyright 2016-2022, University of Colorado Boulder

/**
 * View-specific Properties
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import { ToolMode, ToolModeValues } from './ToolMode.js';
import { ViewMode, ViewModeValues } from './ViewMode.js';

export default class ABSViewProperties {

  public readonly solventVisibleProperty: Property<boolean>;
  public readonly viewModeProperty: StringUnionProperty<ViewMode>;
  public readonly toolModeProperty: StringUnionProperty<ToolMode>;

  public constructor( tandem: Tandem ) {

    this.solventVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'solventVisibleProperty' )
    } );

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
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
  }

  public reset(): void {
    this.solventVisibleProperty.reset();
    this.viewModeProperty.reset();
    this.toolModeProperty.reset();
  }
}

acidBaseSolutions.register( 'ABSViewProperties', ABSViewProperties );