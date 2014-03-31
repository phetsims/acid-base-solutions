// Copyright 2002-2014, University of Colorado Boulder

/**
 * Abstract constructor of formula 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    HBox = require( 'SCENERY/nodes/HBox' ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    Image = require( 'SCENERY/nodes/Image' ),
    Text = require( 'SCENERY/nodes/Text' ),
    Node = require( 'SCENERY/nodes/Node' ),
    SubSupText = require( 'SCENERY_PHET/SubSupText' ),
    ChemUtils = require( 'NITROGLYCERIN/ChemUtils' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    VStrut = require( 'SUN/VStrut' );

  // molecules
  var AMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/AMolecule' ),
    BMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/BMolecule' ),
    BHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/BHMolecule' ),
    H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),
    H3OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H3OMolecule' ),
    HAMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/HAMolecule' ),
    MMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/MMolecule' ),
    MOHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/MOHMolecule' ),
    OHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/OHMolecule' );

  // images
  var arrowSingleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_single.png' ),
    arrowDoubleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_double.png' );

  // constants
  var FONT_SIZE = 13,
    FONT = new PhetFont( FONT_SIZE ),
    HBOX_SPACING = 4,
    TEXT_SUB_INDENT = FONT_SIZE / 8,
    VBOX_SPACING = 2;
  var SUBSUP_OPTIONS = {font: FONT, supScale: 1};

  function FormulaAbstract( options ) {
    HBox.call( this, _.extend( {spacing: HBOX_SPACING, align: 'bottom'}, options ) );
  }

  return inherit( HBox, FormulaAbstract, {

    // A- node
    ANode: function() {
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
    },

    // B node
    BNode: function() {
      return new VBox( {
        spacing: VBOX_SPACING,
        children: [
          new BMolecule(),
          new Text( 'B', {font: FONT, fontStyle: 'italic'} ),
          new VStrut( TEXT_SUB_INDENT )
        ]
      } );
    },

    // BH+ node
    BHNode: function() {
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
    },

    // H2O node
    H2ONode: function() {
      return new VBox( {spacing: VBOX_SPACING, children: [
        new H2OMolecule(),
        new SubSupText( ChemUtils.toSubscript( 'H2O' ), SUBSUP_OPTIONS )
      ]} );
    },

    // 2H2O node
    H2ODoubleNode: function() {
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
    },

    // H3O+ node
    H3ONode: function() {
      return new VBox( {
        spacing: VBOX_SPACING,
        children: [
          new H3OMolecule(),
          new SubSupText( ChemUtils.toSubscript( 'H3O' ) + '<sup>+</sup>', SUBSUP_OPTIONS )
        ]
      } );
    },

    // HA node
    HANode: function() {
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
    },

    // M+ node
    MNode: function() {
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
    },

    // MOH node
    MOHNode: function() {
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
    },

    // OH- node
    OHNode: function() {
      return new VBox( {
        spacing: VBOX_SPACING,
        children: [
          new OHMolecule(),
          new SubSupText( 'OH<sup>-</sup>', SUBSUP_OPTIONS ),
          new VStrut( TEXT_SUB_INDENT )
        ]
      } );
    },

    // plus sign node
    plusSignNode: function() {
      return new VBox( {
        children: [
          new Text( '+', {font: FONT} ),
          new VStrut( TEXT_SUB_INDENT + VBOX_SPACING )
        ]
      } );
    },

    // reverse sign node
    reverseSignNode: function() {
      return new VBox( {
        spacing: VBOX_SPACING,
        children: [
          new Image( arrowDoubleImage, {scale: 0.75} ),
          new VStrut( TEXT_SUB_INDENT + FONT_SIZE / 4 - 2 )
        ]
      } );
    },

    // straight sign node
    straightSignNode: function() {
      return new VBox( {
        spacing: VBOX_SPACING,
        children: [
          new Image( arrowSingleImage, {scale: 0.75} ),
          new VStrut( TEXT_SUB_INDENT + FONT_SIZE / 4 )
        ]
      } );
    }
  } );
} );