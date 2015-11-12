// Copyright 2014-2015, University of Colorado Boulder

/**
 * Possible choices in the 'Views' control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );

  var ViewMode = Object.freeze( {
    MOLECULES: 'molecules',
    GRAPH: 'graph',
    HIDE_VIEWS: 'hideViews'
  } );

  acidBaseSolutions.register( 'ViewMode', ViewMode );

  return ViewMode;
} );