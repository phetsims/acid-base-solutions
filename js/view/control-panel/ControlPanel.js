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
    Color = require( 'SCENERY/util/Color' ),
    SolutionControl = require( 'ACID_BASE_SOLUTIONS/view/control-panel/SolutionControl/SolutionControl' ),
    SolutionsControl = require( 'ACID_BASE_SOLUTIONS/view/control-panel/SolutionsControl' ),
    ViewsControl = require( 'ACID_BASE_SOLUTIONS/view/control-panel/ViewsControl' ),
    TestsControl = require( 'ACID_BASE_SOLUTIONS/view/control-panel/TestsControl' ),
    VBox = require( 'SCENERY/nodes/VBox' ),

  // strings
    introductionTitleString = require( 'string!ACID_BASE_SOLUTIONS/introductionTitle' ),
    customSolutionTitleString = require( 'string!ACID_BASE_SOLUTIONS/customSolutionTitle' );

  function ControlPanel( model ) {
    var vBox = new VBox( {spacing: 20, align: 'left'} ), background;
    Node.call( this );

    // add background
    this.addChild( background = new Rectangle( -20, -2, 0, 0, {fill: new Color( 204, 204, 255 ), stroke: new Color( 'black' ), lineWidth: 1} ) );

    // for 'introduction' tab add solutions menu
    if ( model.mode === introductionTitleString ) {
      vBox.addChild( new SolutionsControl( model ) );
    }
    // for 'custom solution' tab add solution menu
    else if ( model.mode === customSolutionTitleString ) {
      vBox.addChild( new SolutionControl( model ) );
    }

    // add views menu
    vBox.addChild( new ViewsControl( model ) );

    // add tests menu
    vBox.addChild( new TestsControl( model ) );

    this.addChild( vBox );
    vBox.updateLayout();

    // set background size
    background.setRectHeight( model.height + 4 );
    background.setRectWidth( vBox.getWidth() + 24 );
  }

  return inherit( Node, ControlPanel );
} );