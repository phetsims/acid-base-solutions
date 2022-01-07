// Copyright 2014-2022, University of Colorado Boulder

/**
 * Possible choices in the 'Views' control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import EnumerationDeprecated from '../../../../phet-core/js/EnumerationDeprecated.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

const ViewMode = EnumerationDeprecated.byKeys( [ 'MOLECULES', 'GRAPH', 'HIDE_VIEWS' ] );

acidBaseSolutions.register( 'ViewMode', ViewMode );
export default ViewMode;