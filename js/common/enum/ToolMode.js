// Copyright 2014-2015, University of Colorado Boulder

/**
 * Possible choices in the 'Tools' control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );

  var ToolMode = Object.freeze( {
    PH_METER: 'pHMeter',
    PH_PAPER: 'pHPaper',
    CONDUCTIVITY: 'conductivity'
  } );

  acidBaseSolutions.register( 'ToolMode', ToolMode );

  return ToolMode;
} );