// Copyright 2014-2019, University of Colorado Boulder

/**
 * View for the 'My Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ABSScreenView = require( 'ACID_BASE_SOLUTIONS/common/view/ABSScreenView' );
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const inherit = require( 'PHET_CORE/inherit' );
  const SolutionControl = require( 'ACID_BASE_SOLUTIONS/mysolution/view/SolutionControl' );

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
