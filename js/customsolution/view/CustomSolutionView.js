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
  var CustomSolutionControlPanel = require( 'customsolution/view/CustomSolutionControlPanel' );
  var inherit = require( 'PHET_CORE/inherit' );

  function CustomSolutionView( model ) {

    AcidBaseSolutionsView.call( this, model );

    this.addChild( new CustomSolutionControlPanel( model, this.viewProperties, {
        // vertically centered at right edge of screen
        right: this.layoutBounds.maxX - 20,
        centerY: this.layoutBounds.centerY
      }
    ) );
  }

  return inherit( AcidBaseSolutionsView, CustomSolutionView );
} );
