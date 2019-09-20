// Copyright 2016-2019, University of Colorado Boulder

/**
 * View-specific Properties
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const inherit = require( 'PHET_CORE/inherit' );
  const StringProperty = require( 'AXON/StringProperty' );
  const ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  const ViewMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ViewMode' );

  /**
   * @constructor
   */
  function ABSViewProperties() {

    // @public
    this.solventVisibleProperty = new BooleanProperty( false );
    this.viewModeProperty = new StringProperty( ViewMode.MOLECULES );
    this.toolModeProperty = new StringProperty( ToolMode.PH_METER );
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
