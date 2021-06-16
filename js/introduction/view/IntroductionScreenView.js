[object Promise]

/**
 * View for the 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSScreenView from '../../common/view/ABSScreenView.js';
import IntroductionSolutionPanel from './IntroductionSolutionPanel.js';

class IntroductionScreenView extends ABSScreenView {

  /**
   * @param {IntroductionModel} model
   */
  constructor( model ) {
    super(
      model,
      alignGroup => new IntroductionSolutionPanel( model.solutionTypeProperty, alignGroup )
    );
  }
}

acidBaseSolutions.register( 'IntroductionScreenView', IntroductionScreenView );
export default IntroductionScreenView;