// Copyright 2002-2013, University of Colorado Boulder

/**
 * Base type for views in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var BeakerNode = require( 'ACID_BASE_SOLUTIONS/common/view/BeakerNode' );
  var ConductivityTest = require( 'ACID_BASE_SOLUTIONS/view/workspace/tests/conductivity-test/ConductivityTest' );
  var EquilibriumConcentrationBarChart = require( 'ACID_BASE_SOLUTIONS/view/workspace/equilibrium-concentration-graph/EquilibriumConcentrationBarChart' );
  var Formula = require( 'ACID_BASE_SOLUTIONS/view/workspace/formulas/Formula' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Magnifier = require( 'ACID_BASE_SOLUTIONS/view/workspace/magnifier/Magnifier' );
  var PHMeterTest = require( 'ACID_BASE_SOLUTIONS/view/workspace/tests/PHMeterTest' );
  var PHPaperTest = require( 'ACID_BASE_SOLUTIONS/view/workspace/tests/PHPaperTest' );
  var ScreenView = require( 'JOIST/ScreenView' );

  function AcidBaseSolutionsView( model ) {

    ScreenView.call( this, { renderer: 'svg' } );

    this.addChild( new PHMeterTest( model.pHMeter ) );
    this.addChild( new PHPaperTest( model.pHPaper ) );
    this.addChild( new ConductivityTest( model.conductivityTest ) );
    this.addChild( new BeakerNode( model.beaker ) );
    this.addChild( new Formula( model.formula ) );
    this.addChild( new Magnifier( model.magnifier ) );
    this.addChild( new EquilibriumConcentrationBarChart( model.barChart ) );
  }

  return inherit( ScreenView, AcidBaseSolutionsView );
} );
