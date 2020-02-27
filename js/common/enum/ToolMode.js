// Copyright 2014-2020, University of Colorado Boulder

/**
 * Possible choices in the 'Tools' control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import acidBaseSolutions from '../../acidBaseSolutions.js';

const ToolMode = Object.freeze( {
  PH_METER: 'pHMeter',
  PH_PAPER: 'pHPaper',
  CONDUCTIVITY: 'conductivity'
} );

acidBaseSolutions.register( 'ToolMode', ToolMode );
export default ToolMode;