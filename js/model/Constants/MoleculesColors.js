// Copyright 2002-2013, University of Colorado Boulder

/**
 * Colors for all molecules.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Color = require( 'SCENERY/util/Color' );

  var AQUEOUS_SOLUTION = new Color( 193, 222, 227, 0.7 ), // transparent light blue
    GRAY = 'rgb(120,120,120)',
    H2O_FACTOR = 0.85;

  return {
    A: 'rgb(0,170,255)',
    B: GRAY,
    BH: 'rgb(255,170,0)',
    H2O: new Color( AQUEOUS_SOLUTION.getRed() * H2O_FACTOR, AQUEOUS_SOLUTION.getGreen() * H2O_FACTOR, AQUEOUS_SOLUTION.getBlue() * H2O_FACTOR ),
    H3O: 'rgb(255,85,0)',
    HA: GRAY,
    M: 'rgb(255,170,0)',
    MOH: GRAY,
    OH: 'rgb(0,0,255)'
  };
} );