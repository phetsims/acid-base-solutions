// Copyright 2014-2021, University of Colorado Boulder

/**
 * View for the 'My Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSScreenView from '../../common/view/ABSScreenView.js';
import MySolutionModel from '../model/MySolutionModel.js';
import MySolutionPanel from './MySolutionPanel.js';

export default class MySolutionScreenView extends ABSScreenView {

  public constructor( model: MySolutionModel ) {
    super(
      model,
      alignGroup => new MySolutionPanel( model.solutionTypeProperty, model.concentrationProperty, model.strengthProperty, alignGroup )
    );
  }
}

acidBaseSolutions.register( 'MySolutionScreenView', MySolutionScreenView );