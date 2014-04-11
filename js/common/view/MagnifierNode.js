// Copyright 2002-2014, University of Colorado Boulder

/**
 * Magnifier view.
 * For performance, draws molecules directly to Canvas using drawImage.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Bounds2 = require( 'DOT/Bounds2' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeFactory = require( 'ACID_BASE_SOLUTIONS/common/view/MoleculeFactory' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Util = require( 'DOT/Util' );

  // images
  var solventImage = require( 'image!ACID_BASE_SOLUTIONS/../images/solvent.png' );

  // constants
  var SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
  var CLIPPING_ENABLED = true; // set to false to debug positioning of molecules
  var LENS_LINE_WIDTH = 8;
  var BASE_CONCENTRATION = 1E-7; // [H3O+] and [OH-] in pure water, value chosen so that pure water shows some molecules
  var BASE_DOTS = 2;
  var MAX_MOLECULES = 200;
  var IMAGE_SCALE = 2; // stored images are scaled this much to improve quality

  /**
   * This algorithm was ported from the Java implementation, and is documented in acid-base-solutions/doc/HA_A-_ratio_model.pdf.
   * @param {Number} concentration
   * @returns {Number}
   */
  var getNumberOfMolecules = function( concentration ) {
    var raiseFactor = Util.log10( concentration / BASE_CONCENTRATION );
    var baseFactor = Math.pow( ( MAX_MOLECULES / BASE_DOTS ), ( 1 / Util.log10( 1 / BASE_CONCENTRATION ) ) );
    return Math.round( BASE_DOTS * Math.pow( baseFactor, raiseFactor ) );
  };

  /**
   * Paints one type of molecule to a Canvas.
   * Use integer coordinates with drawImage to improve performance.
   *
   * @param {CanvasContextWrapper} wrapper
   * @param {Image} image
   * @param {Number} numberOfMolecules
   * @param {Number} radius
   */
  var paintMolecules = function( wrapper, image, numberOfMolecules, radius ) {
    if ( image ) { // images are generated asynchronously, so test in case they aren't available when this is first called
      var imageXOffset = -image.width / 2;
      var imageYOffset = -image.height / 2;
      var distance, angle;
      for ( var i = 0; i < numberOfMolecules; i++ ) {
        distance = radius * Math.sqrt( Math.random() ); // random distance from the center of the lens
        angle = Math.random() * 2 * Math.PI;
        wrapper.context.drawImage( image,
          Math.floor( distance * Math.cos( angle ) + imageXOffset ),
          Math.floor( distance * Math.sin( angle ) + imageYOffset ) );
      }
    }
  };

  /**
   * @param {Magnifier} magnifier
   * @param {Bounds2} lensBounds
   * @constructor
   */
  function MoleculesNode( magnifier, lensBounds ) {

    var self = this;
    CanvasNode.call( this, { canvasBounds: lensBounds } );

    this.magnifier = magnifier; //@private

    // Generate images, this happens asynchronously.
    var createImage = function( moleculeKey ) {
      var moleculeNode = MoleculeFactory[ moleculeKey ]();
      // Scale up to increase quality. Remember to scale down when drawing to canvas.
      moleculeNode.setScaleMagnitude( IMAGE_SCALE, IMAGE_SCALE );
      moleculeNode.toImage( function( image, x, y ) {
        self.moleculeImages[ moleculeKey ] = image;
      } );
    };

    /*
     * Iterate over all solutions and their molecules. Generate an image for every molecule that we'll need.
     * Note that the field names of this.moleculeImages will correspond to the 'key' fields in AqueousSolution.molecules.
     * We skip water because it's displayed elsewhere as a static image file.
     */
    this.moleculeImages = {};
    for ( var solutionType in magnifier.solutions ) {
      var solution = magnifier.solutions[solutionType];
      solution.molecules.forEach( function( molecule ) {
        if ( molecule.key !== 'H2O' && !self.moleculeImages.hasOwnProperty( molecule.key ) ) {
          self.moleculeImages[ molecule.key ] = null;
          createImage( molecule.key );
        }
      } );
    }
  }

  inherit( CanvasNode, MoleculesNode, {

    /*
     * Iterates over each of the current solution's molecules, computes the number of molecules
     * to display, and draws the molecules directly to Canvas.
     * @override
     * @param {CanvasContextWrapper} wrapper
     */
    paintCanvas: function( wrapper ) {

      var self = this;
      var solutionType = this.magnifier.solutionTypeProperty.value;
      var solution = this.magnifier.solutions[ solutionType ];

      /*
       * Images are stored at a higher resolution to improve their quality.
       * Apply the inverse scale factor to the graphics context, and adjust the radius.
       */
      wrapper.context.scale( 1 / IMAGE_SCALE, 1 / IMAGE_SCALE );
      var radius = IMAGE_SCALE * ( this.magnifier.radius - ( LENS_LINE_WIDTH / 2 ) );

      // Draw each type of molecule.
      solution.molecules.forEach( function( molecule ) {
        if ( molecule.key !== 'H2O' ) {
          var concentration = solution[ molecule.concentrationFunctionName ]();
          var numberOfMolecules = getNumberOfMolecules( concentration );
          paintMolecules( wrapper, self.moleculeImages[ molecule.key ], numberOfMolecules, radius );
        }
      } );
    }
  } );

  /**
   * @param {Magnifier} magnifier
   * @constructor
   */
  function MagnifierNode( magnifier ) {

    Node.call( this );

    // lens
    var RADIUS = magnifier.radius;
    var lensShape = Shape.circle( 0, 0, RADIUS );
    var lensNode = new Path( lensShape, { stroke: 'black', lineWidth: LENS_LINE_WIDTH } );

    // handle
    var handleNode = new Rectangle( RADIUS + 2, -RADIUS / 7, RADIUS * 0.9, RADIUS / 4, 5, 5, { fill: 'rgb(85,55,33)', stroke: 'black', lineWidth: 1 } );
    handleNode.rotate( Math.PI / 6 );

    // opaque background, so we don't see things like pH paper in magnifier
    var waterNode = new Circle( RADIUS, { fill: 'rgb(210,231,235)' } );

    // @private solvent (H2O)
    this.solventNode = new Image( solventImage, {
      opacity: 0.6,  // reduce opacity so that other molecules stand out more
      centerX: 0,
      centerY: 0
    } );

    // @private molecules
    this.moleculesNode = new MoleculesNode( magnifier, new Bounds2( -RADIUS, -RADIUS, RADIUS, RADIUS ) );

    // stuff that's visible through (and therefore clipped to) the lens
    var viewportNode = new Node( { children: [ this.solventNode, this.moleculesNode ] } );
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
    this.translation = magnifier.location;

    // Observe the strength and concentration properties for whichever solution is selected.
    var updateMoleculesBound = this.updateMolecules.bind( this );
    magnifier.solutionTypeProperty.link( function( newSolutionType, prevSolutionType ) {

      // unlink from previous solution
      if ( prevSolutionType ) {
        magnifier.solutions[prevSolutionType].property( 'strength' ).unlink( updateMoleculesBound );
        magnifier.solutions[prevSolutionType].property( 'concentration' ).unlink( updateMoleculesBound );
      }

      // link to new solution
      magnifier.solutions[newSolutionType].property( 'strength' ).link( updateMoleculesBound );
      magnifier.solutions[newSolutionType].property( 'concentration' ).link( updateMoleculesBound );
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
        this.moleculesNode.invalidatePaint(); // results in paintCanvas being called
      }
    }
  } );
} );
