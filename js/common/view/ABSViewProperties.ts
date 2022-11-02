// Copyright 2016-2022, University of Colorado Boulder

/**
 * View-specific Properties
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import { ToolMode, ToolModeValues } from '../enum/ToolMode.js';
import { ViewMode, ViewModeValues } from '../enum/ViewMode.js';

export default class ABSViewProperties {

  public readonly solventVisibleProperty: Property<boolean>;
  public readonly viewModeProperty: StringEnumerationProperty<ViewMode>;
  public readonly toolModeProperty: StringEnumerationProperty<ToolMode>;

  public constructor() {

    this.solventVisibleProperty = new BooleanProperty( false );

    this.viewModeProperty = new StringEnumerationProperty( 'molecules', {
      validValues: ViewModeValues
    } );

    this.toolModeProperty = new StringEnumerationProperty( 'pHMeter', {
      validValues: ToolModeValues
    } );
  }

  public reset(): void {
    this.solventVisibleProperty.reset();
    this.viewModeProperty.reset();
    this.toolModeProperty.reset();
  }
}

acidBaseSolutions.register( 'ABSViewProperties', ABSViewProperties );