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
  var AcidBaseSolutionsView = require( 'common/view/AcidBaseSolutionsView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SolutionsControl = require( 'ACID_BASE_SOLUTIONS/introduction/view/SolutionsControl' );

  /**
   * @param {IntroductionModel} model
   * @constructor
   */
  function IntroductionView( model ) {
    AcidBaseSolutionsView.call( this, model, new SolutionsControl( model.property( 'solutionType' ) ) );
  }

  acidBaseSolutions.register( 'IntroductionView', IntroductionView );

  return inherit( AcidBaseSolutionsView, IntroductionView );
} );
