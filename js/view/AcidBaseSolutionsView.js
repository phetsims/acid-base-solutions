// Copyright 2002-2013, University of Colorado Boulder

/**
 * Scene graph for the 'Acid Base Solutions' screen.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    ScreenView = require( 'JOIST/ScreenView' ),
    ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );

  function AcidBaseSolutionsView( model ) {
    ScreenView.call( this, { renderer: 'svg' } );

    // add reset button
    this.addChild( new ResetAllButton( function() { model.reset(); }, { x: 0.9 * model.width, y: 0.9 * model.height} ) );
  }

  return inherit( ScreenView, AcidBaseSolutionsView );
} );
