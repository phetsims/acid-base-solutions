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
    ControlPanel = require( 'view/control-panel/ControlPanel' ),
    ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' ),
    Workspace = require( 'ACID_BASE_SOLUTIONS/view/workspace/Workspace' );

  function AcidBaseSolutionsView( model ) {
    ScreenView.call( this, { renderer: 'svg' } );

    // add control panel
    this.addChild( new ControlPanel( model ).mutate( {right: this.layoutBounds.maxX, top: 0} ) );

    // add workspace
    this.addChild( new Workspace( model ) );

    // add reset button
    this.addChild( new ResetAllButton( function() { model.reset(); }, { x: 0.9 * model.width, y: 0.9 * model.height, scale: 0.75} ) );
  }

  return inherit( ScreenView, AcidBaseSolutionsView );
} );
