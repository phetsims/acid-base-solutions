// Copyright 2002-2013, University of Colorado Boulder

/**
 * Set of solutions.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var Solutions = require( 'model/Solutions' ),
    WaterSolution = require( './WaterSolution' ),
    StrongAcidSolution = require( './StrongAcidSolution' ),
    WeakAcidSolution = require( './WeakAcidSolution' ),
    StrongBaseSolution = require( './StrongBaseSolution' ),
    WeakBaseSolution = require( './WeakBaseSolution' );

  var AqueousSolutionSet = {};

  AqueousSolutionSet[Solutions.WATER] = WaterSolution;
  AqueousSolutionSet[Solutions.STRONG_ACID] = StrongAcidSolution;
  AqueousSolutionSet[Solutions.WEAK_ACID] = WeakAcidSolution;
  AqueousSolutionSet[Solutions.STRONG_BASE] = StrongBaseSolution;
  AqueousSolutionSet[Solutions.WEAK_BASE] = WeakBaseSolution;

  return AqueousSolutionSet;
} );
