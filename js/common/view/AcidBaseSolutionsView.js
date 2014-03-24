// Copyright 2002-2013, University of Colorado Boulder

/**
 * Base type for views in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
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
  var PHMeterNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHMeterNode' );
  var PHPaperNode = require( 'ACID_BASE_SOLUTIONS/common/view/PHPaperNode' );
  var ScreenView = require( 'JOIST/ScreenView' );

  function AcidBaseSolutionsView( model ) {

    ScreenView.call( this, { renderer: 'svg' } );

    this.addChild( new PHMeterNode( model.pHMeter ) );
    this.addChild( new PHPaperNode( model.pHPaper ) );
    this.addChild( new ConductivityTest( model.conductivityTest ) );
    this.addChild( new BeakerNode( model.beaker ) );
    this.addChild( new Formula( model.formula ) );
    this.addChild( new Magnifier( model.magnifier ) );
    this.addChild( new EquilibriumConcentrationBarChart( model.barChart ) );
  }

  return inherit( ScreenView, AcidBaseSolutionsView );
} );
