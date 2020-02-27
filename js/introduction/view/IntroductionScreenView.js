// Copyright 2014-2020, University of Colorado Boulder

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
  const SolutionsControl = require( 'ACID_BASE_SOLUTIONS/introduction/view/SolutionsControl' );

  class IntroductionScreenView extends ABSScreenView {

    /**
     * @param {IntroductionModel} model
     */
    constructor( model ) {
      super( model, new SolutionsControl( model.solutionTypeProperty ) );
    }
  }

  return acidBaseSolutions.register( 'IntroductionScreenView', IntroductionScreenView );
} );
