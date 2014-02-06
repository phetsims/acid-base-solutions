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
    pHMeterTest = require( './tests/pHMeterTest' ),
    pHPaperTest = require( './tests/pHPaperTest' ),
    ConductivityTest = require( './tests/ConductivityTest' );

  function Workspace( model, options ) {
    var vbox, formulas;
    Node.call( this, options );

    // add pH meter
    this.addChild( new pHMeterTest( model, {x: model.width / 2.2, y: model.height / 20} ) );

    // add pH paper
    this.addChild( new pHPaperTest( model, {x: model.width / 8, y: model.height / 45} ) );

    // add conductivity test
    this.addChild( new ConductivityTest( model, {x: model.width / 3.25, y: model.height / 10} ) );

    // add beaker and formulas
    this.addChild( vbox = new VBox( {spacing: 5, x: model.width / 3, y: model.height * 0.25, children: [
      new Beaker( model, {} ),
      formulas = new Formula( model )
    ]} ) );

    // add magnifier
    this.addChild( new Magnifier( model, {x: model.width / 3, y: model.height / 1.75} ) );

    // add concentration bar chart
    this.addChild( new EquilibriumConcentrationBarChart( model, {x: model.width / 5, y: model.height * 0.3} ) );

    // add observer for formulas
    model.property( 'solution' ).link( function( solution ) {
      model.SOLUTIONS.forEach( function( sol, index ) {
        if ( sol.type === solution ) {
          formulas.showFormula( index );
        }
      } );
      vbox.updateLayout();
    } );
  }

  return inherit( Node, Workspace );
} );
