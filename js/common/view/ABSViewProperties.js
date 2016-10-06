// Copyright 2016, University of Colorado Boulder

/**
 * View-specific Properties
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  var ViewMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ViewMode' );

  /**
   * @constructor
   */
  function ABSViewProperties() {

    // @public
    this.solventVisibleProperty = new Property( false );
    this.viewModeProperty = new Property( ViewMode.MOLECULES );
    this.toolModeProperty = new Property( ToolMode.PH_METER );
  }

  acidBaseSolutions.register( 'ABSViewProperties', ABSViewProperties );

  return inherit( Object, ABSViewProperties, {

    // @public
    reset: function() {
      this.solventVisibleProperty.reset();
      this.viewModeProperty.reset();
      this.toolModeProperty.reset();
    }
  } );
} );
