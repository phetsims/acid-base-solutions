// Copyright 2014-2020, University of Colorado Boulder

/**
 * Possible choices in the 'Views' control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

const ViewMode = Enumeration.byKeys( [ 'MOLECULES', 'GRAPH', 'HIDE_VIEWS' ] );

acidBaseSolutions.register( 'ViewMode', ViewMode );
export default ViewMode;