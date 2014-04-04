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
  var Node = require( 'SCENERY/nodes/Node' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );

  function IntroductionView( model ) {

    var self = this;
    AcidBaseSolutionsView.call( this, model );

    var controlPanel = new IntroductionControlPanel( model, this.viewProperties );

    // below control panel, right justified
    var resetAllButton = new ResetAllButton( function() {
      model.reset();
      self.reset();
    }, { scale: 0.75 } );
    resetAllButton.right = controlPanel.right;
    resetAllButton.top = controlPanel.bottom + 10;

    // vertically centered at right side of screen
    this.addChild( new Node( {
      children: [ controlPanel, resetAllButton ],
      right: this.layoutBounds.maxX - 20,
      centerY: this.layoutBounds.centerY
    } ) );
  }

  return inherit( AcidBaseSolutionsView, IntroductionView );
} );
