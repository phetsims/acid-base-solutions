// Copyright 2014-2020, University of Colorado Boulder

/**
 * Magnifier view.
 * For performance, draws molecules directly to Canvas using drawImage.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const Image = require( 'SCENERY/nodes/Image' );
  const MoleculesNode = require( 'ACID_BASE_SOLUTIONS/common/view/MoleculesNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Shape = require( 'KITE/Shape' );

  // images
  const solventImage = require( 'image!ACID_BASE_SOLUTIONS/solvent.png' );

  // constants
  const SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
  const CLIPPING_ENABLED = true; // set to false to debug positioning of molecules
  const LENS_LINE_WIDTH = 8;

  class MagnifierNode extends Node {

    /**
     * @param {Magnifier} magnifier
     */
    constructor( magnifier ) {

      super();

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

      // @private solvent (H2O)
      this.solventNode = new Image( solventImage, {
        imageOpacity: 0.6,  // reduce opacity so that other molecules stand out more
        centerX: 0,
        centerY: 0
      } );

      // @private molecules
      this.moleculesNode = new MoleculesNode( magnifier, new Bounds2( -RADIUS, -RADIUS, RADIUS, RADIUS ), LENS_LINE_WIDTH );

      // stuff that's visible through (and therefore clipped to) the lens
      const viewportNode = new Node( { children: [ this.solventNode, this.moleculesNode ] } );
      if ( CLIPPING_ENABLED ) {
        viewportNode.clipArea = lensShape;
      }

      // rendering order
      this.addChild( waterNode );
      this.addChild( viewportNode );
      this.addChild( handleNode );
      this.addChild( lensNode );
      if ( SHOW_ORIGIN ) {
        this.addChild( new Circle( 10, { fill: 'red' } ) );
      }

      // move to correct position
      this.translation = magnifier.position;

      // Observe the strength and concentration properties for whichever solution is selected.
      const updateMoleculesBound = this.updateMolecules.bind( this );
      magnifier.solutionTypeProperty.link( ( newSolutionType, prevSolutionType ) => {

        this.moleculesNode.reset();

        // unlink from previous solution
        if ( prevSolutionType ) {
          magnifier.solutions[ prevSolutionType ].strengthProperty.unlink( updateMoleculesBound );
          magnifier.solutions[ prevSolutionType ].concentrationProperty.unlink( updateMoleculesBound );
        }

        // link to new solution
        magnifier.solutions[ newSolutionType ].strengthProperty.link( updateMoleculesBound );
        magnifier.solutions[ newSolutionType ].concentrationProperty.link( updateMoleculesBound );
      } );
    }

    /*
     * @override @public
     * Update when this node becomes visible.
     */
    setVisible( visible ) {
      const wasVisible = this.visible;
      super.setVisible( visible );
      if ( !wasVisible && visible ) {
        this.updateMolecules();
      }
    }

    // @public
    setSolventVisible( visible ) {
      this.solventNode.visible = visible;
    }

    /*
     * @private
     * Updates the number of molecules visible in the magnifier.
     * To improve performance, updates only when this node is visible.
     */
    updateMolecules() {
      if ( this.visible ) {
        this.moleculesNode.update();
      }
    }
  }

  return acidBaseSolutions.register( 'MagnifierNode', MagnifierNode );
} );
