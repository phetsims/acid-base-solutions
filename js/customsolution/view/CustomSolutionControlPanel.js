// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for the 'Custom Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var SolutionMenuModel = require( 'ACID_BASE_SOLUTIONS/model/SolutionMenuModel' );
  var SolutionPanel = require( 'ACID_BASE_SOLUTIONS/customsolution/view/SolutionPanel' );
  var ToolsPanel = require( 'ACID_BASE_SOLUTIONS/common/view/ToolsPanel' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var ViewsPanel = require( 'ACID_BASE_SOLUTIONS/common/view/ViewsPanel' );
  var VStrut = require( 'SUN/VStrut' );

  // strings
  var solutionString = require( 'string!ACID_BASE_SOLUTIONS/solution' );
  var toolsString = require( 'string!ACID_BASE_SOLUTIONS/tools' );
  var viewsString = require( 'string!ACID_BASE_SOLUTIONS/views' );

  // constants
  var TITLE_OPTIONS = { font: new PhetFont( { size: 14, weight: 'bold' } ) };

  /**
   * @param {CustomSolutionModel} model
   * @constructor
   */
  function CustomSolutionControlPanel( model ) {

    // titles
    var solutionTitle = new Text( solutionString, TITLE_OPTIONS );
    var viewsTitle = new Text( viewsString, TITLE_OPTIONS );
    var toolsTitle = new Text( toolsString, TITLE_OPTIONS );

    // panels
    var solutionPanel = new SolutionPanel( new SolutionMenuModel( model.property( 'solutionType' ), model.property( 'concentration' ), model.property( 'strength' ), model.property( 'isAcid' ), model.property( 'isWeak' ) ) );
    var viewsPanel = new ViewsPanel( model.property( 'viewMode' ), model.property( 'solventVisible' ) );
    var toolsPanel = new ToolsPanel( model.property( 'toolMode' ) );

    var children = [
      solutionTitle,
      new VStrut( 10 ),
      solutionPanel,
      new VStrut( 15 ),
      viewsTitle,
      new VStrut( 10 ),
      viewsPanel,
      new VStrut( 15 ),
      toolsTitle,
      new VStrut( 10 ),
      toolsPanel
    ];

    Panel.call( this, new VBox( { align: 'left', children: children } ), {
      fill: 'rgb(208,212,255)',
      xMargin: 15,
      yMargin: 10
    } );
  }

  return inherit( Panel, CustomSolutionControlPanel );
} );
