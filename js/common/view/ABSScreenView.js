// Copyright 2017-2020, University of Colorado Boulder

/**
 * Base type for views in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ToolMode from '../enum/ToolMode.js';
import ViewMode from '../enum/ViewMode.js';
import ABSConductivityTesterNode from './ABSConductivityTesterNode.js';
import ABSControlPanel from './ABSControlPanel.js';
import ABSViewProperties from './ABSViewProperties.js';
import BeakerNode from './BeakerNode.js';
import ConcentrationGraphNode from './graph/ConcentrationGraphNode.js';
import MagnifierNode from './MagnifierNode.js';
import PHColorKeyNode from './PHColorKeyNode.js';
import PHMeterNode from './PHMeterNode.js';
import PHPaperNode from './PHPaperNode.js';
import ReactionEquationNode from './ReactionEquationNode.js';

class ABSScreenView extends ScreenView {

  /**
   * @param {ABSModel} model
   * @param {Node} solutionControl
   */
  constructor( model, solutionControl ) {

    super( {
      layoutBounds: new Bounds2( 0, 0, 768, 504 )
    } );

    // @public properties that are specific to the view
    this.viewProperties = new ABSViewProperties();

    const beakerNode = new BeakerNode( model.beaker );
    const equationNode = new ReactionEquationNode( model.beaker, model.solutionTypeProperty );
    const magnifierNode = new MagnifierNode( model.magnifier );
    const graphNode = new ConcentrationGraphNode( model.graph );
    const pHMeterNode = new PHMeterNode( model.pHMeter );
    const pHPaperNode = new PHPaperNode( model.pHPaper );
    const pHColorKeyNode = new PHColorKeyNode( model.pHPaper.paperSize, {
      left: model.beaker.left + 3,
      bottom: model.beaker.top - 50
    } );
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
      magnifierNode.visible = ( viewMode === ViewMode.MOLECULES );
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

  // @public resets properties that are specific to the view
  reset() {
    this.viewProperties.reset();
  }

  // @public
  step( dt ) {
    this.pHPaperNode.step( dt );
  }
}

acidBaseSolutions.register( 'ABSScreenView', ABSScreenView );
export default ABSScreenView;