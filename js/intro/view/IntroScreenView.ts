// Copyright 2014-2023, University of Colorado Boulder

/**
 * IntroScreenView is the view for the 'Intro' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSScreenView from '../../common/view/ABSScreenView.js';
import IntroModel from '../model/IntroModel.js';
import IntroSolutionPanel from './IntroSolutionPanel.js';

export default class IntroScreenView extends ABSScreenView {

  public constructor( model: IntroModel, tandem: Tandem ) {

    const createSolutionPanel = () => new IntroSolutionPanel( model, tandem.createTandem( 'solutionPanel' ) );

    super( model, createSolutionPanel, tandem );
  }
}

acidBaseSolutions.register( 'IntroScreenView', IntroScreenView );