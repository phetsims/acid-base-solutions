// Copyright 2014-2015, University of Colorado Boulder

/**
 * View for the 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var ABSView = require( 'ACID_BASE_SOLUTIONS/common/view/ABSView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SolutionsControl = require( 'ACID_BASE_SOLUTIONS/introduction/view/SolutionsControl' );

  /**
   * @param {IntroductionModel} model
   * @constructor
   */
  function IntroductionScreenView( model ) {
    ABSView.call( this, model, new SolutionsControl( model.solutionTypeProperty ) );
  }

  acidBaseSolutions.register( 'IntroductionScreenView', IntroductionScreenView );

  return inherit( ABSView, IntroductionScreenView );
} );
