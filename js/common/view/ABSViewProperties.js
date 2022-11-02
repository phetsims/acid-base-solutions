// Copyright 2016-2022, University of Colorado Boulder

/**
 * View-specific Properties
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationDeprecatedProperty from '../../../../axon/js/EnumerationDeprecatedProperty.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import { ToolModeValues } from '../enum/ToolMode.js';
import ViewMode from '../enum/ViewMode.js';

class ABSViewProperties {

  constructor() {

    // @public
    this.solventVisibleProperty = new BooleanProperty( false );
    this.viewModeProperty = new EnumerationDeprecatedProperty( ViewMode, ViewMode.MOLECULES );
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