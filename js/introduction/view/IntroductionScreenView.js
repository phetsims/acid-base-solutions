// Copyright 2014-2017, University of Colorado Boulder

/**
 * View for the 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ABSScreenView = require( 'ACID_BASE_SOLUTIONS/common/view/ABSScreenView' );
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SolutionsControl = require( 'ACID_BASE_SOLUTIONS/introduction/view/SolutionsControl' );

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
