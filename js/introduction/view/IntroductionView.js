// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var AcidBaseSolutionsView = require( 'common/view/AcidBaseSolutionsView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroductionControlPanel = require( 'ACID_BASE_SOLUTIONS/introduction/view/IntroductionControlPanel' );

  function IntroductionView( model ) {

    AcidBaseSolutionsView.call( this, model );

    this.addChild( new IntroductionControlPanel( model, this.viewProperties, {
        // vertically centered at right edge of screen
        right: this.layoutBounds.maxX - 20,
        centerY: this.layoutBounds.centerY
      }
    ) );
  }

  return inherit( AcidBaseSolutionsView, IntroductionView );
} );
