[object Promise]

/**
 * View-specific Properties
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ToolMode from '../enum/ToolMode.js';
import ViewMode from '../enum/ViewMode.js';

class ABSViewProperties {

  constructor() {

    // @public
    this.solventVisibleProperty = new BooleanProperty( false );
    this.viewModeProperty = new EnumerationProperty( ViewMode, ViewMode.MOLECULES );
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