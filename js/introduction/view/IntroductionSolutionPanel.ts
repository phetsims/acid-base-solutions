// Copyright 2014-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * IntroductionSolutionPanel is a panel for selecting between a set of mutually-exclusive solutions in the
 * Introduction screen.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignGroup, HBox, RichText, Text, VBox } from '../../../../scenery/js/imports.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import Panel from '../../../../sun/js/Panel.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../../common/ABSConstants.js';
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
    const titleNode = new Text( AcidBaseSolutionsStrings.solutionStringProperty, {
      font: ABSConstants.TITLE_FONT,
      maxWidth: 180 // determined empirically
    } );

    // To make all radio button labels have the same width and height
    const labelsAlignGroup = new AlignGroup();

    const radioButtonGroupItems = [

      // Water (H20)
      {
        value: 'water',
        createNode: tandem => createRadioButtonLabel( AcidBaseSolutionsStrings.waterStringProperty, 'H<sub>2</sub>O',
          new MoleculeFactory.H2O(), labelsAlignGroup )
      },

      // Strong Acid (HA)
      {
        value: 'strongAcid',
        createNode: tandem => createRadioButtonLabel( AcidBaseSolutionsStrings.strongAcidStringProperty, 'H<i>A</i>',
          new MoleculeFactory.HA(), labelsAlignGroup )
      },

      // Weak Acid (HA)
      {
        value: 'weakAcid',
        createNode: tandem => createRadioButtonLabel( AcidBaseSolutionsStrings.weakAcidStringProperty, 'H<i>A</i>',
          new MoleculeFactory.HA(), labelsAlignGroup )
      },

      // Strong Base (M)
      {
        value: 'strongBase',
        createNode: tandem => createRadioButtonLabel( AcidBaseSolutionsStrings.strongBaseStringProperty, '<i>M</i>OH',
          new MoleculeFactory.MOH(), labelsAlignGroup )
      },

      // Weak Base (B)
      {
        value: 'weakBase',
        createNode: tandem => createRadioButtonLabel( AcidBaseSolutionsStrings.weakBaseStringProperty, '<i>B</i>',
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
 * @param {TReadOnlyProperty.<string>} solutionNameProperty
 * @param {string} formula
 * @param {Node} iconNode
 * @param {AlignGroup} labelsAlignGroup
 * @returns {Node}
 */
function createRadioButtonLabel( solutionNameProperty, formula, iconNode, labelsAlignGroup ) {

  // Combine the solution's name and formula
  const stringProperty = new DerivedProperty( [ solutionNameProperty ], solutionName => `${solutionName} (${formula})` );

  return new AlignBox( new HBox( {
    spacing: 10,
    children: [
      new RichText( stringProperty, {
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