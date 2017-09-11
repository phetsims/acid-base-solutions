// Copyright 2014-2015, University of Colorado Boulder

/**
 * View for the 'My Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ABSScreenView = require( 'ACID_BASE_SOLUTIONS/common/view/ABSScreenView' );
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SolutionControl = require( 'ACID_BASE_SOLUTIONS/mysolution/view/SolutionControl' );

  /**
   * @param {MySolutionModel} model
   * @constructor
   */
  function MySolutionScreenView( model ) {
    ABSScreenView.call( this, model,
      new SolutionControl( model.solutionTypeProperty, model.concentrationProperty, model.strengthProperty ) );
  }

  acidBaseSolutions.register( 'MySolutionScreenView', MySolutionScreenView );

  return inherit( ABSScreenView, MySolutionScreenView );
} );
