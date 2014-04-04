// Copyright 2002-2014, University of Colorado Boulder

/**
 * Bae type of main control panel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ABSColors = require( 'ACID_BASE_SOLUTIONS/common/ABSColors' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SUN/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
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
    fill: ABSColors.CONTROL_PANEL_BACKGROUND,
    xMargin: 15,
    yMargin: 6
  };

  var createPanel = function( node, minWidth ) {
    return new Panel( new VBox( { children: [ new HStrut( minWidth ), node ], align: 'left', spacing: 0 } ), PANEL_OPTIONS );
  };

  /**
   * @param {AcidBaseSolutionModel} model
   * @param {PropertySet} viewProperties properties that are specific to the view
   * @param {Node} solutionControl
   * @param {*} options
   * @constructor
   */
  function AcidBaseSolutionsControlPanel( model, viewProperties, solutionControl, options ) {

    options = _.extend( {
      align: 'left',
      spacing: 5
    }, options );

    // titles
    var solutionTitle = new Text( solutionString, TITLE_OPTIONS );
    var viewsTitle = new Text( viewsString, TITLE_OPTIONS );
    var toolsTitle = new Text( toolsString, TITLE_OPTIONS );

    // controls
    var viewsControl = new ViewsControl( viewProperties.property( 'viewMode' ), viewProperties.property( 'solventVisible' ) );
    var toolsControl = new ToolsControl( viewProperties.property( 'toolMode' ) );

    // Reset All button
    var resetAllButton = new ResetAllButton( function() {
      model.reset();
      viewProperties.reset();
    }, { scale: 0.75 } );

    // 'Solutions' and 'Views' panels have same with, 'Tools' panel does not
    var maxWidth = Math.max( solutionControl.width, viewsControl.width );
    options.children = [
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
          // Reset All button to right of 'Tools' panel
          new HBox( { spacing: 10, children: [ new Panel( toolsControl, PANEL_OPTIONS ), resetAllButton ] } )
        ]} )
    ];

    // stack panels vertically
    VBox.call( this, options );
  }

  return inherit( VBox, AcidBaseSolutionsControlPanel );
} );
