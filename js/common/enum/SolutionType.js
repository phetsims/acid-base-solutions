// Copyright 2014-2020, University of Colorado Boulder

/**
 * Possible choices in the 'Solutions' control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import acidBaseSolutions from '../../acidBaseSolutions.js';

const SolutionType = Object.freeze( {
  WATER: 'water',
  STRONG_ACID: 'strongAcid',
  WEAK_ACID: 'weakAcid',
  STRONG_BASE: 'strongBase',
  WEAK_BASE: 'weakBase'
} );

acidBaseSolutions.register( 'SolutionType', SolutionType );
export default SolutionType;