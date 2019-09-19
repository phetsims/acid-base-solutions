// Copyright 2014-2015, University of Colorado Boulder

/**
 * Possible choices in the 'Views' control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );

  const ViewMode = Object.freeze( {
    MOLECULES: 'molecules',
    GRAPH: 'graph',
    HIDE_VIEWS: 'hideViews'
  } );

  acidBaseSolutions.register( 'ViewMode', ViewMode );

  return ViewMode;
} );