// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation for formula of strong and weak acid in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    FormulaAbstract = require( 'ACID_BASE_SOLUTIONS/common/view/formulas/FormulaAbstract' );

  function AcidFormula( isWeak, options ) {
    FormulaAbstract.call( this, options );

    // HA + H2O ? A- + H3O+
    this.addChild( this.HANode() );
    this.addChild( this.plusSignNode() );
    this.addChild( this.H2ONode() );
    this.addChild( (isWeak ? this.reverseSignNode() : this.straightSignNode()) );
    this.addChild( this.ANode() );
    this.addChild( this.plusSignNode() );
    this.addChild( this.H3ONode() );

    this.updateLayout();
  }

  return inherit( FormulaAbstract, AcidFormula );
} );
