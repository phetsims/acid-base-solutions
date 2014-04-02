// Copyright 2002-2014, University of Colorado Boulder

//TODO remove common/view/magnifier/* when this implementation is completed
/**
 * Magnifying glass view.
 * For performance, draws molecules directly to Canvas using drawImage.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Bounds2 = require( 'DOT/Bounds2' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeFactory = require( 'ACID_BASE_SOLUTIONS/common/view/MoleculeFactory' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );

  // images
  var solventImage = require( 'image!ACID_BASE_SOLUTIONS/../images/solvent.png' );

  function MoleculesNode( lensBounds ) {

    CanvasNode.call( this, { canvasBounds: lensBounds } );

    //TODO are all of these necessary? iterate over solutions to find which ones are needed?
    //@private images for each type of molecule
    this.moleculeImages = {
      A: null,
      B: null,
      BH: null,
      HA: null,
      H3O: null,
      M: null,
      MOH: null,
      OH: null
    };

    //TODO replace this with iteration over this.moleculeImages properties
    // generate images, this happens asynchronously
    MoleculeFactory.A().toImage( function( image, x, y ) {
      this.moleculeImages.A = image;
    } );
    MoleculeFactory.B().toImage( function( image, x, y ) {
      this.moleculeImages.B = image;
    } );
    MoleculeFactory.BH().toImage( function( image, x, y ) {
      this.moleculeImages.BH = image;
    } );
    MoleculeFactory.HA().toImage( function( image, x, y ) {
      this.moleculeImages.HA = image;
    } );
    MoleculeFactory.H3O().toImage( function( image, x, y ) {
      this.moleculeImages.H3O = image;
    } );
    MoleculeFactory.M().toImage( function( image, x, y ) {
      this.moleculeImages.M = image;
    } );
    MoleculeFactory.MOH().toImage( function( image, x, y ) {
      this.moleculeImages.MOH = image;
    } );
    MoleculeFactory.OH().toImage( function( image, x, y ) {
      this.moleculeImages.OH = image;
    } );
  }

  inherit( CanvasNode, MoleculesNode, {

    drawMolecules: function() {
      //TODO
      this.invalidatePaint(); // results in paintCanvas being called
    },

    paintCanvas: function( wrapper ) {
      //TODO draw using context.drawImage
      console.log( 'MoleculesNode.paintCanvas' );//XXX
    },

    /**
     * Paints one species of molecule. Using drawImage is faster than arc.
     * @private
     * @param {CanvasContextWrapper} wrapper
     * @param {Number} numberOfMolecules
     * @param {Image} image
     * @param {Array<Number>} xCoords
     * @param {Array<Number>} yCoords
     */
    paintMolecules: function( wrapper, numberOfMolecules, image, xCoords, yCoords ) {
      if ( image ) { // images are generated asynchronously, so test just in case they aren't available when this is first called
        for ( var i = 0; i < numberOfMolecules; i++ ) {
          wrapper.context.drawImage( image, xCoords[i], yCoords[i] );
        }
      }
    }
  } );

  /**
   * @param {MagnifierModel} magnifierModel
   * @constructor
   */
  function MagnifierNode( magnifier ) {

    Node.call( this );

    var radius = magnifier.radius;

    // lens
    var lensShape = Shape.circle( 0, 0, radius );
    var lensNode = new Path( lensShape, { stroke: 'black', lineWidth: 8 } );

    // handle
    var handleNode = new Rectangle( radius + 2, -radius / 7, radius * 0.9, radius / 4, 5, 5, { fill: 'rgb(85,55,33)', stroke: 'black', lineWidth: 1 } );
    handleNode.rotate( Math.PI / 6 );

    // solvent
    this.solventNode = new Image( solventImage, { scale: 0.5, x: -radius * Math.SQRT2, y: -radius * Math.SQRT2 } );

    // molecules
    var moleculesNode = new MoleculesNode( new Bounds2( magnifier.location.x - radius, magnifier.location.y - radius, magnifier.location.x + radius, magnifier.location.y + radius ) );
    moleculesNode.clipArea = lensShape;

    // rendering order
    this.addChild( this.solventNode );
    this.addChild( moleculesNode );
    this.addChild( handleNode );
    this.addChild( lensNode );

    this.translation = magnifier.location;

    // when solutionType changes, re-wire to new solution
    magnifier.solutionTypeProperty.link( function( newSolutionType, previousSolutionType ) {
      //TODO
    } );
  }

  return inherit( Node, MagnifierNode, {

    /*
     * @override
     * Update when this node becomes visible.
     */
    setVisible: function( visible ) {
      var wasVisible = this.visible;
      Node.prototype.setVisible.call( this, visible );
      if ( !wasVisible && visible ) {
        this.updateMolecules();
      }
    },

    setSolventVisible: function( visible ) {
      this.solventNode.visible = visible;
    },

    /*
     * @private
     * Updates the number of molecules visible in the magnifier.
     * To improve performance, updates only when this node is visible.
     */
    updateMolecules: function() {
      if ( this.visible ) {
        //TODO
      }
    }
  } );
} );
