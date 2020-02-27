// Copyright 2014-2020, University of Colorado Boulder

/**
 * View for the 'My Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSScreenView from '../../common/view/ABSScreenView.js';
import SolutionControl from './SolutionControl.js';

class MySolutionScreenView extends ABSScreenView {

  /**
   * @param {MySolutionModel} model
   */
  constructor( model ) {
    super( model,
      new SolutionControl( model.solutionTypeProperty, model.concentrationProperty, model.strengthProperty ) );
  }
}

acidBaseSolutions.register( 'MySolutionScreenView', MySolutionScreenView );
export default MySolutionScreenView;