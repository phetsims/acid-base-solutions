// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for formula of weak base in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    FormulaAbstract = require( 'ACID_BASE_SOLUTIONS/view/workspace/formulas/FormulaAbstract' );

  function WeakBaseFormula( options ) {
    FormulaAbstract.call( this, options );

    // left expression
    // left expression: B molecule
    this.addChild( this.BNode() );

    // left expression: plus sign
    this.addChild( this.plusSignNode() );

    // left expression: H2O molecule
    this.addChild( this.H2ONode() );

    // reverse sign
    this.addChild( this.reverseSignNode() );

    // right expression
    // right expression: BH molecule
    this.addChild( this.BHNode() );

    // right expression: plus sign
    this.addChild( this.plusSignNode() );

    // right expression: OH molecule
    this.addChild( this.OHNode() );

    this.updateLayout();
  }

  return inherit( FormulaAbstract, WeakBaseFormula );
} );