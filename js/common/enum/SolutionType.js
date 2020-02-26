// Copyright 2014-2019, University of Colorado Boulder

/**
 * Possible choices in the 'Solutions' control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );

  const SolutionType = Object.freeze( {
    WATER: 'water',
    STRONG_ACID: 'strongAcid',
    WEAK_ACID: 'weakAcid',
    STRONG_BASE: 'strongBase',
    WEAK_BASE: 'weakBase'
  } );

  return acidBaseSolutions.register( 'SolutionType', SolutionType );
} );