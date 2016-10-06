// Copyright 2014-2015, University of Colorado Boulder

/**
 * Base type for views in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var ABSControlPanel = require( 'ACID_BASE_SOLUTIONS/common/view/ABSControlPanel' );
  var ABSViewProperties = require( 'ACID_BASE_SOLUTIONS/common/view/ABSViewProperties' );
  var BeakerNode = require( 'ACID_BASE_SOLUTIONS/common/view/BeakerNode' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var ABSConductivityTesterNode = require( 'ACID_BASE_SOLUTIONS/common/view/ABSConductivityTesterNode' );
  var ConcentrationGraphNode = require( 'ACID_BASE_SOLUTIONS/common/view/graph/ConcentrationGraphNode' );
  var ReactionEquationNode = require( 'ACID_BASE_SOLUTIONS/common/view/ReactionEquationNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MagnifierNode = require( 'ACID_BASE_SOLUTIONS/common/view/MagnifierNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PHColorKeyNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHColorKeyNode' );
  var PHMeterNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHMeterNode' );
  var PHPaperNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHPaperNode' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  var ViewMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ViewMode' );

  /**
   * @param {ABSModel} model
   * @param {Node} solutionControl
   * @constructor
   */
  function ABSView( model, solutionControl ) {

    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 504 ) } );

    // @public properties that are specific to the view
    this.viewProperties = new ABSViewProperties();

    var beakerNode = new BeakerNode( model.beaker );
    var equationNode = new ReactionEquationNode( model.beaker, model.solutionTypeProperty );
    var magnifierNode = new MagnifierNode( model.magnifier );
    var graphNode = new ConcentrationGraphNode( model.graph );
    var pHMeterNode = new PHMeterNode( model.pHMeter );
    var pHPaperNode = new PHPaperNode( model.pHPaper );
    var pHColorKeyNode = new PHColorKeyNode( model.pHPaper.paperSize, { left: model.beaker.left + 3, bottom: model.beaker.top - 50 } );
    var conductivityTesterNode = new ABSConductivityTesterNode( model.conductivityTester );
    var controlPanel = new ABSControlPanel( model, this.viewProperties, solutionControl, {
      // vertically centered at right edge of screen
      right: this.layoutBounds.right - 20,
      centerY: this.layoutBounds.centerY,
      maxWidth: 0.75 * ( this.layoutBounds.width - beakerNode.width ) // constrain width for i18n
    } );

    var rootNode = new Node( {
      children: [
        pHMeterNode,
        pHColorKeyNode,
        pHPaperNode,
        conductivityTesterNode,
        beakerNode,
        equationNode,
        magnifierNode,
        graphNode,
        controlPanel
      ]
    } );
    this.addChild( rootNode );

    this.viewProperties.solventVisibleProperty.link( function( soluteVisible ) {
      magnifierNode.setSolventVisible( soluteVisible );
    } );

    this.viewProperties.viewModeProperty.link( function( viewMode ) {
      magnifierNode.visible = ( viewMode === ViewMode.MOLECULES  );
      graphNode.visible = ( viewMode === ViewMode.GRAPH );
    } );

    this.viewProperties.toolModeProperty.link( function( toolMode ) {
      pHMeterNode.visible = ( toolMode === ToolMode.PH_METER );
      pHPaperNode.visible = pHColorKeyNode.visible = ( toolMode === ToolMode.PH_PAPER );
      conductivityTesterNode.visible = ( toolMode === ToolMode.CONDUCTIVITY );
    } );
  }

  acidBaseSolutions.register( 'ABSView', ABSView );

  return inherit( ScreenView, ABSView, {

    // @public resets properties that are specific to the view
    reset: function() { this.viewProperties.reset(); }
  } );
} );
