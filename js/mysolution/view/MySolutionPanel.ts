// Copyright 2014-2022, University of Colorado Boulder

/**
 * Control for modifying a custom solutions.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AlignBox, AlignGroup, HSeparator, Text, VBox } from '../../../../scenery/js/imports.js';
import ABSwitch, { ABSwitchOptions } from '../../../../sun/js/ABSwitch.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../../common/ABSConstants.js';
import { SolutionType } from '../../common/model/SolutionType.js';
import Property from '../../../../axon/js/Property.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import InitialConcentrationControl from './InitialConcentrationControl.js';
import StrengthControl from './StrengthControl.js';

const AcidBaseTypeValues = [ 'acid', 'base' ] as const;
export type AcidBaseType = ( typeof AcidBaseTypeValues )[number];

const WeakStrongTypeValues = [ 'weak', 'strong' ] as const;
export type WeakStrongType = ( typeof WeakStrongTypeValues )[number];

export default class MySolutionPanel extends Panel {

  public constructor( solutionTypeProperty: Property<SolutionType>, concentrationProperty: Property<number>,
                      strengthProperty: Property<number>, contentAlignGroup: AlignGroup, tandem: Tandem ) {

    const options = combineOptions<PanelOptions>( {}, ABSConstants.PANEL_OPTIONS, {
      tandem: tandem
    } );

    //TODO https://github.com/phetsims/acid-base-solutions/issues/178 move to model
    const acidBaseProperty = new StringUnionProperty( solutionTypeToAcidBase( solutionTypeProperty.value ), {
      validValues: AcidBaseTypeValues,
      tandem: tandem.createTandem( 'acidBaseProperty' )
    } );

    //TODO https://github.com/phetsims/acid-base-solutions/issues/178 move to model
    const weakStrongProperty = new StringUnionProperty( solutionTypeToWeakStrong( solutionTypeProperty.value ), {
      validValues: WeakStrongTypeValues,
      tandem: tandem.createTandem( 'weakStrongProperty' )
    } );

    // title
    const titleText = new Text( AcidBaseSolutionsStrings.solutionStringProperty, {
      font: ABSConstants.TITLE_FONT,
      maxWidth: 180, // determined empirically
      tandem: tandem.createTandem( 'titleText' )
    } );

    // Acid/Base switch
    const acidBaseSwitchTandem = tandem.createTandem( 'acidBaseSwitch' );
    const acidBaseSwitch = new ABSwitch( acidBaseProperty,
      'acid', new Text( AcidBaseSolutionsStrings.acidStringProperty, ABSConstants.AB_SWITCH_TEXT_OPTIONS ),
      'base', new Text( AcidBaseSolutionsStrings.baseStringProperty, ABSConstants.AB_SWITCH_TEXT_OPTIONS ),
      combineOptions<ABSwitchOptions>( {}, ABSConstants.AB_SWITCH_OPTIONS, {
        tandem: acidBaseSwitchTandem
      } ) );

    // Initial Concentration control
    const initialConcentrationControl = new InitialConcentrationControl( concentrationProperty,
      tandem.createTandem( 'initialConcentrationControl' ) );

    // Strength control
    const strengthControl = new StrengthControl( strengthProperty, weakStrongProperty,
      tandem.createTandem( 'strengthControl' ) );

    const controls = new VBox( {
      excludeInvisibleChildrenFromBounds: false,
      spacing: 6,
      children: [
        acidBaseSwitch,
        new HSeparator(),
        initialConcentrationControl,
        new HSeparator(),
        strengthControl
      ]
    } );

    const content = new AlignBox( new VBox( {
      spacing: 8,
      align: 'left',
      children: [ titleText, controls ]
    } ), {
      group: contentAlignGroup,
      xAlign: 'left'
    } );

    super( content, options );

    // flag to prevent circular update of related Properties, see #152
    let updateSolutionTypeEnabled = true;

    // update solution type
    const updateSolutionType = () => {

      if ( updateSolutionTypeEnabled ) {

        const isAcid = ( acidBaseProperty.value === 'acid' );
        const isWeak = ( weakStrongProperty.value === 'weak' );

        if ( isWeak && isAcid ) {
          solutionTypeProperty.value = 'weakAcid';
        }
        else if ( isWeak && !isAcid ) {
          solutionTypeProperty.value = 'weakBase';
        }
        else if ( !isWeak && isAcid ) {
          solutionTypeProperty.value = 'strongAcid';
        }
        else if ( !isWeak && !isAcid ) {
          solutionTypeProperty.value = 'strongBase';
        }
      }
    };
    acidBaseProperty.link( updateSolutionType.bind( this ) );
    weakStrongProperty.link( updateSolutionType.bind( this ) );

    solutionTypeProperty.link( solutionType => {
      updateSolutionTypeEnabled = false;
      acidBaseProperty.value = solutionTypeToAcidBase( solutionType );
      weakStrongProperty.value = solutionTypeToWeakStrong( solutionType );
      updateSolutionTypeEnabled = true;
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

function solutionTypeToAcidBase( solutionType: SolutionType ): AcidBaseType {
  return ( solutionType === 'weakAcid' || solutionType === 'strongAcid' ) ? 'acid' : 'base';
}

function solutionTypeToWeakStrong( solutionType: SolutionType ): WeakStrongType {
  return ( solutionType === 'weakAcid' || solutionType === 'weakBase' ) ? 'weak' : 'strong';
}

acidBaseSolutions.register( 'MySolutionPanel', MySolutionPanel );