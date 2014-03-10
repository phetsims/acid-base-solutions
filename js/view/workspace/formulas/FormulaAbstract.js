// Copyright 2002-2013, University of Colorado Boulder

/**
 * Abstract constructor of formula 'Acid Base Solutions' sim.
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
    HTMLText = require( 'SCENERY/nodes/HTMLText' ),
    ChemUtils = require( 'NITROGLYCERIN/ChemUtils' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    VStrut = require( 'SUN/VStrut' ),

  // molecules
    AMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/AMolecule' ),
    BMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/BMolecule' ),
    BHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/BHMolecule' ),
    H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),
    H3OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H3OMolecule' ),
    HAMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/HAMolecule' ),
    MMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/MMolecule' ),
    MOHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/MOHMolecule' ),
    OHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/OHMolecule' ),

  // images
    arrowSingleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_single.png' ),
    arrowDoubleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_double.png' ),

  // constants
    CONSTANTS = require( 'model/Constants/Constants' ),
    FONT_SIZE = CONSTANTS.FORMULAS_FONT_SIZE,
    FONT = new PhetFont( FONT_SIZE ),
    HBOX_SPACING = CONSTANTS.FORMULAS_HBOX_SPACING,
    VBOX_SPACING = CONSTANTS.FORMULAS_VBOX_SPACING;

  function FormulaAbstract( options ) {
    HBox.call( this, _.extend( {spacing: HBOX_SPACING, align: 'bottom'}, options ) );
  }

  return inherit( HBox, FormulaAbstract, {
    // A- node
    ANode: function() {
      return new VBox( {spacing: VBOX_SPACING, children: [
        new AMolecule(),
        new HTMLText( 'A<sup>-</sup>', {font: FONT} ),
        new VStrut( 1 )
      ]} );
    },
    // B node
    BNode: function() {
      return new VBox( {spacing: VBOX_SPACING, children: [
        new BMolecule(),
        new Text( 'B', {font: FONT} )
      ]} );
    },
    // BH+ node
    BHNode: function() {
      return new VBox( {spacing: VBOX_SPACING, children: [
        new BHMolecule(),
        new HTMLText( 'BH<sup>+</sup>', {font: FONT} ),
        new VStrut( 1 )
      ]} );
    },
    // H2O node
    H2ONode: function() {
      return new VBox( {spacing: VBOX_SPACING, children: [
        new H2OMolecule(),
        new HTMLText( ChemUtils.toSubscript( 'H2O' ), {font: FONT} )
      ]} );
    },
    // 2H2O node
    H2ODoubleNode: function() {
      return new VBox( {spacing: VBOX_SPACING, children: [
        new HBox( {spacing: HBOX_SPACING, children: [
          new H2OMolecule(),
          new H2OMolecule()
        ]} ),
        new HTMLText( '2' + ChemUtils.toSubscript( 'H2O' ), {font: FONT} )
      ]} );
    },
    // H3O+ node
    H3ONode: function() {
      return new VBox( {spacing: VBOX_SPACING, children: [
        new H3OMolecule(),
        new HTMLText( ChemUtils.toSubscript( 'H3O' ) + '<sup>+</sup>', {font: FONT} ),
        new VStrut( 1 )
      ]} );
    },
    // HA node
    HANode: function() {
      return new VBox( {spacing: VBOX_SPACING, children: [
        new HAMolecule(),
        new Text( 'HA', {font: FONT} )
      ]} );
    },
    // M+ node
    MNode: function() {
      return new VBox( {spacing: VBOX_SPACING, children: [
        new MMolecule(),
        new HTMLText( 'M<sup>+</sup>', {font: FONT} ),
        new VStrut( 1 )
      ]} );
    },
    // MOH node
    MOHNode: function() {
      return new VBox( {spacing: VBOX_SPACING, children: [
        new MOHMolecule(),
        new Text( 'MOH', {font: FONT} )
      ]} );
    },
    // OH- node
    OHNode: function() {
      return new VBox( {spacing: VBOX_SPACING, children: [
        new OHMolecule(),
        new HTMLText( 'OH<sup>-</sup>', {font: FONT} ),
        new VStrut( 1 )
      ]} );
    },
    // plus sign node
    plusSignNode: function() {
      return new Text( '+', {font: FONT} );
    },
    // reverse sign node
    reverseSignNode: function() {
      return new VBox( {spacing: VBOX_SPACING, children: [
        new Image( arrowDoubleImage, {scale: 0.75} ),
        new VStrut( FONT_SIZE / 4 - 3 )
      ]} );
    },
    straightSignNode: function() {
      return new VBox( {spacing: VBOX_SPACING, children: [
        new Image( arrowSingleImage, {scale: 0.75} ),
        new VStrut( FONT_SIZE / 4 - 1 )
      ]} );
    }
  } );
} );