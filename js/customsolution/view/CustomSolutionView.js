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
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var SolutionMenuModel = require( 'ACID_BASE_SOLUTIONS/model/SolutionMenuModel' );
  var SolutionPanel = require( 'ACID_BASE_SOLUTIONS/customsolution/view/SolutionPanel' );
  var TestModesMenuModel = require( 'ACID_BASE_SOLUTIONS/model/TestModesMenuModel' );
  var TestsPanel = require( 'ACID_BASE_SOLUTIONS/common/view/TestsPanel' );
  var ViewModesMenuModel = require( 'ACID_BASE_SOLUTIONS/model/ViewModesMenuModel' );
  var ViewsPanel = require( 'ACID_BASE_SOLUTIONS/common/view/ViewsPanel' );

  function CustomSolutionView( model ) {

    AcidBaseSolutionsView.call( this, model );

    var solutionPanel = new SolutionPanel( new SolutionMenuModel( model.property( 'solutionType' ), model.property( 'concentration' ), model.property( 'strength' ), model.property( 'isAcid' ), model.property( 'isWeak' ) ) );
    var viewsPanel = new ViewsPanel( new ViewModesMenuModel( model.property( 'viewMode' ), model.property( 'solventVisible' ) ) );
    var testsPanel = new TestsPanel( new TestModesMenuModel( model.property( 'testMode' ) ) );
    var resetAllButton = new ResetAllButton( function() { model.reset(); }, { scale: 0.75 } );

    //TODO move to CustomSolutionControlPanel, add panel titles, make them all the same width
    // layout
    solutionPanel.right = this.layoutBounds.maxX - 20;
    solutionPanel.top = this.layoutBounds.minY;
    viewsPanel.right = solutionPanel.right;
    viewsPanel.top = solutionPanel.bottom + 20;
    testsPanel.right = viewsPanel.right;
    testsPanel.top = viewsPanel.bottom + 20;
    resetAllButton.centerX = testsPanel.centerX;
    resetAllButton.top = testsPanel.bottom + 20;

    // rendering order
    this.addChild( solutionPanel );
    this.addChild( viewsPanel );
    this.addChild( testsPanel );
    this.addChild( resetAllButton );
  }

  return inherit( AcidBaseSolutionsView, CustomSolutionView );
} );
