// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for formula of strong and weak acid in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    FormulaAbstract = require( 'ACID_BASE_SOLUTIONS/view/workspace/formulas/FormulaAbstract' );

  function AcidFormula( isWeak, options ) {
    FormulaAbstract.call( this, options );

    // left expression: HA molecule
    this.addChild( this.HANode() );

    // left expression: plus sign
    this.addChild( this.plusSignNode() );

    // left expression: H2O molecule
    this.addChild( this.H2ONode() );

    // straight or reverse sign (depend on flag isWeak)
    this.addChild( (isWeak ? this.reverseSignNode() : this.straightSignNode()) );

    // right expression: A molecule
    this.addChild( this.ANode() );

    // right expression: plus sign
    this.addChild( this.plusSignNode() );

    // right expression: H3O molecule
    this.addChild( this.H3ONode() );

    this.updateLayout();
  }

  return inherit( FormulaAbstract, AcidFormula );
} );
