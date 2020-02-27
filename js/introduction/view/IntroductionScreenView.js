// Copyright 2014-2020, University of Colorado Boulder

/**
 * View for the 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSScreenView from '../../common/view/ABSScreenView.js';
import SolutionsControl from './SolutionsControl.js';

class IntroductionScreenView extends ABSScreenView {

  /**
   * @param {IntroductionModel} model
   */
  constructor( model ) {
    super( model, new SolutionsControl( model.solutionTypeProperty ) );
  }
}

acidBaseSolutions.register( 'IntroductionScreenView', IntroductionScreenView );
export default IntroductionScreenView;