// Copyright 2017-2023, University of Colorado Boulder

/**
 * ABSScreenView is the base class for views in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import { AlignGroup, Node, VBox } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSModel from '../model/ABSModel.js';
import ABSConductivityTesterNode from './ABSConductivityTesterNode.js';
import ABSViewProperties from './ABSViewProperties.js';
import BeakerNode from './BeakerNode.js';
import ConcentrationGraphNode from './ConcentrationGraphNode.js';
import MagnifyingGlassNode from './MagnifyingGlassNode.js';
import PHColorKeyNode from './PHColorKeyNode.js';
import PHMeterNode from './PHMeterNode.js';
import PHPaperNode from './PHPaperNode.js';
import ToolsRadioButtonGroup from './ToolsRadioButtonGroup.js';
import ViewsPanel from './ViewsPanel.js';
import ReactionEquationNode from './ReactionEquationNode.js';

export default class ABSScreenView extends ScreenView {

  // Properties that are specific to the view
  public readonly viewProperties: ABSViewProperties;

  private readonly pHPaperNode: PHPaperNode;

  /**
   * @param model
   * @param createSolutionPanel - creates the control panel titled 'Solution'
   * @param tandem
   */
  protected constructor( model: ABSModel, createSolutionPanel: ( alignGroup: AlignGroup ) => Panel, tandem: Tandem ) {

    super( {
      isDisposable: false,
      layoutBounds: new Bounds2( 0, 0, 768, 504 ),
      tandem: tandem
    } );

    this.viewProperties = new ABSViewProperties( tandem.createTandem( 'viewProperties' ) );

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
        this.viewProperties.reset();
      },

      // to compensate for non-default layoutBounds
      scale: this.layoutBounds.width / ScreenView.DEFAULT_LAYOUT_BOUNDS.width,
      right: this.layoutBounds.right - 20,
      bottom: this.layoutBounds.bottom - 20,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    const beakerNode = new BeakerNode( model.beaker, tandem.createTandem( 'beakerNode' ) );

    const reactionEquationNode = new ReactionEquationNode( model.beaker, model.solutionProperty,
      tandem.createTandem( 'reactionEquationNode' ) );

    // Views
    const magnifyingGlassNode = new MagnifyingGlassNode( model.magnifyingGlass, this.viewProperties.viewModeProperty,
      this.viewProperties.solventVisibleProperty, tandem.createTandem( 'magnifyingGlassNode' ) );
    const graphNode = new ConcentrationGraphNode( model.graph, this.viewProperties.viewModeProperty,
      tandem.createTandem( 'graphNode' ) );

    // Group all tools under a tandem
    const toolNodesTandem = tandem.createTandem( 'toolNodes' );

    // pH Meter
    const pHMeterNode = new PHMeterNode( model.pHMeter, this.viewProperties.toolModeProperty, toolNodesTandem.createTandem( 'pHMeterNode' ) );

    // pH paper and color key. Some PhET-iO gymnastics here to be able to hide the color key independently.
    const pHPaperNodeTandem = toolNodesTandem.createTandem( 'pHPaperNode' );
    const pHPaperNode = new PHPaperNode( model.pHPaper, this.viewProperties.toolModeProperty, pHPaperNodeTandem );
    const pHColorKeyNode = new PHColorKeyNode( model.pHPaper.paperSize, {
      left: model.beaker.left + 3,
      bottom: model.beaker.top - 50,
      tandem: pHPaperNodeTandem.createTandem( 'pHColorKeyNode' )
    } );
    const pHPaperAndColorKeyNode = new Node( {
      children: [ pHColorKeyNode, pHPaperNode ],
      visibleProperty: pHPaperNode.visibleProperty
    } );

    // Conductivity tester
    const conductivityTesterNode = new ABSConductivityTesterNode( model.conductivityTester,
      this.viewProperties.toolModeProperty, toolNodesTandem.createTandem( 'conductivityTesterNode' ) );

    // To make panels have the same width
    const panelAlignGroup = new AlignGroup( {
      matchHorizontal: true,
      matchVertical: false
    } );

    // Controls
    const solutionPanel = createSolutionPanel( panelAlignGroup );
    const viewsPanel = new ViewsPanel( this.viewProperties.viewModeProperty, this.viewProperties.solventVisibleProperty,
      panelAlignGroup, tandem.createTandem( 'viewsPanel' ) );
    const toolsRadioButtonGroup = new ToolsRadioButtonGroup( this.viewProperties.toolModeProperty,
      tandem.createTandem( 'toolsRadioButtonGroup' ) );

    const controlsParent = new VBox( {
      children: [ solutionPanel, viewsPanel, toolsRadioButtonGroup ],
      align: 'center',
      spacing: 10
    } );

    // Centered in the space to the right of the magnifying glass
    controlsParent.boundsProperty.link( bounds => {
      controlsParent.centerX = magnifyingGlassNode.right + ( this.layoutBounds.right - magnifyingGlassNode.right ) / 2;
      controlsParent.centerY = this.layoutBounds.centerY;
    } );

    const rootNode = new Node( {
      children: [
        pHMeterNode,
        pHPaperAndColorKeyNode,
        conductivityTesterNode,
        beakerNode,
        reactionEquationNode,
        magnifyingGlassNode,
        graphNode,
        controlsParent,
        resetAllButton
      ]
    } );
    this.addChild( rootNode );

    // needed by step
    this.pHPaperNode = pHPaperNode;
  }

  public reset(): void {
    this.viewProperties.reset();
  }

  public override step( dt: number ): void {
    super.step( dt );
    this.pHPaperNode.step( dt );
  }
}

acidBaseSolutions.register( 'ABSScreenView', ABSScreenView );