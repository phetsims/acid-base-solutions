// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'Custom Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var AcidBaseSolutionsView = require( 'common/view/AcidBaseSolutionsView' );
  var ControlPanel = require( 'view/control-panel/ControlPanel' );
  var inherit = require( 'PHET_CORE/inherit' );

  function CustomSolutionView( model ) {
    AcidBaseSolutionsView.call( this, model );
    this.addChild( new ControlPanel( model ).mutate( {right: this.layoutBounds.maxX, bottom: this.layoutBounds.maxY} ) );
  }

  return inherit( AcidBaseSolutionsView, CustomSolutionView );
} );
