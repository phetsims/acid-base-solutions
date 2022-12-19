// Copyright 2014-2022, University of Colorado Boulder

/**
 * Magnifier view.
 * For performance, draws molecules directly to Canvas using drawImage.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { Shape } from '../../../../kite/js/imports.js';
import { Circle, Image, Node, Path, Rectangle } from '../../../../scenery/js/imports.js';
import solvent_png from '../../../images/solvent_png.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import Magnifier from '../model/Magnifier.js';
import MoleculesNode from './MoleculesNode.js';
import { ViewMode } from '../enum/ViewMode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';

// constants
const SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
const CLIPPING_ENABLED = true; // set to false to debug positioning of molecules
const LENS_LINE_WIDTH = 8;

export default class MagnifierNode extends Node {

  private readonly solventNode: Node;
  private readonly moleculesNode: MoleculesNode;

  public constructor( magnifier: Magnifier, viewModeProperty: StringUnionProperty<ViewMode>,
                      solventVisibleProperty: TReadOnlyProperty<boolean>, tandem: Tandem ) {

    // lens
    const RADIUS = magnifier.radius;
    const lensShape = Shape.circle( 0, 0, RADIUS );
    const lensNode = new Path( lensShape, { stroke: 'black', lineWidth: LENS_LINE_WIDTH } );

    // handle
    const handleNode = new Rectangle( RADIUS + 2, -RADIUS / 7, RADIUS * 0.9, RADIUS / 4, 5, 5, {
      fill: 'rgb( 85, 55, 33 )',
      stroke: 'black',
      lineWidth: 1
    } );
    handleNode.rotate( Math.PI / 6 );

    // opaque background, so we don't see things like pH paper in magnifier
    const waterNode = new Circle( RADIUS, { fill: 'rgb(210,231,235)' } );

    // solvent (H2O)
    const solventNode = new Image( solvent_png, {
      visibleProperty: solventVisibleProperty,
      imageOpacity: 0.6,  // reduce opacity so that other molecules stand out more
      centerX: 0,
      centerY: 0
    } );

    // molecules
    const moleculesNode = new MoleculesNode( magnifier, new Bounds2( -RADIUS, -RADIUS, RADIUS, RADIUS ), LENS_LINE_WIDTH );

    // stuff that's visible through (and therefore clipped to) the lens
    const viewportNode = new Node( { children: [ solventNode, moleculesNode ] } );
    if ( CLIPPING_ENABLED ) {
      viewportNode.clipArea = lensShape;
    }

    const children: Node[] = [ waterNode, viewportNode, handleNode, lensNode ];
    if ( SHOW_ORIGIN ) {
      children.push( new Circle( 10, { fill: 'red' } ) );
    }

    super( {
      children: children,
      translation: magnifier.position,
      visibleProperty: new DerivedProperty( [ viewModeProperty ], viewMode => ( viewMode === 'molecules' ), {
        tandem: tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      tandem: tandem
    } );

    this.moleculesNode = moleculesNode;
    this.solventNode = solventNode;

    // Observe the strength and concentration Properties for the selected solution.
    const updateMoleculesBound = this.updateMolecules.bind( this );
    magnifier.solutionTypeProperty.link( ( newSolutionType, previousSolutionType ) => {

      this.moleculesNode.reset();

      // unlink from previous solution
      if ( previousSolutionType ) {
        const previousSolution = magnifier.solutionsMap.get( previousSolutionType )!;
        assert && assert( previousSolution );
        previousSolution.strengthProperty.unlink( updateMoleculesBound );
        previousSolution.concentrationProperty.unlink( updateMoleculesBound );
      }

      // link to new solution
      const newSolution = magnifier.solutionsMap.get( newSolutionType )!;
      assert && assert( newSolution );
      newSolution.strengthProperty.link( updateMoleculesBound );
      newSolution.concentrationProperty.link( updateMoleculesBound );
    } );

    // Update when this Node becomes visible.
    this.visibleProperty.link( visible => visible && this.updateMolecules() );

    this.addLinkedElement( magnifier, {
      tandem: tandem.createTandem( magnifier.tandem.name )
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  /*
   * Updates the number of molecules visible in the magnifier.
   * To improve performance, updates only when this node is visible.
   */
  private updateMolecules(): void {
    if ( this.visible ) {
      this.moleculesNode.update();
    }
  }
}

acidBaseSolutions.register( 'MagnifierNode', MagnifierNode );