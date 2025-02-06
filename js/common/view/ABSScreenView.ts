// Copyright 2017-2024, University of Colorado Boulder

/**
 * ABSScreenView is the base class for views in 'Acid-Base Solutions' simulation.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSModel from '../model/ABSModel.js';
import ABSConductivityTesterNode from './ABSConductivityTesterNode.js';
import ABSViewProperties from './ABSViewProperties.js';
import BeakerNode from './BeakerNode.js';
import ConcentrationGraphNode from './ConcentrationGraphNode.js';
import ParticlesNode from './ParticlesNode.js';
import PHColorKeyNode from './PHColorKeyNode.js';
import PHMeterNode from './PHMeterNode.js';
import PHPaperNode from './PHPaperNode.js';
import ReactionEquationNode from './ReactionEquationNode.js';
import ToolsRadioButtonGroup from './ToolsRadioButtonGroup.js';
import ViewsPanel from './ViewsPanel.js';

export default class ABSScreenView extends ScreenView {

  // Properties that are specific to the view
  public readonly viewProperties: ABSViewProperties;

  private readonly pHPaperNode: PHPaperNode;

  /**
   * @param model
   * @param createSolutionPanel - creates the control panel titled 'Solution'
   * @param tandem
   */
  protected constructor( model: ABSModel, createSolutionPanel: () => Panel, tandem: Tandem ) {

    super( {
      isDisposable: false,

      // A PhET wide decision was made to not update custom layout bounds even if they do not match the
      // default layout bounds in ScreenView. Do not change these bounds as changes could break or disturb
      // any phet-io instrumention. https://github.com/phetsims/phet-io/issues/1939
      layoutBounds: new Bounds2( 0, 0, 768, 504 ),
      tandem: tandem
    } );

    this.viewProperties = new ABSViewProperties( tandem.createTandem( 'viewProperties' ) );

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // interrupt any interaction that is in progress
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
    const particlesNode = new ParticlesNode( model.beaker, model.solutions, model.solutionProperty,
      this.viewProperties.viewModeProperty, tandem.createTandem( 'particlesNode' ) );
    const graphNode = new ConcentrationGraphNode( model.beaker, model.solutionProperty,
      this.viewProperties.viewModeProperty, tandem.createTandem( 'graphNode' ) );

    // Group all tools under a tandem
    const toolNodesTandem = tandem.createTandem( 'toolNodes' );

    // pH Meter
    const pHMeterNode = new PHMeterNode( model.pHMeter, this.viewProperties.toolModeProperty, toolNodesTandem.createTandem( 'pHMeterNode' ) );

    // pH paper and color key. Some PhET-iO gymnastics here to (1) make pHColorKeyNode look like a child element of
    // pHPaperNode, and (2) support hiding the color key independently.
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

    // Changing the tool selection interrupts interaction with the tools.
    // See https://github.com/phetsims/acid-base-solutions/issues/242
    const toolsParent = new Node( {
      children: [ pHMeterNode, pHPaperAndColorKeyNode, conductivityTesterNode ]
    } );
    this.viewProperties.toolModeProperty.link( () => toolsParent.interruptSubtreeInput() );

    // Controls
    const solutionPanel = createSolutionPanel();
    const viewsPanel = new ViewsPanel( this.viewProperties.viewModeProperty, tandem.createTandem( 'viewsPanel' ) );
    const toolsRadioButtonGroup = new ToolsRadioButtonGroup( this.viewProperties.toolModeProperty,
      tandem.createTandem( 'toolsRadioButtonGroup' ) );

    const panelsParent = new VBox( {
      children: [ solutionPanel, viewsPanel ],
      align: 'center',
      spacing: 10,
      stretch: true
    } );

    const controlsParent = new VBox( {
      children: [ panelsParent, toolsRadioButtonGroup ],
      align: 'center',
      spacing: 10
    } );

    // Centered in the space to the right of the magnifying glass handle
    controlsParent.boundsProperty.link( bounds => {
      controlsParent.centerX = particlesNode.right + ( this.layoutBounds.right - particlesNode.right ) / 2;
      controlsParent.centerY = this.layoutBounds.centerY;
    } );

    const screenViewRootNode = new Node( {
      children: [
        toolsParent,
        beakerNode,
        reactionEquationNode,
        particlesNode,
        graphNode,
        controlsParent,
        resetAllButton
      ]
    } );
    this.addChild( screenViewRootNode );

    // pdom - traversal order. Set this explicitly. Do not rely on the default order of the scene graph.
    screenViewRootNode.pdomOrder = [
      pHMeterNode,
      pHPaperAndColorKeyNode,
      conductivityTesterNode,
      controlsParent,
      resetAllButton
    ];

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