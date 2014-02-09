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
    Workspace = require( 'ACID_BASE_SOLUTIONS/view/workspace/Workspace' );

  function AcidBaseSolutionsView( model ) {
    ScreenView.call( this, { renderer: 'svg' } );

    // add control panel
    this.addChild( new ControlPanel( model ).mutate( {right: this.layoutBounds.maxX} ) );

    // add workspace
    this.addChild( new Workspace( model ) );
  }

  return inherit( ScreenView, AcidBaseSolutionsView );
} );
