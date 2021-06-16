// Copyright 2014-2020, University of Colorado Boulder

/**
 * IntroductionSolutionPanel is a panel for selecting between a set of mutually-exclusive solutions in the
 * Introduction screen.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignBox from '../../../../scenery/js/nodes/AlignBox.js';
import AlignGroup from '../../../../scenery/js/nodes/AlignGroup.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import Panel from '../../../../sun/js/Panel.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import acidBaseSolutionsStrings from '../../acidBaseSolutionsStrings.js';
import ABSConstants from '../../common/ABSConstants.js';
import SolutionType from '../../common/enum/SolutionType.js';
import MoleculeFactory from '../../common/view/MoleculeFactory.js';

class IntroductionSolutionPanel extends Panel {

  /**
   * @param {Property.<SolutionType>} solutionTypeProperty
   * @param {AlignGroup} contentAlignGroup
   * @param {Object} [options]
   */
  constructor( solutionTypeProperty, contentAlignGroup, options ) {
    assert && assert( contentAlignGroup instanceof AlignGroup, 'invalid contentAlignGroup' );

    options = merge( {}, ABSConstants.PANEL_OPTIONS, options );

    // title
    const titleNode = new Text( acidBaseSolutionsStrings.solution, {
      font: ABSConstants.TITLE_FONT,
      maxWidth: 180 // determined empirically
    } );

    // To make all radio button labels have the same width and height
    const labelsAlignGroup = new AlignGroup();

    const radioButtonGroupItems = [

      // Water (H20)
      {
        value: SolutionType.WATER,
        node: createRadioButtonLabel( `${acidBaseSolutionsStrings.water} (H<sub>2</sub>O)`,
          new MoleculeFactory.H2O(), labelsAlignGroup )
      },

      // Strong Acid (HA)
      {
        value: SolutionType.STRONG_ACID,
        node: createRadioButtonLabel( `${acidBaseSolutionsStrings.strongAcid} (H<i>A</i>)`,
          new MoleculeFactory.HA(), labelsAlignGroup )
      },

      // Weak Acid (HA)
      {
        value: SolutionType.WEAK_ACID,
        node: createRadioButtonLabel( `${acidBaseSolutionsStrings.weakAcid} (H<i>A</i>)`,
          new MoleculeFactory.HA(), labelsAlignGroup )
      },

      // Strong Base (M)
      {
        value: SolutionType.STRONG_BASE,
        node: createRadioButtonLabel( `${acidBaseSolutionsStrings.strongBase} (<i>M</i>OH)`,
          new MoleculeFactory.MOH(), labelsAlignGroup )
      },

      // Weak Base (B)
      {
        value: SolutionType.WEAK_BASE,
        node: createRadioButtonLabel( `${acidBaseSolutionsStrings.weakBase} (<i>B</i>)`,
          new MoleculeFactory.B(), labelsAlignGroup )
      }
    ];

    const radioButtonGroup = new AquaRadioButtonGroup( solutionTypeProperty, radioButtonGroupItems, {
      spacing: 8,
      align: 'left',
      radioButtonOptions: {
        radius: 7
      },
      touchAreaXDilation: 10,
      mouseAreaXDilation: 10
    } );

    const content = new AlignBox( new VBox( {
      spacing: 8,
      align: 'left',
      children: [ titleNode, radioButtonGroup ]
    } ), {
      group: contentAlignGroup,
      xAlign: 'left'
    } );

    super( content, options );
  }
}

/**
 * Creates a label for a radio button.
 * @param {string} richTextString
 * @param {Node} iconNode
 * @param {AlignGroup} labelsAlignGroup
 * @returns {Node}
 */
function createRadioButtonLabel( richTextString, iconNode, labelsAlignGroup ) {
  return new AlignBox( new HBox( {
    spacing: 10,
    children: [
      new RichText( richTextString, {
        font: new PhetFont( 12 ),
        maxWidth: 145 // determined empirically
      } ),
      iconNode
    ]
  } ), {
    group: labelsAlignGroup,
    xAlign: 'left'
  } );
}

acidBaseSolutions.register( 'IntroductionSolutionPanel', IntroductionSolutionPanel );
export default IntroductionSolutionPanel;