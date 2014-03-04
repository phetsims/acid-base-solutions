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
    HTMLText = require( 'SCENERY/nodes/HTMLText' ),
    ChemUtils = require( 'NITROGLYCERIN/ChemUtils' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),

  // molecules
    HAMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/HAMolecule' ),
    H2OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),
    AMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/AMolecule' ),
    H3OMolecule = require( 'ACID_BASE_SOLUTIONS/view/molecules/H3OMolecule' ),

  // images
    arrowSingleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_single.png' ),
    arrowDoubleImage = require( 'image!ACID_BASE_SOLUTIONS/arrow_double.png' ),

  // constants
    FONT = new PhetFont( 13 ),
    TEXT_OFFSET = 23,
    TEXT_SUP_OFFSET = TEXT_OFFSET - 3;

  function AcidFormula( options, isWeak ) {
    Node.call( this, options );

    // left expression
    // left expression: HA molecule
    this.addChild( new HAMolecule() );
    this.addChild( new Text( 'HA', {font: FONT, centerX: 0, centerY: TEXT_OFFSET} ) );

    // left expression: plus sign
    this.addChild( new Text( '+', {font: FONT, centerX: 22, centerY: TEXT_OFFSET} ) );

    // left expression: H2O molecule
    this.addChild( new H2OMolecule( {x: 48} ) );
    this.addChild( new HTMLText( ChemUtils.toSubscript( 'H2O' ), {font: FONT, centerX: 47, centerY: TEXT_OFFSET} ) );

    // straight or reverse sign (depend on flag isWeak)
    this.addChild( new Image( (isWeak ? arrowDoubleImage : arrowSingleImage), {scale: 0.75, x: 68, y: 20} ) );

    // right expression
    // right expression: A molecule
    this.addChild( new AMolecule( {x: 105} ) );
    this.addChild( new HTMLText( 'A<sup>-</sup>', {font: FONT, centerX: 107, centerY: TEXT_SUP_OFFSET} ) );

    // right expression: plus sign
    this.addChild( new Text( '+', {font: FONT, centerX: 124, centerY: TEXT_OFFSET} ) );

    // right expression: H3O molecule
    this.addChild( new H3OMolecule( {x: 150} ) );
    this.addChild( new HTMLText( ChemUtils.toSubscript( 'H3O' ) + '<sup>+</sup>', {font: FONT, centerX: 149, centerY: TEXT_SUP_OFFSET} ) );
  }

  return inherit( Node, AcidFormula );
} );
