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
  var SolutionPanel = require( 'ACID_BASE_SOLUTIONS/customsolution/view/SolutionPanel' );
  var TestModesMenuModel = require( 'ACID_BASE_SOLUTIONS/model/TestModesMenuModel' );
  var TestsPanel = require( 'ACID_BASE_SOLUTIONS/common/view/TestsPanel' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var ViewModesMenuModel = require( 'ACID_BASE_SOLUTIONS/model/ViewModesMenuModel' );
  var ViewsPanel = require( 'ACID_BASE_SOLUTIONS/common/view/ViewsPanel' );
  var VStrut = require( 'SUN/VStrut' );

  // strings
  var solutionString = require( 'string!ACID_BASE_SOLUTIONS/solution' );
  var testsString = require( 'string!ACID_BASE_SOLUTIONS/tests' );
  var viewsString = require( 'string!ACID_BASE_SOLUTIONS/views' );

  // constants
  var TITLE_OPTIONS = { font: new PhetFont( { size: 18, weight: 'bold' } ) };

  /**
   * @param {CustomSolutionModel} model
   * @constructor
   */
  function CustomSolutionControlPanel( model ) {

    // titles
    var solutionTitle = new Text( solutionString, TITLE_OPTIONS );
    var viewsTitle = new Text( viewsString, TITLE_OPTIONS );
    var testsTitle = new Text( testsString, TITLE_OPTIONS );

    // panels
    var solutionPanel = new SolutionPanel( new SolutionMenuModel( model.property( 'solutionType' ), model.property( 'concentration' ), model.property( 'strength' ), model.property( 'isAcid' ), model.property( 'isWeak' ) ) );
    var viewsPanel = new ViewsPanel( new ViewModesMenuModel( model.property( 'viewMode' ), model.property( 'solventVisible' ) ) );
    var testsPanel = new TestsPanel( new TestModesMenuModel( model.property( 'testMode' ) ) );

    var children = [
      solutionTitle,
      new VStrut( 10 ),
      solutionPanel,
      new VStrut( 20 ),
      viewsTitle,
      new VStrut( 10 ),
      viewsPanel,
      new VStrut( 20 ),
      testsTitle,
      new VStrut( 10 ),
      testsPanel
    ];

    Panel.call( this, new VBox( { align: 'left', children: children } ), {
      xMargin: 15,
      yMargin: 10
    } );
  }

  return inherit( Panel, CustomSolutionControlPanel );
} );
