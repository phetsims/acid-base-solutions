// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for the 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var HStrut = require( 'SUN/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var SolutionsPanel = require( 'ACID_BASE_SOLUTIONS/introduction/view/SolutionsPanel' );
  var ToolsPanel = require( 'ACID_BASE_SOLUTIONS/common/view/ToolsPanel' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var ViewsPanel = require( 'ACID_BASE_SOLUTIONS/common/view/ViewsPanel' );

  // constants
  var PANEL_OPTIONS = {
    fill: 'rgb(208,212,255)',
    titleFont: new PhetFont( { size: 14, weight: 'bold' } ),
    xMargin: 15,
    yMargin: 8
  };

  var createPanel = function( node, minWidth ) {
    return new Panel( new VBox( { children: [ new HStrut( minWidth ), node ], align: 'left', spacing: 0 } ), PANEL_OPTIONS );
  };

  /**
   * @param {IntroductionModel} model
   * @constructor
   */
  function IntroductionControlPanel( model ) {

    // controls
    var solutionsPanel = new SolutionsPanel( model.property( 'solutionType' ), PANEL_OPTIONS );
    var viewsPanel = new ViewsPanel( model.property( 'viewMode' ), model.property( 'solventVisible' ), PANEL_OPTIONS );
    var toolsPanel = new ToolsPanel( model.property( 'toolMode' ), PANEL_OPTIONS );

    // panels with equal widths
    var maxWidth = Math.max( solutionsPanel.width, Math.max( viewsPanel.width, toolsPanel.width ) );
    var children = [
      createPanel( solutionsPanel, maxWidth ),
      createPanel( viewsPanel, maxWidth ),
      createPanel( toolsPanel, maxWidth )
    ];

    // stack panels vertically
    VBox.call( this, {
      align: 'left',
      spacing: 5,
      children: children
    } );
  }

  return inherit( VBox, IntroductionControlPanel );
} );
