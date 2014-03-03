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
    HTMLText = require( 'SCENERY/nodes/HTMLText' ),
    ChemUtils = require( 'NITROGLYCERIN/ChemUtils' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONT = new PhetFont( 13 ),

  // molecules
    H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),
    H3OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H3OMolecule' ),
    OHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/OHMolecule' ),

  // images
    arrowDoubleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_double.png' );

  function WaterFormula( options ) {
    var textOffset = 23, supOffset = textOffset - 3;
    Node.call( this, options );

    // left expression
    // left expression: H2O molecule
    this.addChild( new H2OMolecule() );
    this.addChild( new H2OMolecule( {x: 18} ) );

    this.addChild( new HTMLText( '2' + ChemUtils.toSubscript( 'H2O' ), {font: FONT, centerX: 7, centerY: textOffset} ) );

    // reverse sign
    this.addChild( new Image( arrowDoubleImage, {scale: 0.75, x: 36, y: 14} ) );

    // right expression
    // right expression: H3O molecule
    this.addChild( new H3OMolecule( {x: 85} ) );
    this.addChild( new HTMLText( ChemUtils.toSubscript( 'H3O' ) + '<sup>+</sup>', {font: FONT, centerX: 85, centerY: supOffset} ) );

    // right expression: plus sign
    this.addChild( new Text( '+', {font: FONT, centerX: 110, centerY: textOffset} ) );

    // right expression: OH molecule
    this.addChild( new OHMolecule( {x: 130} ) );
    this.addChild( new HTMLText( 'OH<sup>-</sup>', {font: FONT, centerX: 132, centerY: supOffset} ) );
  }

  return inherit( Node, WaterFormula );
} );