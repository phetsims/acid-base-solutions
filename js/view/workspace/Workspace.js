// Copyright 2002-2013, University of Colorado Boulder

/**
 * Workspace container for the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    Beaker = require( './Beaker' ),
    Magnifier = require( './magnifier/Magnifier' ),
    Formula = require( './formulas/Formula' ),
    EquilibriumConcentrationBarChart = require( './equilibrium-concentration-graph/EquilibriumConcentrationBarChart' ),

  // tests
    PHMeterTest = require( './tests/PHMeterTest' ),
    PHPaperTest = require( './tests/PHPaperTest' ),
    ConductivityTest = require( './tests/conductivity-test/ConductivityTest' );

  function Workspace( model, options ) {
    Node.call( this, options );

    // add pH meter
    this.addChild( new PHMeterTest( model, {x: model.width / 2.2, y: model.height / 20} ) );

    // add pH paper
    this.addChild( new PHPaperTest( model, {x: model.width / 8, y: model.height / 45} ) );

    // add conductivity test
    this.addChild( new ConductivityTest( model, {x: model.width / 4, y: model.height / 75} ) );

    // add beaker and formulas
    this.addChild( new VBox( {spacing: 5, x: model.width / 3, y: model.height * 0.25, children: [
      new Beaker( model, {} ),
      new Formula( model )
    ]} ) );

    // add magnifier
    this.addChild( new Magnifier( model, {x: model.width / 3, y: model.height / 1.75} ) );

    // add concentration bar chart
    this.addChild( new EquilibriumConcentrationBarChart( model, {x: model.width / 5, y: model.height * 0.3} ) );
  }

  return inherit( Node, Workspace );
} );
