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

    // 2 H2O <-> H3O+ + OH-
    this.addChild( this.H2ODoubleNode() );
    this.addChild( this.reverseSignNode() );
    this.addChild( this.H3ONode() );
    this.addChild( this.plusSignNode() );
    this.addChild( this.OHNode() );

    this.updateLayout();
  }

  return inherit( FormulaAbstract, WaterFormula );
} );