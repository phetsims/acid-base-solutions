// Copyright 2014-2022, University of Colorado Boulder

/**
 * Possible choices in the 'Solutions' control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import EnumerationDeprecated from '../../../../phet-core/js/EnumerationDeprecated.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

const SolutionType = EnumerationDeprecated.byKeys( [
  'WATER',
  'STRONG_ACID',
  'WEAK_ACID',
  'STRONG_BASE',
  'WEAK_BASE'
] );

acidBaseSolutions.register( 'SolutionType', SolutionType );
export default SolutionType;