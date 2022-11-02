// Copyright 2014-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * Possible choices in the 'Tools' control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import EnumerationDeprecated from '../../../../phet-core/js/EnumerationDeprecated.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

const ToolMode = EnumerationDeprecated.byKeys( [ 'PH_METER', 'PH_PAPER', 'CONDUCTIVITY' ] );

acidBaseSolutions.register( 'ToolMode', ToolMode );
export default ToolMode;