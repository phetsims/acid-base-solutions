// Copyright 2002-2014, University of Colorado Boulder

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
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );

  // images
  var solventImage = require( 'image!ACID_BASE_SOLUTIONS/../images/solvent.png' );

  function MoleculesNode( lensBounds ) {
    //TODO generate an image for each molecule type, or get from model?
    CanvasNode.call( this, { canvasBounds: lensBounds } );
  }

  inherit( CanvasNode, MoleculesNode, {

    drawMolecules: function() {
      //TODO
      this.invalidatePaint(); // results in paintCanvas being called
    },

    paintCanvas: function( wrapper ) {
      //TODO draw using context.drawImage
      console.log( 'MoleculesNode.paintCanvas' );//XXX
    }
  } );

  /**
   * @param {MagnifierModel} magnifierModel
   * @constructor
   */
  function MagnifierNode( magnifierModel ) {

    var self = this;
    Node.call( this );

    var radius = magnifierModel.radius;

    // lens
    var lensShape = Shape.circle( 0, 0, radius );
    var lensNode = new Path( lensShape, { stroke: 'black', lineWidth: 8 } );

    // handle
    var handleNode = new Rectangle( radius + 2, -radius / 7, radius * 0.9, radius / 4, 5, 5, { fill: 'rgb(85,55,33)', stroke: 'black', lineWidth: 1 } );
    handleNode.rotate( Math.PI / 6 );

    // solvent
    var solventNode = new Image( solventImage, { scale: 0.5, x: -radius * Math.SQRT2, y: -radius * Math.SQRT2 } );

    // molecules
    var moleculesNode = new MoleculesNode( new Bounds2( magnifierModel.location.x - radius, magnifierModel.location.y - radius, magnifierModel.location.x + radius, magnifierModel.location.y + radius ) );
    moleculesNode.clipArea = lensShape;

    // rendering order
    this.addChild( solventNode );
    this.addChild( moleculesNode );
    this.addChild( handleNode );
    this.addChild( lensNode );

    this.translation = magnifierModel.location;

    magnifierModel.visibleProperty.link( function( visible ) {
      self.visible = visible;
    } );

    magnifierModel.solventVisibleProperty.link( function( solventVisible ) {
      solventNode.visible = solventVisible;
    } );

    //TODO when solutionType changes, re-wire to concentration properties for each molecule in the solution
  }

  return inherit( Node, MagnifierNode );
} );
