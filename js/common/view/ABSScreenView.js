// Copyright 2017-2019, University of Colorado Boulder

/**
 * Base type for views in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ABSConductivityTesterNode = require( 'ACID_BASE_SOLUTIONS/common/view/ABSConductivityTesterNode' );
  const ABSControlPanel = require( 'ACID_BASE_SOLUTIONS/common/view/ABSControlPanel' );
  const ABSViewProperties = require( 'ACID_BASE_SOLUTIONS/common/view/ABSViewProperties' );
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const BeakerNode = require( 'ACID_BASE_SOLUTIONS/common/view/BeakerNode' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const ConcentrationGraphNode = require( 'ACID_BASE_SOLUTIONS/common/view/graph/ConcentrationGraphNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MagnifierNode = require( 'ACID_BASE_SOLUTIONS/common/view/MagnifierNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PHColorKeyNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHColorKeyNode' );
  const PHMeterNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHMeterNode' );
  const PHPaperNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHPaperNode' );
  const ReactionEquationNode = require( 'ACID_BASE_SOLUTIONS/common/view/ReactionEquationNode' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const ToolMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ToolMode' );
  const ViewMode = require( 'ACID_BASE_SOLUTIONS/common/enum/ViewMode' );

  /**
   * @param {ABSModel} model
   * @param {Node} solutionControl
   * @constructor
   */
  function ABSScreenView( model, solutionControl ) {

    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 504 ) } );

    // @public properties that are specific to the view
    this.viewProperties = new ABSViewProperties();

    const beakerNode = new BeakerNode( model.beaker );
    const equationNode = new ReactionEquationNode( model.beaker, model.solutionTypeProperty );
    const magnifierNode = new MagnifierNode( model.magnifier );
    const graphNode = new ConcentrationGraphNode( model.graph );
    const pHMeterNode = new PHMeterNode( model.pHMeter );
    const pHPaperNode = new PHPaperNode( model.pHPaper );
    const pHColorKeyNode = new PHColorKeyNode( model.pHPaper.paperSize, { left: model.beaker.left + 3, bottom: model.beaker.top - 50 } );
    const conductivityTesterNode = new ABSConductivityTesterNode( model.conductivityTester );
    const controlPanel = new ABSControlPanel( model, this.viewProperties, solutionControl, {
      // vertically centered at right edge of screen
      right: this.layoutBounds.right - 20,
      centerY: this.layoutBounds.centerY,
      maxWidth: 0.75 * ( this.layoutBounds.width - beakerNode.width ) // constrain width for i18n
    } );

    const rootNode = new Node( {
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

      const pHPaperVisible = ( toolMode === ToolMode.PH_PAPER );
      pHPaperNode.visible = pHPaperVisible;
      pHColorKeyNode.visible = pHPaperVisible;

      conductivityTesterNode.visible = ( toolMode === ToolMode.CONDUCTIVITY );
    } );

    // @private needed by methods
    this.pHPaperNode = pHPaperNode;
  }

  acidBaseSolutions.register( 'ABSScreenView', ABSScreenView );

  return inherit( ScreenView, ABSScreenView, {

    // @public resets properties that are specific to the view
    reset: function() { this.viewProperties.reset(); },

    // @public
    step: function( dt ) {
      this.pHPaperNode.step( dt );
    }
  } );
} );
