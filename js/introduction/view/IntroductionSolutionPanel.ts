// Copyright 2014-2022, University of Colorado Boulder

/**
 * IntroductionSolutionPanel is a panel for selecting between a set of mutually-exclusive solutions in the
 * Introduction screen.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignGroup, HBox, Node, RichText, Text, VBox } from '../../../../scenery/js/imports.js';
import AquaRadioButtonGroup, { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../../common/ABSConstants.js';
import MoleculeFactory from '../../common/view/MoleculeFactory.js';
import { SolutionType } from '../../common/enum/SolutionType.js';
import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { EmptySelfOptions, optionize3 } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

type IntroductionSolutionPanelOptions = SelfOptions & PanelOptions;

export default class IntroductionSolutionPanel extends Panel {

  public constructor( solutionTypeProperty: Property<SolutionType>, contentAlignGroup: AlignGroup,
                      providedOptions?: IntroductionSolutionPanelOptions ) {

    const options = optionize3<IntroductionSolutionPanelOptions, SelfOptions, PanelOptions>()(
      {}, ABSConstants.PANEL_OPTIONS, providedOptions );

    // title
    const titleNode = new Text( AcidBaseSolutionsStrings.solutionStringProperty, {
      font: ABSConstants.TITLE_FONT,
      maxWidth: 180 // determined empirically
    } );

    // To make all radio button labels have the same width and height
    const labelsAlignGroup = new AlignGroup();

    const radioButtonGroupItems: AquaRadioButtonGroupItem<SolutionType>[] = [

      // Water (H20)
      {
        value: 'water',
        createNode: ( tandem: Tandem ) =>
          createRadioButtonLabel( AcidBaseSolutionsStrings.waterStringProperty, 'H<sub>2</sub>O',
            MoleculeFactory.H2O(), labelsAlignGroup )
      },

      // Strong Acid (HA)
      {
        value: 'strongAcid',
        createNode: ( tandem: Tandem ) => createRadioButtonLabel( AcidBaseSolutionsStrings.strongAcidStringProperty, 'H<i>A</i>',
          MoleculeFactory.HA(), labelsAlignGroup )
      },

      // Weak Acid (HA)
      {
        value: 'weakAcid',
        createNode: ( tandem: Tandem ) => createRadioButtonLabel( AcidBaseSolutionsStrings.weakAcidStringProperty, 'H<i>A</i>',
          MoleculeFactory.HA(), labelsAlignGroup )
      },

      // Strong Base (M)
      {
        value: 'strongBase',
        createNode: ( tandem: Tandem ) => createRadioButtonLabel( AcidBaseSolutionsStrings.strongBaseStringProperty, '<i>M</i>OH',
          MoleculeFactory.MOH(), labelsAlignGroup )
      },

      // Weak Base (B)
      {
        value: 'weakBase',
        createNode: ( tandem: Tandem ) => createRadioButtonLabel( AcidBaseSolutionsStrings.weakBaseStringProperty, '<i>B</i>',
          MoleculeFactory.B(), labelsAlignGroup )
      }
    ];

    const radioButtonGroup = new AquaRadioButtonGroup<SolutionType>( solutionTypeProperty, radioButtonGroupItems, {
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
 */
function createRadioButtonLabel( solutionNameProperty: TReadOnlyProperty<string>, formula: string,
                                 iconNode: Node, labelsAlignGroup: AlignGroup ): Node {

  // Combine the solution's name and formula
  const stringProperty = new DerivedProperty( [ solutionNameProperty ], solutionName => `${solutionName} (${formula})` );

  const text = new RichText( stringProperty, {
    font: new PhetFont( 12 ),
    maxWidth: 145 // determined empirically
  } );

  const hBox = new HBox( {
    spacing: 10,
    children: [ text, iconNode ]
  } );

  return new AlignBox( hBox, {
    group: labelsAlignGroup,
    xAlign: 'left'
  } );
}

acidBaseSolutions.register( 'IntroductionSolutionPanel', IntroductionSolutionPanel );