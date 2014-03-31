// Copyright 2002-2014, University of Colorado Boulder

/**
 * Factory for creating reaction equations.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var HBox = require( 'SCENERY/nodes/HBox' ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    Image = require( 'SCENERY/nodes/Image' ),
    Text = require( 'SCENERY/nodes/Text' ),
    Node = require( 'SCENERY/nodes/Node' ),
    SubSupText = require( 'SCENERY_PHET/SubSupText' ),
    ChemUtils = require( 'NITROGLYCERIN/ChemUtils' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    VStrut = require( 'SUN/VStrut' );

  // molecules
  var AMolecule = require( 'ACID_BASE_SOLUTIONS/common/view/molecules/AMolecule' ),
    BMolecule = require( 'ACID_BASE_SOLUTIONS/common/view/molecules/BMolecule' ),
    BHMolecule = require( 'ACID_BASE_SOLUTIONS/common/view/molecules/BHMolecule' ),
    H2OMolecule = require( 'ACID_BASE_SOLUTIONS/common/view/molecules/H2OMolecule' ),
    H3OMolecule = require( 'ACID_BASE_SOLUTIONS/common/view/molecules/H3OMolecule' ),
    HAMolecule = require( 'ACID_BASE_SOLUTIONS/common/view/molecules/HAMolecule' ),
    MMolecule = require( 'ACID_BASE_SOLUTIONS/common/view/molecules/MMolecule' ),
    MOHMolecule = require( 'ACID_BASE_SOLUTIONS/common/view/molecules/MOHMolecule' ),
    OHMolecule = require( 'ACID_BASE_SOLUTIONS/common/view/molecules/OHMolecule' );

  // images
  var arrowSingleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_single.png' ),
    arrowDoubleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_double.png' );

  // constants
  var FONT_SIZE = 13;
  var FONT = new PhetFont( FONT_SIZE );
  var HBOX_SPACING = 4;
  var TEXT_SUB_INDENT = FONT_SIZE / 8;
  var VBOX_SPACING = 2;
  var SUBSUP_OPTIONS = {font: FONT, supScale: 1};

  //-------------------------------------------------------------------------------------
  // Private functions for creating components of reaction equations.
  //-------------------------------------------------------------------------------------

  // A- node
  var createANode = function() {
    var A = new Text( 'A', {font: FONT, fontStyle: 'italic'} );
    var minusNode = new Text( '-', {font: FONT, left: A.right, centerY: A.top + ( 0.2 * A.height )} );
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        new AMolecule(),
        new Node( { children: [ A, minusNode ] } ),
        new VStrut( TEXT_SUB_INDENT )
      ]
    } );
  };

  // B node
  var createBNode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        new BMolecule(),
        new Text( 'B', {font: FONT, fontStyle: 'italic'} ),
        new VStrut( TEXT_SUB_INDENT )
      ]
    } );
  };

  // BH+ node
  var createBHNode = function() {
    return new VBox( {spacing: VBOX_SPACING, children: [
      new BHMolecule(),
      new HBox( {
        spacing: 1,
        align: 'bottom',
        children: [
          new Text( 'B', {font: FONT, fontStyle: 'italic'} ),
          new SubSupText( 'H<sup>+</sup>', SUBSUP_OPTIONS ) ]
      } ),
      new VStrut( TEXT_SUB_INDENT )
    ]} );
  };

  // H2O node
  var createH2ONode = function() {
    return new VBox( {spacing: VBOX_SPACING, children: [
      new H2OMolecule(),
      new SubSupText( ChemUtils.toSubscript( 'H2O' ), SUBSUP_OPTIONS )
    ]} );
  };

  // 2H2O node
  var create2H2ONode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        new HBox( {spacing: HBOX_SPACING,
          children: [
            new H2OMolecule(),
            new H2OMolecule()
          ]
        } ),
        new HBox( {
          spacing: 3,
          align: 'top',
          children: [
            new Text( '2', {font: FONT} ),
            new SubSupText( ChemUtils.toSubscript( 'H2O' ), SUBSUP_OPTIONS )
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
        new H3OMolecule(),
        new SubSupText( ChemUtils.toSubscript( 'H3O' ) + '<sup>+</sup>', SUBSUP_OPTIONS )
      ]
    } );
  };

  // HA node
  var createHANode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        new HAMolecule(),
        new HBox( {
          spacing: 1,
          children: [
            new Text( 'H', {font: FONT} ),
            new Text( 'A', {font: FONT, fontStyle: 'italic'} )
          ]
        } ),
        new VStrut( TEXT_SUB_INDENT )
      ]
    } );
  };

  // M+ node
  var createMNode = function() {
    var M = new Text( 'M', {font: FONT, fontStyle: 'italic'} );
    var plusNode = new Text( '+', {font: FONT, left: M.right, centerY: M.top + ( 0.2 * M.height )} );
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        new MMolecule(),
        new Node( { children: [ M, plusNode ] } ),
        new VStrut( TEXT_SUB_INDENT )
      ]
    } );
  };

  // MOH node
  var createMOHNode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        new MOHMolecule(),
        new HBox( {
          spacing: 1,
          children: [
            new Text( 'M', {font: FONT, fontStyle: 'italic'} ),
            new Text( 'OH', {font: FONT} ) ]
        } ),
        new VStrut( TEXT_SUB_INDENT )
      ]
    } );
  };

  // OH- node
  var createOHNode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        new OHMolecule(),
        new SubSupText( 'OH<sup>-</sup>', SUBSUP_OPTIONS ),
        new VStrut( TEXT_SUB_INDENT )
      ]
    } );
  };

  // plus sign node
  var plusSignNode = function() {
    return new VBox( {
      children: [
        new Text( '+', {font: FONT} ),
        new VStrut( TEXT_SUB_INDENT + VBOX_SPACING )
      ]
    } );
  };

  // double-headed arrow to indicate reversible reaction
  var reversibleArrowNode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        new Image( arrowDoubleImage, {scale: 0.75} ),
        new VStrut( TEXT_SUB_INDENT + FONT_SIZE / 4 - 2 )
      ]
    } );
  };

  // single-headed arrow to indicate irreversible reaction
  var irreversibleArrowNode = function() {
    return new VBox( {
      spacing: VBOX_SPACING,
      children: [
        new Image( arrowSingleImage, {scale: 0.75} ),
        new VStrut( TEXT_SUB_INDENT + FONT_SIZE / 4 )
      ]
    } );
  };

  // General properties of an equation node
  var createEquation = function( children ) {
    var options = _.extend( { spacing: HBOX_SPACING, align: 'bottom' }, options );
    options.children = children;
    return new HBox( options );
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

    // HA + H2O ? A- + H3O+
    createAcidEquation: function( options ) {
      options = _.extend( { isWeak: true }, options );
      return createEquation( [
        createHANode(),
        plusSignNode(),
        createH2ONode(),
        ( options.isWeak ? reversibleArrowNode() : irreversibleArrowNode() ),
        createANode(),
        plusSignNode(),
        createH3ONode()
      ] );
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