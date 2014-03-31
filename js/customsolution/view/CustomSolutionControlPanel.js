// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for the 'Custom Solution' screen.
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
  var SolutionControl = require( 'ACID_BASE_SOLUTIONS/customsolution/view/SolutionControl' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ToolsControl = require( 'ACID_BASE_SOLUTIONS/common/view/ToolsControl' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var ViewsControl = require( 'ACID_BASE_SOLUTIONS/common/view/ViewsControl' );

  // strings
  var solutionString = require( 'string!ACID_BASE_SOLUTIONS/solution' );
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
   * @param {CustomSolutionModel} model
   * @constructor
   */
  function CustomSolutionControlPanel( model ) {

    // titles
    var solutionTitle = new Text( solutionString, TITLE_OPTIONS );
    var viewsTitle = new Text( viewsString, TITLE_OPTIONS );
    var toolsTitle = new Text( toolsString, TITLE_OPTIONS );

    // controls
    var solutionControl = new SolutionControl( model.property( 'solutionType' ), model.property( 'concentration' ), model.property( 'strength' ), PANEL_OPTIONS );
    var viewsControl = new ViewsControl( model.property( 'viewMode' ), model.property( 'toolMode' ), model.property( 'solventVisible' ), PANEL_OPTIONS );
    var toolsControl = new ToolsControl( model.property( 'toolMode' ), PANEL_OPTIONS );

    // panels with equal widths
    var maxWidth = Math.max( solutionControl.width, Math.max( viewsControl.width, toolsControl.width ) );
    var children = [
      new VBox( {
        spacing: TITLE_Y_SPACING,
        align: 'left',
        children: [
          solutionTitle,
          createPanel( solutionControl, maxWidth )
        ]} ),
      new VBox( {
        spacing: TITLE_Y_SPACING,
        align: 'left',
        children: [
          viewsTitle,
          createPanel( viewsControl, maxWidth )
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
      spacing: 5,
      children: children
    } );
  }

  return inherit( VBox, CustomSolutionControlPanel );
} );
