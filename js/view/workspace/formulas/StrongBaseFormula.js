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
    HTMLText = require( 'SCENERY/nodes/HTMLText' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),

  // molecules
    MOHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/MOHMolecule' ),
    MMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/MMolecule' ),
    OHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/OHMolecule' ),

  // images
    arrowSingleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_single.png' ),

  // constants
    FONT = new PhetFont( 13 ),
    TEXT_OFFSET = 23,
    TEXT_SUP_OFFSET = TEXT_OFFSET - 3;

  function StrongBaseFormula( options ) {
    Node.call( this, options );

    // left expression
    // left expression: MOH molecule
    this.addChild( new MOHMolecule() );
    this.addChild( new Text( 'MOH', {font: FONT, centerX: 8, centerY: TEXT_OFFSET} ) );

    // straight sign
    this.addChild( new Image( arrowSingleImage, {scale: 0.75, x: 32, y: 18} ) );

    // right expression
    // right expression: A molecule
    this.addChild( new MMolecule( {x: 75} ) );
    this.addChild( new HTMLText( 'M<sup>+</sup>', {font: FONT, centerX: 75, centerY: TEXT_SUP_OFFSET} ) );

    // right expression: plus sign
    this.addChild( new Text( '+', {font: FONT, centerX: 95, centerY: TEXT_OFFSET} ) );

    // right expression: OH molecule
    this.addChild( new OHMolecule( {x: 116} ) );
    this.addChild( new HTMLText( 'OH<sup>-</sup>', {font: FONT, centerX: 116, centerY: TEXT_SUP_OFFSET} ) );
  }

  return inherit( Node, StrongBaseFormula );
} );