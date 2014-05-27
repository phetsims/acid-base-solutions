// Copyright 2002-2014, University of Colorado Boulder

/**
 * Colors for simulation 'Acid-Base Solutions' simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );

  // constants
  var GRAY_MOLECULE = 'rgb(120,120,120)';

  return {

    SCREEN_BACKGROUND: 'white',

    CONTROL_PANEL_BACKGROUND: 'rgb(208,212,255)',

    PH_PAPER: 'rgb(217,215,154)', // color of blank pH paper, cream

    // pH colors, ordered from pH value 0-14, type Color because we'll be interpolating
    PH: [
      new Color( 182, 70, 72 ),
      new Color( 196, 80, 86 ),
      new Color( 213, 83, 71 ),
      new Color( 237, 123, 83 ),
      new Color( 246, 152, 86 ),
      new Color( 244, 158, 79 ),
      new Color( 243, 160, 78 ),
      new Color( 244, 182, 67 ),
      new Color( 231, 201, 75 ),
      new Color( 93, 118, 88 ),
      new Color( 30, 92, 89 ),
      new Color( 34, 90, 105 ),
      new Color( 39, 87, 111 ),
      new Color( 27, 67, 90 ),
      new Color( 0, 34, 52 )
    ],

    // The field names here must correspond to the 'key' fields in AqueousSolution.molecules.
    MOLECULES: {
      A: 'rgb(0,170,255)',
      B: GRAY_MOLECULE,
      BH: 'rgb(255,170,0)',
      H2O: 'rgb(164,189,193)',
      H3O: 'rgb(255,85,0)',
      HA: GRAY_MOLECULE,
      M: 'rgb(255,170,0)',
      MOH: GRAY_MOLECULE,
      OH: 'rgb(90,90,255)'
    }
  };
} );
