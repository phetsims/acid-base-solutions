// Copyright 2014-2017, University of Colorado Boulder

/**
 * View for the 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ABSScreenView = require( 'ACID_BASE_SOLUTIONS/common/view/ABSScreenView' );
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const inherit = require( 'PHET_CORE/inherit' );
  const SolutionsControl = require( 'ACID_BASE_SOLUTIONS/introduction/view/SolutionsControl' );

  /**
   * @param {IntroductionModel} model
   * @constructor
   */
  function IntroductionScreenView( model ) {
    ABSScreenView.call( this, model, new SolutionsControl( model.solutionTypeProperty ) );
  }

  acidBaseSolutions.register( 'IntroductionScreenView', IntroductionScreenView );

  return inherit( ABSScreenView, IntroductionScreenView );
} );
