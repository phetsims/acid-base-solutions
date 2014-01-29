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
    Beaker = require( './Beaker' ),
    Magnifier = require( './Magnifier' ),

  // tests

    pHMeterTest = require( './tests/pHMeterTest' ),
    pHPaperTest = require( './tests/pHPaperTest' ),
    ConductivityTest = require( './tests/ConductivityTest' );

  function Workspace( model, options ) {
    Node.call( this, options );

    // add beaker
    this.addChild( new Beaker( model, {x: model.width / 3, y: model.height / 1.65} ) );

    // add magnifier
    this.addChild( new Magnifier( model, {x: model.width / 3, y: model.height / 1.65 + 10} ) );

    // add pH meter
    this.addChild( new pHMeterTest( model, {x: model.width / 2.2, y: model.height / 20} ) );

    // add pH paper
    this.addChild( new pHPaperTest( model ) );

    // add conductivity test
    this.addChild( new ConductivityTest( model ) );
  }

  return inherit( Node, Workspace );
} );
