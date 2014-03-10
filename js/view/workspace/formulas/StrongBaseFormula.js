// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for formula of strong base in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Image = require( 'SCENERY/nodes/Image' ),
    Text = require( 'SCENERY/nodes/Text' ),
    HTMLText = require( 'SCENERY/nodes/HTMLText' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    HBox = require( 'SCENERY/nodes/HBox' ),
    VStrut = require( 'SUN/VStrut' ),

  // molecules
    MOHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/MOHMolecule' ),
    MMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/MMolecule' ),
    OHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/OHMolecule' ),

  // images
    arrowSingleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_single.png' ),

  // constants
    CONSTANTS = require( 'model/Constants/Constants' ),
    FONT_SIZE = CONSTANTS.FORMULAS_FONT_SIZE,
    FONT = new PhetFont( FONT_SIZE ),
    VBOX_SPACING = CONSTANTS.FORMULAS_VBOX_SPACING;

  function StrongBaseFormula( options ) {
    HBox.call( this, _.extend( {spacing: CONSTANTS.FORMULAS_HBOX_SPACING, align: 'bottom'}, options ) );

    // left expression
    // left expression: MOH molecule
    this.addChild( new VBox( {spacing: VBOX_SPACING, children: [
      new MOHMolecule(),
      new Text( 'MOH', {font: FONT} )
    ]} ) );

    // straight sign
    this.addChild( new VBox( {spacing: VBOX_SPACING, children: [
      new Image( arrowSingleImage, {scale: 0.75} ),
      new VStrut( FONT_SIZE / 4 - 1 )
    ]} ) );


    // right expression
    // right expression: A molecule
    this.addChild( new VBox( {spacing: VBOX_SPACING, children: [
      new MMolecule(),
      new HTMLText( 'M<sup>+</sup>', {font: FONT} ),
      new VStrut( 1 )
    ]} ) );

    // right expression: plus sign
    this.addChild( new VBox( {spacing: VBOX_SPACING, children: [
      new Text( '+', {font: FONT} )
    ]} ) );

    // right expression: OH molecule
    this.addChild( new VBox( {spacing: VBOX_SPACING, children: [
      new OHMolecule(),
      new HTMLText( 'OH<sup>-</sup>', {font: FONT} ),
      new VStrut( 1 )
    ]} ) );

    this.updateLayout();
  }

  return inherit( HBox, StrongBaseFormula );
} );