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
    Node = require( 'SCENERY/nodes/Node' ),
    Image = require( 'SCENERY/nodes/Image' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONT = new PhetFont( 13 ),
    FONT_SMALL = new PhetFont( 9 ),

  // molecules
    HAMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/HAMolecule' ),
    H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),
    AMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/AMolecule' ),
    H3OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H3OMolecule' ),

  // images
    arrowSingleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_single.png' ),
    arrowDoubleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_double.png' );

  function AcidFormula( options, isWeak ) {
    var textOffset = 23, subOffset = textOffset + 5, supOffset = textOffset - 8;
    Node.call( this, options );

    // left expression
    // left expression: HA molecule
    this.addChild( new HAMolecule() );
    this.addChild( new Text( 'HA', {font: FONT, centerX: 0, centerY: textOffset} ) );

    // left expression: plus sign
    this.addChild( new Text( '+', {font: FONT, centerX: 22, centerY: textOffset} ) );

    // left expression: H2O molecule
    this.addChild( new H2OMolecule( {x: 48} ) );
    this.addChild( new Node( {x: 40, children: [
      new Text( 'H', {font: FONT, centerX: 0, centerY: textOffset} ),
      new Text( '2', {font: FONT_SMALL, centerX: 7.5, centerY: subOffset} ),
      new Text( 'O', {font: FONT, centerX: 15, centerY: textOffset} )
    ]} ) );

    // straight or reverse sign (depend on flag isWeak)
    this.addChild( new Image( (isWeak ? arrowDoubleImage : arrowSingleImage), {scale: 0.75, x: 68, y: 20} ) );

    // right expression
    // right expression: A molecule
    this.addChild( new AMolecule( {x: 105} ) );
    this.addChild( new Node( {x: 105, children: [
      new Text( 'A', {font: FONT, centerX: 0, centerY: textOffset} ),
      new Text( '-', {font: FONT_SMALL, centerX: 6, centerY: supOffset} )
    ]} ) );

    // right expression: plus sign
    this.addChild( new Text( '+', {font: FONT, centerX: 124, centerY: textOffset} ) );

    // right expression: H3O molecule
    this.addChild( new H3OMolecule( {x: 150} ) );
    this.addChild( new Node( {x: 140, children: [
      new Text( 'H', {font: FONT, centerX: 0, centerY: textOffset} ),
      new Text( '3', {font: FONT_SMALL, centerX: 7, centerY: subOffset} ),
      new Text( 'O', {font: FONT, centerX: 14, centerY: textOffset} ),
      new Text( '+', {font: FONT_SMALL, centerX: 23, centerY: supOffset} )
    ]} ) );
  }

  return inherit( Node, AcidFormula );
} );
