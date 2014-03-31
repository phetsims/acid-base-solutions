// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation for formula of weak base in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    FormulaAbstract = require( 'ACID_BASE_SOLUTIONS/common/view/formulas/FormulaAbstract' );

  function WeakBaseFormula( options ) {
    FormulaAbstract.call( this, options );

    // B + H2O <-> BH+ + OH-
    this.addChild( this.BNode() );
    this.addChild( this.plusSignNode() );
    this.addChild( this.H2ONode() );
    this.addChild( this.reverseSignNode() );
    this.addChild( this.BHNode() );
    this.addChild( this.plusSignNode() );
    this.addChild( this.OHNode() );

    this.updateLayout();
  }

  return inherit( FormulaAbstract, WeakBaseFormula );
} );