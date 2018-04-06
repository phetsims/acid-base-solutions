// Copyright 2014-2017, University of Colorado Boulder

/**
 * Magnifier view.
 * For performance, draws molecules directly to Canvas using drawImage.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeFactory = require( 'ACID_BASE_SOLUTIONS/common/view/MoleculeFactory' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Util = require( 'DOT/Util' );

  // images
  var solventImage = require( 'image!ACID_BASE_SOLUTIONS/solvent.png' );

  // constants
  var SHOW_ORIGIN = false; // draws a red circle at the origin, for debugging
  var CLIPPING_ENABLED = true; // set to false to debug positioning of molecules
  var LENS_LINE_WIDTH = 8;
  var BASE_CONCENTRATION = 1E-7; // [H3O+] and [OH-] in pure water, value chosen so that pure water shows some molecules
  var BASE_DOTS = 2;
  var MAX_MOLECULES = 200;
  var IMAGE_SCALE = 2; // stored images are scaled this much to improve quality

  /**
   * @param {Magnifier} magnifier
   * @constructor
   */
  function MagnifierNode( magnifier ) {

    var self = this;
    Node.call( this );

    // lens
    var RADIUS = magnifier.radius;
    var lensShape = Shape.circle( 0, 0, RADIUS );
    var lensNode = new Path( lensShape, { stroke: 'black', lineWidth: LENS_LINE_WIDTH } );

    // handle
    var handleNode = new Rectangle( RADIUS + 2, -RADIUS / 7, RADIUS * 0.9, RADIUS / 4, 5, 5, {
      fill: 'rgb(85,55,33)',
      stroke: 'black',
      lineWidth: 1
    } );
    handleNode.rotate( Math.PI / 6 );

    // opaque background, so we don't see things like pH paper in magnifier
    var waterNode = new Circle( RADIUS, { fill: 'rgb(210,231,235)' } );

    // @private solvent (H2O)
    this.solventNode = new Image( solventImage, {
      imageOpacity: 0.6,  // reduce opacity so that other molecules stand out more
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

      self.moleculesNode.reset();

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

  acidBaseSolutions.register( 'MagnifierNode', MagnifierNode );

  /**
   * @param {Magnifier} magnifier
   * @param {Bounds2} lensBounds
   * @constructor
   * @private
   */
  function MoleculesNode( magnifier, lensBounds ) {

    var self = this;
    CanvasNode.call( this, { canvasBounds: lensBounds } );

    this.magnifier = magnifier; // @private
    this.positionRadius = IMAGE_SCALE * ( this.magnifier.radius - ( LENS_LINE_WIDTH / 2 ) );  // @private radius for computing random positions

    // Generate images, this happens asynchronously.
    var createImage = function( moleculeKey ) {
      var moleculeNode = MoleculeFactory[ moleculeKey ]();
      // Scale up to increase quality. Remember to scale down when drawing to canvas.
      moleculeNode.setScaleMagnitude( IMAGE_SCALE, IMAGE_SCALE );
      moleculeNode.toCanvas( function( canvas, x, y, width, height ) {
        self.moleculesData[ moleculeKey ].canvas = canvas;
      } );
    };

    // use typed array if available, it will use less memory and be faster
    var ArrayConstructor = window.Float32Array || window.Array;

    /*
     * Iterate over all solutions and their molecules.
     * Build a data structure that we'll use to store information for each unique type of molecule.
     * The data structure looks like:
     *
     * {
     *    A:   { canvas:..., numberOfMolecules:..., xCoordinates: [...], yCoordinates: [...] },
     *    B:   { canvas:..., numberOfMolecules:..., xCoordinates: [...], yCoordinates: [...] },
     *    BH:  { canvas:..., numberOfMolecules:..., xCoordinates: [...], yCoordinates: [...] },
     *    H3O: { canvas:..., numberOfMolecules:..., xCoordinates: [...], yCoordinates: [...] },
     *    ...
     * }
     *
     * Note that the field names of this.moleculesData will correspond to the 'key' fields in AqueousSolution.molecules.
     * We skip water because it's displayed elsewhere as a static image file.
     */
    this.moleculesData = {};
    for ( var solutionType in magnifier.solutions ) {
      var solution = magnifier.solutions[ solutionType ];
      solution.molecules.forEach( function( molecule ) {
        if ( molecule.key !== 'H2O' && !self.moleculesData.hasOwnProperty( molecule.key ) ) {
          self.moleculesData[ molecule.key ] = {
            canvas: null, // {HTMLCanvasElement}
            numberOfMolecules: 0, // {number}
            // pre-allocate arrays to improve performance
            xCoordinates: new ArrayConstructor( MAX_MOLECULES ), // {number[]}
            yCoordinates: new ArrayConstructor( MAX_MOLECULES ) // {number[]}
          };
          createImage( molecule.key ); // populate the image field asynchronously
        }
      } );
    }
  }

  acidBaseSolutions.register( 'MagnifierNode.MoleculesNode', MoleculesNode );

  inherit( CanvasNode, MoleculesNode, {

    // @public Resets all molecule counts to zero.
    reset: function() {
      for ( var key in this.moleculesData ) {
        this.moleculesData[ key ].numberOfMolecules = 0;
      }
    },

    // @public Updates the molecules data structure and triggers a paintCanvas.
    update: function() {

      var self = this;
      var solutionType = this.magnifier.solutionTypeProperty.get();
      var solution = this.magnifier.solutions[ solutionType ];

      // Update the data structure for each molecule that is in the current solution.
      solution.molecules.forEach( function( molecule ) {
        var key = molecule.key;
        var moleculesData = self.moleculesData[ key ];
        if ( key !== 'H2O' ) { // skip water because it's displayed elsewhere as a static image file

          // map concentration to number of molecules
          var concentration = solution[ molecule.concentrationFunctionName ]();
          var numberOfMolecules = getNumberOfMolecules( concentration );

          // add additional molecules as needed
          var currentNumberOfMolecules = moleculesData.numberOfMolecules;
          for ( var i = currentNumberOfMolecules; i < numberOfMolecules; i++ ) {

            // random distance from the center of the lens
            var distance = self.positionRadius * Math.sqrt( phet.joist.random.nextDouble() );
            var angle = phet.joist.random.nextDouble() * 2 * Math.PI;
            moleculesData.xCoordinates[ i ] = distance * Math.cos( angle );
            moleculesData.yCoordinates[ i ] = distance * Math.sin( angle );
          }

          moleculesData.numberOfMolecules = numberOfMolecules;
        }
      } );

      // This results in paintCanvas being called.
      this.invalidatePaint();
    },

    /*
     * Iterates over each of the current solution's molecules and draws the molecules directly to Canvas.
     * @override
     * @public
     * @param {CanvasRenderingContext2D} context
     */
    paintCanvas: function( context ) {

      var self = this;
      var solutionType = this.magnifier.solutionTypeProperty.get();
      var solution = this.magnifier.solutions[ solutionType ];

      /*
       * Images are stored at a higher resolution to improve their quality.
       * Apply the inverse scale factor to the graphics context, and adjust the radius.
       */
      context.scale( 1 / IMAGE_SCALE, 1 / IMAGE_SCALE );

      // Draw each type of molecule that is in the current solution.
      solution.molecules.forEach( function( molecule ) {
        var key = molecule.key;
        if ( key !== 'H2O' ) {
          var moleculeData = self.moleculesData[ key ];
          // images are generated asynchronously, so test in case they aren't available when this is first called
          if ( moleculeData.canvas ) {
            for ( var i = 0; i < moleculeData.numberOfMolecules; i++ ) {
              var x = moleculeData.xCoordinates[ i ] - moleculeData.canvas.width / 2;
              var y = moleculeData.yCoordinates[ i ] - moleculeData.canvas.height / 2;
              context.drawImage( moleculeData.canvas, Math.floor( x ), Math.floor( y ) ); // Use integer coordinates with drawImage to improve performance.
            }
          }
        }
      } );
    }
  } );

  /**
   * Compute the number of molecules that corresponds to some concentration.
   * This algorithm was ported from the Java implementation, and is documented in acid-base-solutions/doc/HA_A-_ratio_model.pdf.
   * @param {number} concentration
   * @returns {number}
   */
  var getNumberOfMolecules = function( concentration ) {
    var raiseFactor = Util.log10( concentration / BASE_CONCENTRATION );
    var baseFactor = Math.pow( ( MAX_MOLECULES / BASE_DOTS ), ( 1 / Util.log10( 1 / BASE_CONCENTRATION ) ) );
    return Math.round( BASE_DOTS * Math.pow( baseFactor, raiseFactor ) );
  };

  return inherit( Node, MagnifierNode, {

    /*
     * @override @public
     * Update when this node becomes visible.
     */
    setVisible: function( visible ) {
      var wasVisible = this.visible;
      Node.prototype.setVisible.call( this, visible );
      if ( !wasVisible && visible ) {
        this.updateMolecules();
      }
    },

    // @public
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
        this.moleculesNode.update();
      }
    }
  } );
} );
