// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'Custom Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var AcidBaseSolutionsView = require( 'common/view/AcidBaseSolutionsView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SolutionControl = require( 'ACID_BASE_SOLUTIONS/customsolution/view/SolutionControl' );

  function CustomSolutionView( model ) {
    AcidBaseSolutionsView.call( this, model, new SolutionControl( model.property( 'solutionType' ), model.property( 'concentration' ), model.property( 'strength' ) ) );
  }

  return inherit( AcidBaseSolutionsView, CustomSolutionView );
} );
