// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for formula of water in the 'Acid Base Solutions' sim.
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
    H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),
    H3OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H3OMolecule' ),
    OHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/OHMolecule' ),

  // images
    arrowDoubleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_double.png' );

  function WaterFormula( model, options ) {
    var textOffset = 23, subOffset = textOffset + 5, supOffset = textOffset - 8;
    Node.call( this, options );

    // left expression
    // left expression: H2O molecule
    this.addChild( new H2OMolecule( model ) );
    this.addChild( new H2OMolecule( model, {x: 18} ) );
    this.addChild( new Node( {children: [
      new Text( '2H', {font: FONT, centerX: 0, centerY: textOffset} ),
      new Text( '2', {font: FONT_SMALL, centerX: 10, centerY: subOffset} ),
      new Text( 'O', {font: FONT, centerX: 17, centerY: textOffset} )
    ]} ) );

    // reverse sign
    this.addChild( new Image( arrowDoubleImage, {scale: 0.75, x: 36, y: 14} ) );

    // right expression
    // right expression: H3O molecule
    this.addChild( new H3OMolecule( model, {x: 85} ) );
    this.addChild( new Node( {x: 75, children: [
      new Text( 'H', {font: FONT, centerX: 0, centerY: textOffset} ),
      new Text( '3', {font: FONT_SMALL, centerX: 7, centerY: subOffset} ),
      new Text( 'O', {font: FONT, centerX: 14, centerY: textOffset} ),
      new Text( '+', {font: FONT_SMALL, centerX: 23, centerY: supOffset} )
    ]} ) );

    // right expression: plus sign
    this.addChild( new Text( '+', {font: FONT, centerX: 110, centerY: textOffset} ) );

    // right expression: OH molecule
    this.addChild( new OHMolecule( model, {x: 130} ) );
    this.addChild( new Node( {x: 130, children: [
      new Text( 'OH', {font: FONT, centerX: 0, centerY: textOffset} ),
      new Text( '-', {font: FONT_SMALL, centerX: 14, centerY: supOffset} )
    ]} ) );
  }

  return inherit( Node, WaterFormula );
} );