// Copyright 2014-2023, University of Colorado Boulder

/**
 * IntroductionScreenView is the view for the 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSScreenView from '../../common/view/ABSScreenView.js';
import IntroductionModel from '../model/IntroductionModel.js';
import IntroductionSolutionPanel from './IntroductionSolutionPanel.js';

export default class IntroductionScreenView extends ABSScreenView {

  public constructor( model: IntroductionModel, tandem: Tandem ) {

    const createSolutionPanel = () => new IntroductionSolutionPanel( model, tandem.createTandem( 'solutionPanel' ) );

    super( model, createSolutionPanel, tandem );
  }
}

acidBaseSolutions.register( 'IntroductionScreenView', IntroductionScreenView );