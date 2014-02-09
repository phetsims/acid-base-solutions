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
    FONT = new PhetFont( {size: 14, weight: 'bold'} ),
    ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' ),

  // strings
    solutionsString = require( 'string!ACID_BASE_SOLUTIONS/solutions' ),
    solutionString = require( 'string!ACID_BASE_SOLUTIONS/solution' ),
    viewsString = require( 'string!ACID_BASE_SOLUTIONS/views' ),
    testsString = require( 'string!ACID_BASE_SOLUTIONS/tests' ),
    introductionTitleString = require( 'string!ACID_BASE_SOLUTIONS/introductionTitle' ),
    customSolutionTitleString = require( 'string!ACID_BASE_SOLUTIONS/customSolutionTitle' );

  function ControlPanel( model ) {
    var vBox = new VBox( {x: 20, spacing: 8, align: 'left'} ),
      menus = [],
      strokes = [],
      maxWidth = 0,
      resetButton,
      background;
    Node.call( this );

    // for 'introduction' tab add solutions menu
    if ( model.mode === introductionTitleString ) {
      menus.push( {content: new SolutionsControl( model ), text: solutionsString} );
    }
    // for 'custom solution' tab add solution menu
    else if ( model.mode === customSolutionTitleString ) {
      menus.push( {content: new SolutionControl( model ), text: solutionString} );
    }

    // add views menu
    menus.push( {content: new ViewsControl( model ), text: viewsString} );

    // add tests menu
    menus.push( {content: new TestsControl( model ), text: testsString} );

    // add background
    this.addChild( background = new Rectangle( 0, 0, 0, 0, {fill: 'rgb(204,204,255)', stroke: 'black', lineWidth: 1} ) );

    // add menus to vBox, add labels and find max menu width (to align strokes with equal width)
    menus.forEach( function( menu, i ) {
      var text = new Text( menu.text, {font: FONT, centerY: -10} );
      strokes[i] = new Rectangle( -15, -10, 0, menu.content.getHeight() + 20, 5, 5, {stroke: 'black', lineWidth: 0.75} );
      maxWidth = Math.max( maxWidth, menu.content.getWidth() );
      vBox.addChild( new Node( {children: [
        strokes[i],
        new Node( {children: [
          new Rectangle( -5, -text.getHeight(), text.getWidth() + 10, text.getHeight(), {fill: 'rgb(204,204,255)'} ),
          text
        ]} ),
        menu.content
      ]} ) );
    } );

    this.addChild( vBox );
    vBox.updateLayout();

    // add "reset all" button
    this.addChild( resetButton = new ResetAllButton( function() { model.reset(); }, {scale: 0.75} ) );
    resetButton.setTranslation( (vBox.getWidth() + resetButton.getWidth()) / 2 - 5, vBox.getHeight() + resetButton.getHeight() / 2 + 5 );

    // tune background rectangle and strokes
    background.setRectHeight( model.height + 4 );
    background.setRectWidth( vBox.getWidth() + 24 );
    strokes.forEach( function( stroke ) {
      stroke.setRectWidth( maxWidth + 20 );
    } );
  }

  return inherit( Node, ControlPanel );
} );