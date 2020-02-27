// Copyright 2016-2020, University of Colorado Boulder

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
  const StringProperty = require( 'AXON/StringProperty' );
  const ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  const ViewMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ViewMode' );

  class ABSViewProperties {

    constructor() {

      // @public
      this.solventVisibleProperty = new BooleanProperty( false );
      this.viewModeProperty = new StringProperty( ViewMode.MOLECULES );
      this.toolModeProperty = new StringProperty( ToolMode.PH_METER );
    }

    // @public
    reset() {
      this.solventVisibleProperty.reset();
      this.viewModeProperty.reset();
      this.toolModeProperty.reset();
    }
  }

  return acidBaseSolutions.register( 'ABSViewProperties', ABSViewProperties );
} );
