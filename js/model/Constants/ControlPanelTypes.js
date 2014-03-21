// Copyright 2002-2014, University of Colorado Boulder

/**
 * Possible control panel types in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function() {
  'use strict';

  return Object.freeze( {
    SOLUTIONS: 'solutions',
    SOLUTION: 'solution', // control panel for a custom solution
    VIEWS: 'views',
    TESTS: 'tests'
  } );
} );