// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ControlPanel = require( 'view/control-panel/ControlPanel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Workspace = require( 'ACID_BASE_SOLUTIONS/view/workspace/Workspace' );

  function IntroductionView( model ) {
    ScreenView.call( this, { renderer: 'svg' } );

    // add control panel
    this.addChild( new ControlPanel( model ).mutate( {right: this.layoutBounds.maxX, bottom: this.layoutBounds.maxY} ) );

    // add workspace
    this.addChild( new Workspace( model ) );
  }

  return inherit( ScreenView, IntroductionView );
} );
