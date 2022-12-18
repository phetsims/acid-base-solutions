// Copyright 2017-2022, University of Colorado Boulder

/**
 * Base type for views in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
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
import ConcentrationGraphNode from './graph/ConcentrationGraphNode.js';
import MagnifierNode from './MagnifierNode.js';
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
   * @param createSolutionPanel - creates the panel titled 'Solution'
   * @param tandem
   */
  public constructor( model: ABSModel, createSolutionPanel: ( alignGroup: AlignGroup ) => Panel, tandem: Tandem ) {

    super( {
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
      bottom: this.layoutBounds.bottom - 20
    } );

    const beakerNode = new BeakerNode( model.beaker, tandem.createTandem( 'beakerNode' ) );

    const reactionEquationNode = new ReactionEquationNode( model.beaker, model.solutionTypeProperty,
      tandem.createTandem( 'reactionEquationNode' ) );

    const magnifierNode = new MagnifierNode( model.magnifier, {
      visibleProperty: new DerivedProperty( [ this.viewProperties.viewModeProperty ], viewMode => ( viewMode === 'molecules' ) ),
      tandem: tandem.createTandem( 'magnifierNode' )
    } );

    const graphNode = new ConcentrationGraphNode( model.graph, {
      visibleProperty: new DerivedProperty( [ this.viewProperties.viewModeProperty ], viewMode => ( viewMode === 'graph' ) ),
      tandem: tandem.createTandem( 'graphNode' )
    } );

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
      spacing: 10
    } );

    // Centered in the space to the right of the magnifying glass
    controlsParent.boundsProperty.link( bounds => {
      controlsParent.centerX = magnifierNode.right + ( this.layoutBounds.right - magnifierNode.right ) / 2;
      controlsParent.centerY = this.layoutBounds.centerY;
    } );

    const rootNode = new Node( {
      children: [
        pHMeterNode,
        pHColorKeyNode,
        pHPaperNode,
        conductivityTesterNode,
        beakerNode,
        reactionEquationNode,
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

    this.viewProperties.toolModeProperty.link( toolMode => {

      pHMeterNode.visible = ( toolMode === 'pHMeter' );

      const pHPaperVisible = ( toolMode === 'pHPaper' );
      pHPaperNode.visible = pHPaperVisible;
      pHColorKeyNode.visible = pHPaperVisible;

      conductivityTesterNode.visible = ( toolMode === 'conductivity' );
    } );

    // needed by step
    this.pHPaperNode = pHPaperNode;
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
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