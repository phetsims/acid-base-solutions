// Copyright 2002-2013, University of Colorado Boulder

/**
 * Workspace container for the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Beaker = require( 'ACID_BASE_SOLUTIONS/view/workspace/Beaker' ),
    Magnifier = require( 'ACID_BASE_SOLUTIONS/view/workspace/magnifier/Magnifier' ),
    Formula = require( 'ACID_BASE_SOLUTIONS/view/workspace/formulas/Formula' ),
    EquilibriumConcentrationBarChart = require( './equilibrium-concentration-graph/EquilibriumConcentrationBarChart' );

  // tests
  var PHMeterTest = require( 'ACID_BASE_SOLUTIONS/view/workspace/tests/PHMeterTest' ),
    PHPaperTest = require( 'ACID_BASE_SOLUTIONS/view/workspace/tests/PHPaperTest' ),
    ConductivityTest = require( 'ACID_BASE_SOLUTIONS/view/workspace/tests/conductivity-test/ConductivityTest' );

  function Workspace( model, options ) {
    Node.call( this, options );

    // add pH meter
    this.addChild( new PHMeterTest( model.pHMeter ) );

    // add pH paper
    this.addChild( new PHPaperTest( model.pHPaper ) );

    // add conductivity test
    this.addChild( new ConductivityTest( model.conductivityTest ) );

    // add beaker
    this.addChild( new Beaker( model.beaker ) );

    // add formulas
    this.addChild( new Formula( model.formula ) );

    // add magnifier
    this.addChild( new Magnifier( model.magnifier ) );

    // add concentration bar chart
    this.addChild( new EquilibriumConcentrationBarChart( model.barChart ) );
  }

  return inherit( Node, Workspace );
} );
