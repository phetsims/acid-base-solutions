// Copyright 2002-2014, University of Colorado Boulder

/**
 * Factory for creating reaction equations.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HBox = require( 'SCENERY/nodes/HBox' );
  var MoleculeFactory = require( 'ACID_BASE_SOLUTIONS/common/view/MoleculeFactory' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Shape = require( 'KITE/Shape' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VStrut = require( 'SCENERY/nodes/VStrut' );

  // constants
  var EQUATION_SCALE = 1.5; // applied to all equations, see issue #88
  var HBOX_SPACING = 4;
  var VBOX_SPACING = 2;

  // constants related to text
  var FONT_SIZE = 13;
  var FONT = new PhetFont( FONT_SIZE );
  var SUBSCRIPT_Y_OFFSET = FONT_SIZE / 8; // vertical alignment workaround applied to any equation term that doesn't have a subscript
  var SUBSUP_OPTIONS = { font: FONT, supScale: 1 }; // options for all instances of SubSupNode

  // constants related to arrows, issue #95
  var ARROWS_VERTICAL_SPACE = 3; // vertical space between reversible arrows
  var ARROWS_LENGTH = 25;
  var ARROWS_HEAD_RADIUS = 0.72 * ARROWS_LENGTH;
  var ARROWS_HEAD_ANGLE_DELTA = 0.2 * Math.PI;

  //-------------------------------------------------------------------------------------
  // Private functions for creating components of reaction equations.
  //-------------------------------------------------------------------------------------

  // A- node
  var createANode = function() {
    var A = new Text( 'A', { font: FONT, fontStyle: 'italic' } );
    var minusNode = new Text( '-', { font: FONT, left: A.right, centerY: A.top + ( 0.2 * A.height ) } );
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        MoleculeFactory.A(),
        new Node( { children: [ A, minusNode ] } ),
        new VStrut( SUBSCRIPT_Y_OFFSET )
      ]
    } );
  };

  // B node
  var createBNode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        MoleculeFactory.B(),
        new Text( 'B', { font: FONT, fontStyle: 'italic' } ),
        new VStrut( SUBSCRIPT_Y_OFFSET )
      ]
    } );
  };

  // BH+ node
  var createBHNode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        MoleculeFactory.BH(),
        new HBox( {
          spacing: 1,
          align: 'bottom',
          children: [
            new Text( 'B', { font: FONT, fontStyle: 'italic' } ),
            new SubSupText( 'H<sup>+</sup>', SUBSUP_OPTIONS ) ]
        } ),
        new VStrut( SUBSCRIPT_Y_OFFSET )
      ]
    } );
  };

  // H2O node
  var createH2ONode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        MoleculeFactory.H2O(),
        new SubSupText( 'H<sub>2</sub>O', SUBSUP_OPTIONS )
      ]
    } );
  };

  // 2H2O node
  var create2H2ONode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        new HBox( {
          spacing: HBOX_SPACING,
          children: [
            MoleculeFactory.H2O(),
            MoleculeFactory.H2O()
          ]
        } ),
        new HBox( {
          spacing: 3,
          align: 'top',
          children: [
            new Text( '2', { font: FONT } ),
            new SubSupText( 'H<sub>2</sub>O', SUBSUP_OPTIONS )
          ]
        } )
      ]
    } );
  };

  // H3O+ node
  var createH3ONode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        MoleculeFactory.H3O(),
        new SubSupText( 'H<sub>3</sub>O<sup>+</sup>', SUBSUP_OPTIONS )
      ]
    } );
  };

  // HA node
  var createHANode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        MoleculeFactory.HA(),
        new HBox( {
          spacing: 1,
          children: [
            new Text( 'H', { font: FONT } ),
            new Text( 'A', { font: FONT, fontStyle: 'italic' } )
          ]
        } ),
        new VStrut( SUBSCRIPT_Y_OFFSET )
      ]
    } );
  };

  // M+ node
  var createMNode = function() {
    var M = new Text( 'M', { font: FONT, fontStyle: 'italic' } );
    var plusNode = new Text( '+', { font: FONT, left: M.right, centerY: M.top + ( 0.2 * M.height ) } );
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        MoleculeFactory.M(),
        new Node( { children: [ M, plusNode ] } ),
        new VStrut( SUBSCRIPT_Y_OFFSET )
      ]
    } );
  };

  // MOH node
  var createMOHNode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        MoleculeFactory.MOH(),
        new HBox( {
          spacing: 1,
          children: [
            new Text( 'M', { font: FONT, fontStyle: 'italic' } ),
            new Text( 'OH', { font: FONT } ) ]
        } ),
        new VStrut( SUBSCRIPT_Y_OFFSET )
      ]
    } );
  };

  // OH- node
  var createOHNode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        MoleculeFactory.OH(),
        new SubSupText( 'OH<sup>-</sup>', SUBSUP_OPTIONS ),
        new VStrut( SUBSCRIPT_Y_OFFSET )
      ]
    } );
  };

  // plus sign node
  var plusSignNode = function() {
    return new VBox( {
      children: [
        new Text( '+', { font: FONT } ),
        new VStrut( SUBSCRIPT_Y_OFFSET + VBOX_SPACING )
      ]
    } );
  };

  // double arrow to indicate reversible reaction
  var reversibleArrowNode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        new Path( new Shape()
            // top arrow, points right
            .moveTo( 0, -ARROWS_VERTICAL_SPACE / 2 )
            .lineTo( ARROWS_LENGTH, -ARROWS_VERTICAL_SPACE / 2 )
            .lineTo( ARROWS_LENGTH, -ARROWS_VERTICAL_SPACE / 2 + 0.00001 ) // see issue #104
            .arc( ARROWS_LENGTH, -ARROWS_HEAD_RADIUS - ( ARROWS_VERTICAL_SPACE / 2 ), ARROWS_HEAD_RADIUS, 0.5 * Math.PI, 0.5 * Math.PI + ARROWS_HEAD_ANGLE_DELTA )
            // bottom arrow, points left
            .moveTo( ARROWS_LENGTH, ARROWS_VERTICAL_SPACE / 2 )
            .lineTo( 0, ARROWS_VERTICAL_SPACE / 2 )
            .lineTo( 0, ARROWS_VERTICAL_SPACE / 2 + 0.00001 ) // see issue #104
            .arc( 0, ARROWS_HEAD_RADIUS + ( ARROWS_VERTICAL_SPACE / 2 ), ARROWS_HEAD_RADIUS, -0.5 * Math.PI, -0.5 * Math.PI + ARROWS_HEAD_ANGLE_DELTA ),
          { stroke: 'black' } ),
        new VStrut( SUBSCRIPT_Y_OFFSET + FONT_SIZE / 4 - 2 )
      ]
    } );
  };

  // single arrow to indicate irreversible reaction, points right
  var irreversibleArrowNode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        new Path( new Shape()
            .moveTo( 0, 0 )
            .lineTo( ARROWS_LENGTH, 0 )
            .lineTo( ARROWS_LENGTH, 0.00001 ) // see issue #104
            .arc( ARROWS_LENGTH, -ARROWS_HEAD_RADIUS, ARROWS_HEAD_RADIUS, 0.5 * Math.PI, 0.5 * Math.PI + ARROWS_HEAD_ANGLE_DELTA )
            .moveTo( 25, 0 )
            .arc( ARROWS_LENGTH, ARROWS_HEAD_RADIUS, ARROWS_HEAD_RADIUS, -0.5 * Math.PI, -0.5 * Math.PI - ARROWS_HEAD_ANGLE_DELTA, true ),
          { stroke: 'black' } ),
        new VStrut( SUBSCRIPT_Y_OFFSET + FONT_SIZE / 4 )
      ]
    } );
  };

  // Creates an equation by horizontally laying out a set of elements (children).
  var createEquation = function( children ) {
    return new HBox( {
      children: children,
      scale: EQUATION_SCALE,
      spacing: HBOX_SPACING,
      align: 'bottom'
    } );
  };

  // Equations for all acids are similar: HA + H2O ? A- + H3O+
  var createAcidEquation = function( isWeak ) {
    return createEquation( [
      createHANode(),
      plusSignNode(),
      createH2ONode(),
      ( isWeak ? reversibleArrowNode() : irreversibleArrowNode() ),
      createANode(),
      plusSignNode(),
      createH3ONode()
    ] );
  };

  //-------------------------------------------------------------------------------------
  // Public functions for creating reaction equations.
  //-------------------------------------------------------------------------------------

  return {

    // 2 H2O <-> H3O+ + OH-
    createWaterEquation: function() {
      return createEquation( [
        create2H2ONode(),
        reversibleArrowNode(),
        createH3ONode(),
        plusSignNode(),
        createOHNode()
      ] );
    },

    // HA + H2O -> A- + H3O+
    createStrongAcidEquation: function() {
      return createAcidEquation( false /* isWeak */ );
    },

    // HA + H2O <-> A- + H3O+
    createWeakAcidEquation: function() {
      return createAcidEquation( true /* isWeak */ );
    },

    // MOH -> M+ + OH-
    createStrongBaseEquation: function() {
      return createEquation( [
        createMOHNode(),
        irreversibleArrowNode(),
        createMNode(),
        plusSignNode(),
        createOHNode()
      ] );
    },

    // B + H2O <-> BH+ + OH-
    createWeakBaseEquation: function() {
      return createEquation( [
        createBNode(),
        plusSignNode(),
        createH2ONode(),
        reversibleArrowNode(),
        createBHNode(),
        plusSignNode(),
        createOHNode()
      ] );
    }
  };
} );
