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
    HTMLText = require( 'SCENERY/nodes/HTMLText' ),
    ChemUtils = require( 'NITROGLYCERIN/ChemUtils' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),

  // molecules
    BMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/BMolecule' ),
    H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),
    BHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/BHMolecule' ),
    OHMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/OHMolecule' ),

  // images
    arrowDoubleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_double.png' ),

  // constants
    FONT = new PhetFont( 13 ),
    TEXT_OFFSET = 23,
    TEXT_SUP_OFFSET = TEXT_OFFSET - 3;

  function WeakBaseFormula( options ) {
    Node.call( this, options );

    // left expression
    // left expression: B molecule
    this.addChild( new BMolecule() );
    this.addChild( new Text( 'B', {font: FONT, centerX: 0, centerY: TEXT_OFFSET} ) );

    // left expression: plus sign
    this.addChild( new Text( '+', {font: FONT, centerX: 16, centerY: TEXT_OFFSET} ) );

    // left expression: H2O molecule
    this.addChild( new H2OMolecule( {x: 40} ) );
    this.addChild( new HTMLText( ChemUtils.toSubscript( 'H2O' ), {font: FONT, centerX: 39, centerY: TEXT_OFFSET} ) );

    // straight or reverse sign (depend on flag isWeak)
    this.addChild( new Image( arrowDoubleImage, {scale: 0.75, x: 61, y: 15} ) );

    // right expression
    // right expression: BH molecule
    this.addChild( new BHMolecule( {x: 105} ) );
    this.addChild( new HTMLText( 'BH<sup>+</sup>', {font: FONT, centerX: 107, centerY: TEXT_SUP_OFFSET} ) );

    // right expression: plus sign
    this.addChild( new Text( '+', {font: FONT, centerX: 130, centerY: TEXT_OFFSET} ) );

    // right expression: OH molecule
    this.addChild( new OHMolecule( {x: 150} ) );
    this.addChild( new HTMLText( 'OH<sup>-</sup>', {font: FONT, centerX: 150, centerY: TEXT_SUP_OFFSET} ) );
  }

  return inherit( Node, WeakBaseFormula );
} );