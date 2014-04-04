// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var AcidBaseSolutionsView = require( 'common/view/AcidBaseSolutionsView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SolutionsControl = require( 'ACID_BASE_SOLUTIONS/introduction/view/SolutionsControl' );

  function IntroductionView( model ) {
    AcidBaseSolutionsView.call( this, model, new SolutionsControl( model.property( 'solutionType' ) ) );
  }

  return inherit( AcidBaseSolutionsView, IntroductionView );
} );
