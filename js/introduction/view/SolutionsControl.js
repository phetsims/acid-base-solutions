// Copyright 2014-2020, University of Colorado Boulder

/**
 * Control for selecting between a set of mutually-exclusive solutions.
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
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import acidBaseSolutionsStrings from '../../acid-base-solutions-strings.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import SolutionType from '../../common/enum/SolutionType.js';
import MoleculeFactory from '../../common/view/MoleculeFactory.js';

// strings
const strongAcidString = acidBaseSolutionsStrings.strongAcid;
const strongBaseString = acidBaseSolutionsStrings.strongBase;
const waterString = acidBaseSolutionsStrings.water;
const weakAcidString = acidBaseSolutionsStrings.weakAcid;
const weakBaseString = acidBaseSolutionsStrings.weakBase;

class SolutionsControl extends AquaRadioButtonGroup {

  /**
   * @param {Property.<SolutionType>} solutionTypeProperty
   * @param {Object} [options]
   */
  constructor( solutionTypeProperty, options ) {

    options = merge( {
      spacing: 8,
      align: 'left',
      radioButtonOptions: {
        radius: 7
      }
    }, options );

    // To make all radio button labels have the same width and height
    const alignGroup = new AlignGroup();

    const radioButtonGroupItems = [

      // Water (H20)
      {
        value: SolutionType.WATER,
        node: createRadioButtonLabel( `${waterString} (H<sub>2</sub>O)`, new MoleculeFactory.H2O(), alignGroup )
      },

      // Strong Acid (HA)
      {
        value: SolutionType.STRONG_ACID,
        node: createRadioButtonLabel( `${strongAcidString} (H<i>A</i>)`, new MoleculeFactory.HA(), alignGroup )
      },

      // Weak Acid (HA)
      {
        value: SolutionType.WEAK_ACID,
        node: createRadioButtonLabel( `${weakAcidString} (H<i>A</i>)`, new MoleculeFactory.HA(), alignGroup )
      },

      // Strong Base (M)
      {
        value: SolutionType.STRONG_BASE,
        node: createRadioButtonLabel( `${strongBaseString} (<i>M</i>OH)`, new MoleculeFactory.MOH(), alignGroup )
      },

      // Weak Base (B)
      {
        value: SolutionType.WEAK_BASE,
        node: createRadioButtonLabel( `${weakBaseString} (<i>B</i>)`, new MoleculeFactory.B(), alignGroup )
      }
    ];

    super( solutionTypeProperty, radioButtonGroupItems, options );
  }
}

/**
 * Creates a label for a radio button.
 * @param {string} richTextString
 * @param {Node} iconNode
 * @param {AlignGroup} alignGroup
 * @returns {Node}
 */
function createRadioButtonLabel( richTextString, iconNode, alignGroup ) {
  return new AlignBox( new HBox( {
    spacing: 10,
    children: [
      new RichText( richTextString, { font: new PhetFont( 12 ) } ),
      iconNode
    ]
  } ), {
    group: alignGroup,
    xAlign: 'left'
  } );
}

acidBaseSolutions.register( 'SolutionsControl', SolutionsControl );
export default SolutionsControl;