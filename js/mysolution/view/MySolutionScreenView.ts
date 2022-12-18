// Copyright 2014-2022, University of Colorado Boulder

/**
 * View for the 'My Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AlignGroup } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSScreenView from '../../common/view/ABSScreenView.js';
import MySolutionModel from '../model/MySolutionModel.js';
import MySolutionPanel from './MySolutionPanel.js';

export default class MySolutionScreenView extends ABSScreenView {

  public constructor( model: MySolutionModel, tandem: Tandem ) {

    const createSolutionPanel = ( alignGroup: AlignGroup ) =>
      new MySolutionPanel( model.solutionTypeProperty, model.concentrationProperty, model.strengthProperty,
        alignGroup, tandem.createTandem( 'solutionPanel' ) );

    super( model, createSolutionPanel, tandem );
  }
}

acidBaseSolutions.register( 'MySolutionScreenView', MySolutionScreenView );