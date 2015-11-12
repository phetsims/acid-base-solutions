// Copyright 2014-2015, University of Colorado Boulder

/**
 * Possible choices in the 'Solutions' control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );

  var SolutionType = Object.freeze( {
    WATER: 'water',
    STRONG_ACID: 'strongAcid',
    WEAK_ACID: 'weakAcid',
    STRONG_BASE: 'strongBase',
    WEAK_BASE: 'weakBase'
  } );

  acidBaseSolutions.register( 'SolutionType', SolutionType );

  return SolutionType;
} );