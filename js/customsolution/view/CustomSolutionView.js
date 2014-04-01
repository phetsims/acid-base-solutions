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
  var Node = require( 'SCENERY/nodes/Node' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );

  function CustomSolutionView( model ) {

    AcidBaseSolutionsView.call( this, model );

    var controlPanel = new CustomSolutionControlPanel( model, this.viewProperties );

    // below control panel, right justified
    var resetAllButton = new ResetAllButton( function() { model.reset(); }, { scale: 0.75 } );
    resetAllButton.right = controlPanel.right;
    resetAllButton.top = controlPanel.bottom + 5;

    // vertically centered at right side of screen
    this.addChild( new Node( {
      children: [ controlPanel, resetAllButton ],
      right: this.layoutBounds.maxX - 20,
      centerY: this.layoutBounds.centerY
    } ) );
  }

  return inherit( AcidBaseSolutionsView, CustomSolutionView );
} );
