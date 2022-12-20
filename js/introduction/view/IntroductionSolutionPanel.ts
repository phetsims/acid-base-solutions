// Copyright 2014-2022, University of Colorado Boulder

/**
 * IntroductionSolutionPanel is the panel titled 'Solution' in the 'Introduction' screen.
 * It allows the user to select between a set of mutually-exclusive solutions.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignGroup, HBox, Node, RichText, Text, VBox } from '../../../../scenery/js/imports.js';
import AquaRadioButtonGroup, { AquaRadioButtonGroupItem } from '../../../../sun/js/AquaRadioButtonGroup.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../../common/ABSConstants.js';
import { SolutionType } from '../../common/model/SolutionType.js';
import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import { ParticleKey } from '../../common/model/solutions/Particle.js';
import createParticleNode from '../../common/view/createParticleNode.js';
import AquaRadioButton from '../../../../sun/js/AquaRadioButton.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';

export default class IntroductionSolutionPanel extends Panel {

  public constructor( solutionTypeProperty: Property<SolutionType>,
                      contentAlignGroup: AlignGroup, // so that both control panels have the same width
                      tandem: Tandem ) {

    const options = combineOptions<PanelOptions>( {}, ABSConstants.PANEL_OPTIONS, {
      tandem: tandem
    } );

    // title
    const titleText = new Text( AcidBaseSolutionsStrings.solutionStringProperty, {
      font: ABSConstants.TITLE_FONT,
      maxWidth: 180, // determined empirically
      tandem: tandem.createTandem( 'titleText' )
    } );

    // To make all radio button labels have the same width and height
    const labelsAlignGroup = new AlignGroup();

    const radioButtonGroupItems: AquaRadioButtonGroupItem<SolutionType>[] = [

      // Water (H20)
      {
        value: 'water',
        createNode: ( tandem: Tandem ) => createRadioButtonLabel( AcidBaseSolutionsStrings.waterStringProperty,
          'H<sub>2</sub>O', 'H2O', labelsAlignGroup, tandem ),
        tandemName: `water${AquaRadioButton.TANDEM_NAME_SUFFIX}`
      },

      // Strong Acid (HA)
      {
        value: 'strongAcid',
        createNode: ( tandem: Tandem ) => createRadioButtonLabel( AcidBaseSolutionsStrings.strongAcidStringProperty,
          'H<i>A</i>', 'HA', labelsAlignGroup, tandem ),
        tandemName: `strongAcid${AquaRadioButton.TANDEM_NAME_SUFFIX}`
      },

      // Weak Acid (HA)
      {
        value: 'weakAcid',
        createNode: ( tandem: Tandem ) => createRadioButtonLabel( AcidBaseSolutionsStrings.weakAcidStringProperty,
          'H<i>A</i>', 'HA', labelsAlignGroup, tandem ),
        tandemName: `weakAcid${AquaRadioButton.TANDEM_NAME_SUFFIX}`
      },

      // Strong Base (M)
      {
        value: 'strongBase',
        createNode: ( tandem: Tandem ) => createRadioButtonLabel( AcidBaseSolutionsStrings.strongBaseStringProperty,
          '<i>M</i>OH', 'MOH', labelsAlignGroup, tandem ),
        tandemName: `strongBase${AquaRadioButton.TANDEM_NAME_SUFFIX}`
      },

      // Weak Base (B)
      {
        value: 'weakBase',
        createNode: ( tandem: Tandem ) => createRadioButtonLabel( AcidBaseSolutionsStrings.weakBaseStringProperty,
          '<i>B</i>', 'B', labelsAlignGroup, tandem ),
        tandemName: `weakBase${AquaRadioButton.TANDEM_NAME_SUFFIX}`
      }
    ];

    const radioButtonGroup = new AquaRadioButtonGroup<SolutionType>( solutionTypeProperty, radioButtonGroupItems, {
      spacing: 8,
      align: 'left',
      radioButtonOptions: {
        radius: 7
      },
      touchAreaXDilation: 10,
      mouseAreaXDilation: 10,
      tandem: tandem.createTandem( 'radioButtonGroup' ),
      phetioVisiblePropertyInstrumented: false // hide the entire panel if you don't want radio buttons
    } );

    const content = new AlignBox( new VBox( {
      spacing: 8,
      align: 'left',
      children: [ titleText, radioButtonGroup ]
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
                                 key: ParticleKey, labelsAlignGroup: AlignGroup, tandem: Tandem ): Node {

  const textTandem = tandem.createTandem( 'text' );

  // Combine the solution's name and formula
  const stringProperty = new PatternStringProperty( AcidBaseSolutionsStrings.patternSolutionNameFormulaStringProperty, {
    solutionName: solutionNameProperty,
    formula: formula
  }, {
    tandem: textTandem.createTandem( RichText.STRING_PROPERTY_TANDEM_NAME )
  } );

  const text = new RichText( stringProperty, {
    font: new PhetFont( 12 ),
    maxWidth: 145, // determined empirically
    tandem: textTandem
  } );

  // Create the particles's icon
  const particleNode = createParticleNode( key );

  const hBox = new HBox( {
    spacing: 10,
    children: [ text, particleNode ]
  } );

  return new AlignBox( hBox, {
    group: labelsAlignGroup,
    xAlign: 'left'
  } );
}

acidBaseSolutions.register( 'IntroductionSolutionPanel', IntroductionSolutionPanel );