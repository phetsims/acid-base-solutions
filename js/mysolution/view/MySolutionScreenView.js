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
  const SolutionControl = require( 'ACID_BASE_SOLUTIONS/mysolution/view/SolutionControl' );

  class MySolutionScreenView extends ABSScreenView {

    /**
     * @param {MySolutionModel} model
     */
    constructor( model ) {
      super( model,
        new SolutionControl( model.solutionTypeProperty, model.concentrationProperty, model.strengthProperty ) );
    }
  }

  return acidBaseSolutions.register( 'MySolutionScreenView', MySolutionScreenView );
} );
