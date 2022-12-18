// Copyright 2014-2022, University of Colorado Boulder

/**
 * View for the 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AlignGroup } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSScreenView from '../../common/view/ABSScreenView.js';
import IntroductionModel from '../model/IntroductionModel.js';
import IntroductionSolutionPanel from './IntroductionSolutionPanel.js';

export default class IntroductionScreenView extends ABSScreenView {

  public constructor( model: IntroductionModel, tandem: Tandem ) {

    const createSolutionPanel = ( alignGroup: AlignGroup ) =>
      new IntroductionSolutionPanel( model.solutionTypeProperty, alignGroup, tandem.createTandem( 'solutionPanel' ) );

    super( model, createSolutionPanel, tandem );
  }
}

acidBaseSolutions.register( 'IntroductionScreenView', IntroductionScreenView );