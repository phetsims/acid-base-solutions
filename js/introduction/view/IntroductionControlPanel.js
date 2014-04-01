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
  var SolutionsControl = require( 'ACID_BASE_SOLUTIONS/introduction/view/SolutionsControl' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ToolsControl = require( 'ACID_BASE_SOLUTIONS/common/view/ToolsControl' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var ViewsControl = require( 'ACID_BASE_SOLUTIONS/common/view/ViewsControl' );

  // strings
  var solutionsString = require( 'string!ACID_BASE_SOLUTIONS/solutions' );
  var toolsString = require( 'string!ACID_BASE_SOLUTIONS/tools' );
  var viewsString = require( 'string!ACID_BASE_SOLUTIONS/views' );

  // constants
  var TITLE_Y_SPACING = 1;
  var TITLE_OPTIONS = { font: new PhetFont( { size: 14, weight: 'bold' } ) };
  var PANEL_OPTIONS = {
    fill: 'rgb(208,212,255)',
    xMargin: 15,
    yMargin: 6
  };

  var createPanel = function( node, minWidth ) {
    return new Panel( new VBox( { children: [ new HStrut( minWidth ), node ], align: 'left', spacing: 0 } ), PANEL_OPTIONS );
  };

  /**
   * @param {IntroductionModel} model
   * @param {PropertySet} viewProperties properties that are specific to the view
   * @constructor
   */
  function IntroductionControlPanel( model, viewProperties ) {

    // titles
    var solutionsTitle = new Text( solutionsString, TITLE_OPTIONS );
    var viewsTitle = new Text( viewsString, TITLE_OPTIONS );
    var toolsTitle = new Text( toolsString, TITLE_OPTIONS );

    // controls
    var solutionsControl = new SolutionsControl( model.property( 'solutionType' ), PANEL_OPTIONS );
    var viewsControl = new ViewsControl( viewProperties.property( 'viewMode' ), viewProperties.property( 'toolMode' ), viewProperties.property( 'solventVisible' ), PANEL_OPTIONS );
    var toolsControl = new ToolsControl( viewProperties.property( 'toolMode' ), PANEL_OPTIONS );

    // panels with equal widths
    var maxWidth = Math.max( solutionsControl.width, Math.max( viewsControl.width, toolsControl.width ) );
    var children = [
      new VBox( {
        spacing: TITLE_Y_SPACING,
        align: 'left',
        children: [
          solutionsTitle,
          createPanel( solutionsControl, maxWidth )
        ]} ),
      new VBox( {
        spacing: TITLE_Y_SPACING,
        align: 'left',
        children: [
          viewsTitle,
          createPanel( viewsControl, maxWidth ),
        ]} ),
      new VBox( {
        spacing: TITLE_Y_SPACING,
        align: 'left',
        children: [
          toolsTitle,
          createPanel( toolsControl, maxWidth )
        ]} )
    ];

    // stack panels vertically
    VBox.call( this, {
      align: 'left',
      spacing: 6,
      children: children
    } );
  }

  return inherit( VBox, IntroductionControlPanel );
} );
