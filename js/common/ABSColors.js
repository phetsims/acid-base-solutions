// Copyright 2002-2013, University of Colorado Boulder

/**
 * Colors used through this simulation.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );

  // constants
  var GRAY_MOLECULE = 'rgb(120,120,120)';

  // The field names here must correspond to the 'key' fields in AqueousSolution.molecules.
  return {
    A: 'rgb(0,170,255)',
    B: GRAY_MOLECULE,
    BH: 'rgb(255,170,0)',
    //TODO why is this factor applied?
    H2O: 'rgb(164,189,193)',
    H3O: 'rgb(255,85,0)',
    HA: GRAY_MOLECULE,
    M: 'rgb(255,170,0)',
    MOH: GRAY_MOLECULE,
    OH: 'rgb(0,0,255)'
  };
} );