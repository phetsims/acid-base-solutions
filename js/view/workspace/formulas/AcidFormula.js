// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for formula of strong and weak acid in the 'Acid Base Solutions' sim.
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
    HAMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/HAMolecule' ),
    H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),
    AMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/AMolecule' ),
    H3OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H3OMolecule' ),

  // images
    arrowSingleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_single.png' ),
    arrowDoubleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_double.png' ),

  // constants
    CONSTANTS = require( 'model/Constants/Constants' ),
    FONT_SIZE = CONSTANTS.FORMULAS_FONT_SIZE,
    FONT = new PhetFont( FONT_SIZE ),
    VBOX_SPACING = CONSTANTS.FORMULAS_VBOX_SPACING;

  function AcidFormula( isWeak, options ) {
    HBox.call( this, _.extend( {spacing: CONSTANTS.FORMULAS_HBOX_SPACING, align: 'bottom'}, options ) );

    // left expression
    // left expression: HA molecule
    this.addChild( new VBox( {spacing: VBOX_SPACING, children: [
      new HAMolecule(),
      new Text( 'HA', {font: FONT} )
    ]} ) );

    // left expression: plus sign
    this.addChild( new VBox( {spacing: VBOX_SPACING, children: [
      new Text( '+', {font: FONT} )
    ]} ) );

    // left expression: H2O molecule
    this.addChild( new VBox( {spacing: VBOX_SPACING, children: [
      new H2OMolecule(),
      new HTMLText( ChemUtils.toSubscript( 'H2O' ), {font: FONT} )
    ]} ) );

    // straight or reverse sign (depend on flag isWeak)
    this.addChild( (isWeak ? new VBox( {spacing: VBOX_SPACING, children: [
      new Image( arrowDoubleImage, {scale: 0.75} ),
      new VStrut( FONT_SIZE / 4 - 3 )
    ]} ) : new VBox( {spacing: VBOX_SPACING, children: [
      new Image( arrowSingleImage, {scale: 0.75} ),
      new VStrut( FONT_SIZE / 4 - 1 )
    ]} )) );


    // right expression
    // right expression: A molecule
    this.addChild( new VBox( {spacing: VBOX_SPACING, children: [
      new AMolecule(),
      new HTMLText( 'A<sup>-</sup>', {font: FONT} ),
      new VStrut( 1 )
    ]} ) );

    // right expression: plus sign
    this.addChild( new VBox( {spacing: VBOX_SPACING, children: [
      new Text( '+', {font: FONT} )
    ]} ) );

    // right expression: H3O molecule
    this.addChild( new VBox( {spacing: VBOX_SPACING, children: [
      new H3OMolecule(),
      new HTMLText( ChemUtils.toSubscript( 'H3O' ) + '<sup>+</sup>', {font: FONT} ),
      new VStrut( 1 )
    ]} ) );

    this.updateLayout();
  }

  return inherit( HBox, AcidFormula );
} );
