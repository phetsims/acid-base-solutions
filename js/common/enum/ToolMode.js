// Copyright 2014-2020, University of Colorado Boulder

/**
 * Possible choices in the 'Tools' control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

const ToolMode = Enumeration.byKeys( [ 'PH_METER', 'PH_PAPER', 'CONDUCTIVITY' ] );

acidBaseSolutions.register( 'ToolMode', ToolMode );
export default ToolMode;