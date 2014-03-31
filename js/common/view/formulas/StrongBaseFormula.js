// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation for formula of strong base in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    FormulaAbstract = require( 'ACID_BASE_SOLUTIONS/common/view/formulas/FormulaAbstract' );

  function StrongBaseFormula( options ) {
    FormulaAbstract.call( this, options );

    // MOH -> M+ + OH-
    this.addChild( this.MOHNode() );
    this.addChild( this.straightSignNode() );
    this.addChild( this.MNode() );
    this.addChild( this.plusSignNode() );
    this.addChild( this.OHNode() );

    this.updateLayout();
  }

  return inherit( FormulaAbstract, StrongBaseFormula );
} );