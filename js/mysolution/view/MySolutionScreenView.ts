// Copyright 2014-2026, University of Colorado Boulder

/**
 * MySolutionScreenView is the view for the 'My Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import ABSScreenView from '../../common/view/ABSScreenView.js';
import MySolutionModel from '../model/MySolutionModel.js';
import MySolutionPanel from './MySolutionPanel.js';

export default class MySolutionScreenView extends ABSScreenView {

  public constructor( model: MySolutionModel, tandem: Tandem ) {

    const createSolutionPanel = () =>
      new MySolutionPanel( model, model.concentrationProperty, model.strengthProperty, tandem.createTandem( 'solutionPanel' ) );

    super( model, createSolutionPanel, tandem );
  }
}
