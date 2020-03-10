// Copyright 2016-2020, University of Colorado Boulder

/**
 * View-specific Properties
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ToolMode from '../enum/ToolMode.js';
import ViewMode from '../enum/ViewMode.js';

class ABSViewProperties {

  constructor() {

    // @public
    this.solventVisibleProperty = new BooleanProperty( false );
    this.viewModeProperty = new StringProperty( ViewMode.MOLECULES );
    this.toolModeProperty = new EnumerationProperty( ToolMode, ToolMode.PH_METER );
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