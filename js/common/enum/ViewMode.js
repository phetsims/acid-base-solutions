// Copyright 2014-2020, University of Colorado Boulder

/**
 * Possible choices in the 'Views' control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import acidBaseSolutions from '../../acidBaseSolutions.js';

const ViewMode = Object.freeze( {
  MOLECULES: 'molecules',
  GRAPH: 'graph',
  HIDE_VIEWS: 'hideViews'
} );

acidBaseSolutions.register( 'ViewMode', ViewMode );
export default ViewMode;