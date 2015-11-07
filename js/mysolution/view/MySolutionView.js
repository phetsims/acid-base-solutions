// Copyright 2014, University of Colorado Boulder

/**
 * View for the 'My Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AcidBaseSolutionsView = require( 'common/view/AcidBaseSolutionsView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SolutionControl = require( 'ACID_BASE_SOLUTIONS/mysolution/view/SolutionControl' );

  /**
   * @param {MySolutionModel} model
   * @constructor
   */
  function MySolutionView( model ) {
    AcidBaseSolutionsView.call( this, model, new SolutionControl( model.property( 'solutionType' ), model.property( 'concentration' ), model.property( 'strength' ) ) );
  }

  return inherit( AcidBaseSolutionsView, MySolutionView );
} );
