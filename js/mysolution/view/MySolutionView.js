// Copyright 2014-2015, University of Colorado Boulder

/**
 * View for the 'My Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
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

  acidBaseSolutions.register( 'MySolutionView', MySolutionView );

  return inherit( AcidBaseSolutionsView, MySolutionView );
} );
