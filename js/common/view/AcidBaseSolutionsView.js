// Copyright 2002-2014, University of Colorado Boulder

/**
 * Base type for views in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AcidBaseSolutionsControlPanel = require( 'ACID_BASE_SOLUTIONS/common/view/AcidBaseSolutionsControlPanel' );
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
  var PropertySet = require( 'AXON/PropertySet' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  var ViewMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ViewMode' );

  /**
   * @param {AcidBaseSolutionsModel} model
   * @param {Node} solutionControl
   * @constructor
   */
  function AcidBaseSolutionsView( model, solutionControl ) {

    ScreenView.call( this, { renderer: 'svg', layoutBounds: new Bounds2( 0, 0, 768, 504 ) } );

    var beakerNode = new BeakerNode( model.beaker );
    var equationNode = new ReactionEquationNode( model.beaker, model.property( 'solutionType' ) );
    var magnifierNode = new MagnifierNode( model.magnifier );
    var graphNode = new ConcentrationGraphNode( model.graph );
    var pHMeterNode = new PHMeterNode( model.pHMeter );
    var pHPaperNode = new PHPaperNode( model.pHPaper );
    var pHColorKeyNode = new PHColorKeyNode( model.pHPaper.paperSize, { left: model.beaker.left + 3, bottom: model.beaker.top - 50 } );
    var conductivityTesterNode = new ABSConductivityTesterNode( model.conductivityTester );

    var rootNode = new Node( {
      children: [
        pHMeterNode,
        pHColorKeyNode,
        pHPaperNode,
        conductivityTesterNode,
        beakerNode,
        equationNode,
        magnifierNode,
        graphNode
      ]
    } );
    this.addChild( rootNode );

    // properties that are specific to the view
    this.viewProperties = new PropertySet( {
      solventVisible: false,
      viewMode: ViewMode.MOLECULES,
      toolMode: ToolMode.PH_METER
    } );

    this.viewProperties.property( 'solventVisible' ).link( function( soluteVisible ) {
      magnifierNode.setSolventVisible( soluteVisible );
    } );

    this.viewProperties.property( 'viewMode' ).link( function( viewMode ) {
      magnifierNode.visible = ( viewMode === ViewMode.MOLECULES  );
      graphNode.visible = ( viewMode === ViewMode.GRAPH );
    } );

    this.viewProperties.property( 'toolMode' ).link( function( toolMode ) {
      pHMeterNode.visible = ( toolMode === ToolMode.PH_METER );
      pHPaperNode.visible = pHColorKeyNode.visible = ( toolMode === ToolMode.PH_PAPER );
      conductivityTesterNode.visible = ( toolMode === ToolMode.CONDUCTIVITY );
    } );

    // control panel
    this.addChild( new AcidBaseSolutionsControlPanel( model, this.viewProperties, solutionControl, {
        // vertically centered at right edge of screen
        right: this.layoutBounds.maxX - 20,
        centerY: this.layoutBounds.centerY
      }
    ) );
  }

  return inherit( ScreenView, AcidBaseSolutionsView, {

    // resets properties that are specific to the view
    reset: function() { this.viewProperties.reset(); }
  } );
} );
