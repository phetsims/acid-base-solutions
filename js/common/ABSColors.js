// Copyright 2002-2014, University of Colorado Boulder

/**
 * Colors for simulation 'Acid-Base Solutions' simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // constants
  var GRAY_MOLECULE = 'rgb(120,120,120)';

  return {

    SCREEN_BACKGROUND: 'white',

    CONTROL_PANEL_BACKGROUND: 'rgb(208,212,255)',

    PH_PAPER: 'rgb(217,215,154)', // color of blank pH paper, cream

    // pH colors, ordered from pH value 0-14
    PH: [
      'rgb(182,70,72)',
      'rgb(196,80,86)',
      'rgb(213,83,71)',
      'rgb(237,123,83)',
      'rgb(246,152,86)',
      'rgb(244,158,79)',
      'rgb(243,160,78)',
      'rgb(244,182,67)',
      'rgb(231,201,75)',
      'rgb(93,118,88)',
      'rgb(30,92,89)',
      'rgb(34,90,105)',
      'rgb(39,87,111)',
      'rgb(27,67,90)',
      'rgb(0,34,52)'
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
      OH: 'rgb(0,0,255)'
    }
  };
} );
