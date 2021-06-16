// Copyright 2014-2021, University of Colorado Boulder

/**
 * View for the 'My Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSScreenView from '../../common/view/ABSScreenView.js';
import MySolutionPanel from './MySolutionPanel.js';

class MySolutionScreenView extends ABSScreenView {

  /**
   * @param {MySolutionModel} model
   */
  constructor( model ) {
    super(
      model,
      alignGroup => new MySolutionPanel( model.solutionTypeProperty, model.concentrationProperty, model.strengthProperty, alignGroup )
    );
  }
}

acidBaseSolutions.register( 'MySolutionScreenView', MySolutionScreenView );
export default MySolutionScreenView;