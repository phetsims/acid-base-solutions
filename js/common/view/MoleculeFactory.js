// Copyright 2002-2014, University of Colorado Boulder

/**
 * Factory for creating molecule nodes.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeColors = require( 'ACID_BASE_SOLUTIONS/common/MoleculeColors' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var Text = require( 'SCENERY/nodes/Text' );

  // constants
  var FONT = new PhetFont( 8 );

  /**
   * @param radius
   * @param color
   * @param options
   * @constructor
   */
  function AtomNode( radius, color, options ) {
    var gradient = new RadialGradient( -radius * 0.2, -radius * 0.3, 0.25, -radius * 0.2, -radius * 0.3, radius * 2 )
      .addColorStop( 0, 'white' )
      .addColorStop( 0.33, color )
      .addColorStop( 1, 'black' );
    Circle.call( this, radius, _.extend( { fill: gradient }, options ) );
  }

  inherit( Circle, AtomNode );

  // NOTE: The field names here must correspond to the 'key' fields in AqueousSolution.molecules.
  return {

    A: function() {
      return new Node( { children: [
        new AtomNode( 7, MoleculeColors.A )
      ] } );
    },

    B: function() {
      return new Node( { children: [
        new AtomNode( 7, MoleculeColors.B )
      ] } );
    },

    BH: function() {
      return new Node( { children: [
        new AtomNode( 4, MoleculeColors.BH, { x: -6, y: -6 } ),
        new AtomNode( 7, MoleculeColors.BH, { x: 0, y: 0 } )
      ] } );
    },

    H2O: function() {
      return new Node( { children: [
        new AtomNode( 4, MoleculeColors.H2O, { x: 0, y: -9 } ),
        new AtomNode( 7, MoleculeColors.H2O, { x: 0, y: 0 } ),
        new AtomNode( 4, MoleculeColors.H2O, { x: -6, y: 5 } )
      ] } );
    },

    H3O: function() {
      return new Node( { children: [
        new AtomNode( 4, MoleculeColors.H3O, { x: 3, y: -7.5 } ),
        new AtomNode( 4, MoleculeColors.H3O, { x: 3, y: 7.5 } ),
        new AtomNode( 7, MoleculeColors.H3O, { x: 0, y: 0 } ),
        new AtomNode( 4, MoleculeColors.H3O, { x: -8, y: 0 } )
      ] } );
    },

    HA: function() {
      return new Node( { children: [
        new AtomNode( 7, MoleculeColors.HA, { x: 0, y: 0 } ),
        new AtomNode( 4, MoleculeColors.HA, { x: -8, y: -1 } )
      ] } );
    },

    M: function() {
      return new Node( { children: [
        new AtomNode( 7, MoleculeColors.M )
      ] } );
    },

    MOH: function() {
      return new Node( { children: [
        // add M ion
        new AtomNode( 6, MoleculeColors.MOH, { x: 0, y: 0 } ),
        new Text( '+', { centerX: 0, centerY: 8.5, font: FONT } ),
        // add OH ion
        new AtomNode( 7, MoleculeColors.MOH, { x: 15, y: 0 } ),
        new AtomNode( 4, MoleculeColors.MOH, { x: 22, y: -4 } ),
        new Text( '-', { centerX: 15, centerY: 8.5, font: FONT } )
      ] } );
    },

    OH: function() {
      return new Node( { children: [
        new AtomNode( 4, MoleculeColors.OH, { x: 8, y: -3 } ),
        new AtomNode( 7, MoleculeColors.OH, { x: 0, y: 0 } )
      ] } );
    }
  };
} );
