// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for formula of weak base in the 'Acid Base Solutions' sim.
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
    BMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/BMolecule' ),
    H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),
    BHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/BHMolecule' ),
    OHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/OHMolecule' ),

  // images
    arrowDoubleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_double.png' );

  function WeakBaseFormula( model, options ) {
    var textOffset = 23, subOffset = textOffset + 5, supOffset = textOffset - 8;
    Node.call( this, options );

    // left expression
    // left expression: B molecule
    this.addChild( new BMolecule( model ) );
    this.addChild( new Text( 'B', {font: FONT, centerX: 0, centerY: textOffset} ) );

    // left expression: plus sign
    this.addChild( new Text( '+', {font: FONT, centerX: 16, centerY: textOffset} ) );

    // left expression: H2O molecule
    this.addChild( new H2OMolecule( model, {x: 40} ) );
    this.addChild( new Node( {x: 32, children: [
      new Text( 'H', {font: FONT, centerX: 0, centerY: textOffset} ),
      new Text( '2', {font: FONT_SMALL, centerX: 7, centerY: subOffset} ),
      new Text( 'O', {font: FONT, centerX: 15, centerY: textOffset} )
    ]} ) );

    // straight or reverse sign (depend on flag isWeak)
    this.addChild( new Image( arrowDoubleImage, {scale: 0.75, x: 61, y: 15} ) );

    // right expression
    // right expression: BH molecule
    this.addChild( new BHMolecule( model, {x: 105} ) );
    this.addChild( new Node( {x: 105, children: [
      new Text( 'BH', {font: FONT, centerX: 0, centerY: textOffset} ),
      new Text( '+', {font: FONT_SMALL, centerX: 12, centerY: supOffset} )
    ]} ) );

    // right expression: plus sign
    this.addChild( new Text( '+', {font: FONT, centerX: 130, centerY: textOffset} ) );

    // right expression: OH molecule
    this.addChild( new OHMolecule( model, {x: 150} ) );
    this.addChild( new Node( {x: 150, children: [
      new Text( 'OH', {font: FONT, centerX: 0, centerY: textOffset} ),
      new Text( '-', {font: FONT_SMALL, centerX: 12, centerY: supOffset} )
    ]} ) );

  }

  return inherit( Node, WeakBaseFormula );
} );