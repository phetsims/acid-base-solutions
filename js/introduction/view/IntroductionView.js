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
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );

  function IntroductionView( model ) {

    AcidBaseSolutionsView.call( this, model );

    var controlPanel = new IntroductionControlPanel( model );
    var resetAllButton = new ResetAllButton( function() { model.reset(); }, { scale: 0.75 } );

    // layout
    controlPanel.right = this.layoutBounds.maxX - 20;
    controlPanel.top = this.layoutBounds.minY;
    resetAllButton.centerX = controlPanel.centerX;
    resetAllButton.top = controlPanel.bottom + 20;

    // rendering order
    this.addChild( controlPanel );
    this.addChild( resetAllButton );
  }

  return inherit( AcidBaseSolutionsView, IntroductionView );
} );
