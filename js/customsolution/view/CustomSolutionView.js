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
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );

  function CustomSolutionView( model ) {

    AcidBaseSolutionsView.call( this, model );

    var controlPanel = new CustomSolutionControlPanel( model );
    var resetAllButton = new ResetAllButton( function() { model.reset(); }, { scale: 0.75 } );

    // layout
    controlPanel.right = this.layoutBounds.maxX - 20;
    controlPanel.top = this.layoutBounds.minY + 5;
    resetAllButton.right = controlPanel.right;
    resetAllButton.top = controlPanel.bottom + 5;

    // rendering order
    this.addChild( controlPanel );
    this.addChild( resetAllButton );
  }

  return inherit( AcidBaseSolutionsView, CustomSolutionView );
} );
