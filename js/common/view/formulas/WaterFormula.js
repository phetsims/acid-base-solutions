// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation for formula of water in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    FormulaAbstract = require( 'ACID_BASE_SOLUTIONS/common/view/formulas/FormulaAbstract' );

  function WaterFormula( options ) {
    FormulaAbstract.call( this, options );

    // left expression: H2O molecule
    this.addChild( this.H2ODoubleNode() );

    // reverse sign
    this.addChild( this.reverseSignNode() );

    // right expression: H3O molecule
    this.addChild( this.H3ONode() );

    // right expression: plus sign
    this.addChild( this.plusSignNode() );

    // right expression: OH molecule
    this.addChild( this.OHNode() );

    this.updateLayout();
  }

  return inherit( FormulaAbstract, WaterFormula );
} );