// Copyright 2017-2022, University of Colorado Boulder

/**
 * Base type for views in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import { AlignGroup, Node, VBox } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ToolMode from '../enum/ToolMode.js';
import ViewMode from '../enum/ViewMode.js';
import ABSConductivityTesterNode from './ABSConductivityTesterNode.js';
import ABSViewProperties from './ABSViewProperties.js';
import BeakerNode from './BeakerNode.js';
import ConcentrationGraphNode from './graph/ConcentrationGraphNode.js';
import MagnifierNode from './MagnifierNode.js';
import PHColorKeyNode from './PHColorKeyNode.js';
import PHMeterNode from './PHMeterNode.js';
import PHPaperNode from './PHPaperNode.js';
import ReactionEquationNode from './ReactionEquationNode.js';
import ToolsRadioButtonGroup from './ToolsRadioButtonGroup.js';
import ViewsPanel from './ViewsPanel.js';

class ABSScreenView extends ScreenView {

  /**
   * @param {ABSModel} model
   * @param {function(AlignGroup):Panel} createSolutionPanel - creates the panel titled 'Solution'
   */
  constructor( model, createSolutionPanel ) {

    super( {
      layoutBounds: new Bounds2( 0, 0, 768, 504 )
    } );

    // @public properties that are specific to the view
    this.viewProperties = new ABSViewProperties();

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
        this.viewProperties.reset();
      },

      // to compensate for non-default layoutBounds
      scale: this.layoutBounds.width / ScreenView.DEFAULT_LAYOUT_BOUNDS.width,
      right: this.layoutBounds.right - 20,
      bottom: this.layoutBounds.bottom - 20
    } );

    const beakerNode = new BeakerNode( model.beaker );
    const equationNode = new ReactionEquationNode( model.beaker, model.solutionTypeProperty );
    const magnifierNode = new MagnifierNode( model.magnifier );
    const graphNode = new ConcentrationGraphNode( model.graph );

    // Tools
    const pHMeterNode = new PHMeterNode( model.pHMeter );
    const pHPaperNode = new PHPaperNode( model.pHPaper );
    const pHColorKeyNode = new PHColorKeyNode( model.pHPaper.paperSize, {
      left: model.beaker.left + 3,
      bottom: model.beaker.top - 50
    } );
    const conductivityTesterNode = new ABSConductivityTesterNode( model.conductivityTester );

    // To make panels have the same width
    const panelAlignGroup = new AlignGroup( {
      matchHorizontal: true,
      matchVertical: false
    } );

    // Controls
    const solutionPanel = createSolutionPanel( panelAlignGroup );
    const viewsPanel = new ViewsPanel( this.viewProperties.viewModeProperty, this.viewProperties.solventVisibleProperty, panelAlignGroup );
    const toolsRadioButtonGroup = new ToolsRadioButtonGroup( this.viewProperties.toolModeProperty );

    const controlsParent = new VBox( {
      children: [ solutionPanel, viewsPanel, toolsRadioButtonGroup ],
      align: 'center',
      spacing: 10,
      right: resetAllButton.left - 10,
      centerY: this.layoutBounds.centerY
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
        controlsParent,
        resetAllButton
      ]
    } );
    this.addChild( rootNode );

    this.viewProperties.solventVisibleProperty.link( soluteVisible => {
      magnifierNode.setSolventVisible( soluteVisible );
    } );

    this.viewProperties.viewModeProperty.link( viewMode => {
      magnifierNode.visible = ( viewMode === ViewMode.MOLECULES );
      graphNode.visible = ( viewMode === ViewMode.GRAPH );
    } );

    this.viewProperties.toolModeProperty.link( toolMode => {

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