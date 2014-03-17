// Copyright 2002-2013, University of Colorado Boulder

/**
 * Container for right control panel.
 * Contains solution, views and tests menus.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' ),
    inherit = require( 'PHET_CORE/inherit' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    SolutionControl = require( 'ACID_BASE_SOLUTIONS/view/control-panel/SolutionControl/SolutionControl' ),
    SolutionsControl = require( 'ACID_BASE_SOLUTIONS/view/control-panel/SolutionsControl' ),
    ViewsControl = require( 'ACID_BASE_SOLUTIONS/view/control-panel/ViewsControl' ),
    TestsControl = require( 'ACID_BASE_SOLUTIONS/view/control-panel/TestsControl' ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' ),

  // strings
    solutionsString = require( 'string!ACID_BASE_SOLUTIONS/solutions' ),
    solutionString = require( 'string!ACID_BASE_SOLUTIONS/solution' ),
    viewsString = require( 'string!ACID_BASE_SOLUTIONS/views' ),
    testsString = require( 'string!ACID_BASE_SOLUTIONS/tests' ),
    GameModes = require( 'model/GameModes' ),

  // constants
    FONT = new PhetFont( {size: 14, weight: 'bold'} );

  var gameMenus = {};

  /* menus for 'introduction' screen
   * name: constructor name
   * title: appropriate menu title
   */
  gameMenus[GameModes.INTRODUCTION] = [
    {name: SolutionsControl, title: solutionsString},
    {name: ViewsControl, title: viewsString},
    {name: TestsControl, title: testsString}
  ];

  /* menus for 'custom solution' screen
   * name: constructor name
   * title: appropriate menu title
   */
  gameMenus[GameModes.CUSTOM_SOLUTION] = [
    {name: SolutionControl, title: solutionString},
    {name: ViewsControl, title: viewsString},
    {name: TestsControl, title: testsString}
  ];

  function ControlPanel( model ) {
    var vBox = new VBox( {x: 20, spacing: 8, align: 'left'} ),
      menus = gameMenus[model.mode],
      strokes = [],
      maxWidth = 0,
      resetButton,
      background;
    Node.call( this );

    // add background
    this.addChild( background = new Rectangle( 0, 0, 0, 0, {fill: 'rgb(204,204,255)', stroke: 'black', lineWidth: 1} ) );

    // add menus to vBox, add titles and find max menu width (to align strokes with equal width)
    menus.forEach( function( menu, i ) {
      var title = new Text( menu.title, {font: FONT, centerY: -10} ),
        menuNode = new menu.name( model );

      // create stroke for menu item
      strokes[i] = new Rectangle( -15, -10, 0, menuNode.getHeight() + 20, 5, 5, {stroke: 'black', lineWidth: 0.75} );

      // calculate max width
      maxWidth = Math.max( maxWidth, menuNode.getWidth() );
      vBox.addChild( createMenuItem( menuNode, strokes[i], title ) );
    } );

    this.addChild( vBox );
    vBox.updateLayout();

    // add "reset all" button
    this.addChild( resetButton = new ResetAllButton( function() { model.reset(); }, {scale: 0.75} ) );
    resetButton.setTranslation( (vBox.getWidth() + resetButton.getWidth()) / 2 - 5, vBox.getHeight() + resetButton.getHeight() / 2 + 2 );

    // tune background rectangle and strokes
    background.setRectHeight( model.height );
    background.setRectWidth( vBox.getWidth() + 24 );
    strokes.forEach( function( stroke ) {
      stroke.setRectWidth( maxWidth + 20 );
    } );
  }

  // create single menu item
  var createMenuItem = function( node, stroke, title ) {
    return new Node( {children: [
      stroke,
      new Node( {children: [
        new Rectangle( -5, -title.getHeight(), title.getWidth() + 10, title.getHeight(), {fill: 'rgb(204,204,255)'} ),
        title
      ]} ),
      node
    ]} );
  };

  return inherit( Node, ControlPanel );
} );