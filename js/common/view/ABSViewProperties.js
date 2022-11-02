// Copyright 2016-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * View-specific Properties
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import { ToolModeValues } from '../enum/ToolMode.js';
import { ViewModeValues } from '../enum/ViewMode.js';

class ABSViewProperties {

  constructor() {

    // @public
    this.solventVisibleProperty = new BooleanProperty( false );
    this.viewModeProperty = new StringEnumerationProperty( 'molecules', {
      validValues: ViewModeValues
    } );
    this.toolModeProperty = new StringEnumerationProperty( 'pHMeter', {
      validValues: ToolModeValues
    } );
  }

  // @public
  reset() {
    this.solventVisibleProperty.reset();
    this.viewModeProperty.reset();
    this.toolModeProperty.reset();
  }
}

acidBaseSolutions.register( 'ABSViewProperties', ABSViewProperties );
export default ABSViewProperties;