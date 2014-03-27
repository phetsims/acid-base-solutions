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
  var SolutionMenuModel = require( 'ACID_BASE_SOLUTIONS/model/SolutionMenuModel' );
  var SolutionControl = require( 'ACID_BASE_SOLUTIONS/customsolution/view/SolutionControl' );
  var ToolsControl = require( 'ACID_BASE_SOLUTIONS/common/view/ToolsControl' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var ViewsControl = require( 'ACID_BASE_SOLUTIONS/common/view/ViewsControl' );

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
   * @param {CustomSolutionModel} model
   * @constructor
   */
  function CustomSolutionControlPanel( model ) {

    // controls
    var solutionControl = new SolutionControl( new SolutionMenuModel( model.property( 'solutionType' ), model.property( 'concentration' ), model.property( 'strength' ) ), PANEL_OPTIONS );
    var viewsControl = new ViewsControl( model.property( 'viewMode' ), model.property( 'toolMode' ), model.property( 'solventVisible' ), PANEL_OPTIONS );
    var toolsControl = new ToolsControl( model.property( 'toolMode' ), PANEL_OPTIONS );

    // panels with equal widths
    var maxWidth = Math.max( solutionControl.width, Math.max( viewsControl.width, toolsControl.width ) );
    var children = [
      createPanel( solutionControl, maxWidth ),
      createPanel( viewsControl, maxWidth ),
      createPanel( toolsControl, maxWidth )
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
