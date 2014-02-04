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
    Node = require( 'SCENERY/nodes/Node' ),
    Image = require( 'SCENERY/nodes/Image' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONT = new PhetFont( 13 ),
    FONT_SMALL = new PhetFont( 9 ),

  // molecules
    MOHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/MOHMolecule' ),
    MMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/MMolecule' ),
    OHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/OHMolecule' ),

  // images
    arrowSingleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_single.png' );

  function StrongBaseFormula( model, options ) {
    var textOffset = 23, supOffset = textOffset - 8;
    Node.call( this, options );

    // left expression
    // left expression: MOH molecule
    this.addChild( new MOHMolecule( model ) );
    this.addChild( new Text( 'MOH', {font: FONT, centerX: 8, centerY: textOffset} ) );

    // straight sign
    this.addChild( new Image( arrowSingleImage, {scale: 0.75, x: 32, y: 18} ) );

    // right expression
    // right expression: A molecule
    this.addChild( new MMolecule( model, {x: 75} ) );
    this.addChild( new Node( {x: 75, children: [
      new Text( 'M', {font: FONT, centerX: 0, centerY: textOffset} ),
      new Text( '+', {font: FONT_SMALL, centerX: 6, centerY: supOffset} )
    ]} ) );

    // right expression: plus sign
    this.addChild( new Text( '+', {font: FONT, centerX: 95, centerY: textOffset} ) );

    // right expression: OH molecule
    this.addChild( new OHMolecule( model, {x: 116} ) );
    this.addChild( new Node( {x: 116, children: [
      new Text( 'OH', {font: FONT, centerX: 0, centerY: textOffset} ),
      new Text( '-', {font: FONT_SMALL, centerX: 14, centerY: supOffset} )
    ]} ) );
  }

  return inherit( Node, StrongBaseFormula );
} );