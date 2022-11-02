// Copyright 2014-2021, University of Colorado Boulder

/**
 * View for the 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSScreenView from '../../common/view/ABSScreenView.js';
import IntroductionModel from '../model/IntroductionModel.js';
import IntroductionSolutionPanel from './IntroductionSolutionPanel.js';

export default class IntroductionScreenView extends ABSScreenView {

  public constructor( model: IntroductionModel ) {
    super(
      model,
      alignGroup => new IntroductionSolutionPanel( model.solutionTypeProperty, alignGroup )
    );
  }
}

acidBaseSolutions.register( 'IntroductionScreenView', IntroductionScreenView );