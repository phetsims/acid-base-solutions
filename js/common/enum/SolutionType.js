// Copyright 2014-2020, University of Colorado Boulder

/**
 * Possible choices in the 'Solutions' control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

const SolutionType = Enumeration.byKeys( [
  'WATER',
  'STRONG_ACID',
  'WEAK_ACID',
  'STRONG_BASE',
  'WEAK_BASE'
] );

acidBaseSolutions.register( 'SolutionType', SolutionType );
export default SolutionType;