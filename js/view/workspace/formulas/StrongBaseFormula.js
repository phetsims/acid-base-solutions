// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for formula of strong base in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    FormulaAbstract = require( 'ACID_BASE_SOLUTIONS/view/workspace/formulas/FormulaAbstract' );

  function StrongBaseFormula( options ) {
    FormulaAbstract.call( this, options );

    // left expression: MOH molecule
    this.addChild( this.MOHNode() );

    // straight sign
    this.addChild( this.straightSignNode() );

    // right expression: M molecule
    this.addChild( this.MNode() );

    // right expression: plus sign
    this.addChild( this.plusSignNode() );

    // right expression: OH molecule
    this.addChild( this.OHNode() );

    this.updateLayout();
  }

  return inherit( FormulaAbstract, StrongBaseFormula );
} );