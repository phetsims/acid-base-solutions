// Copyright 2022, University of Colorado Boulder

/**
 * WeakStrongSwitch is the toggle switch for switching between 'weak' and 'strong' solution strength.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AlignBox, AlignGroup, Text, TextOptions } from '../../../../scenery/js/imports.js';
import ABSwitch, { ABSwitchOptions } from '../../../../sun/js/ABSwitch.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../../common/ABSConstants.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { WeakStrongType } from './MySolutionPanel.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

export default class WeakStrongSwitch extends ABSwitch<WeakStrongType> {

  public constructor( weakStrongProperty: StringUnionProperty<WeakStrongType>, tandem: Tandem ) {

    const textOptions = {
      font: ABSConstants.CONTROL_FONT,
      maxWidth: 50
    };

    // To give both labels the same effective width, and keep toggle switch centered
    const alignGroup = new AlignGroup();

    // weak
    const weakText = new Text( AcidBaseSolutionsStrings.weakStringProperty,
      combineOptions<TextOptions>( {}, textOptions, {
        tandem: tandem.createTandem( 'weakText' )
      } ) );
    const weakNode = new AlignBox( weakText, {
      group: alignGroup,
      xAlign: 'right'
    } );

    // string
    const strongText = new Text( AcidBaseSolutionsStrings.strongStringProperty,
      combineOptions<TextOptions>( {}, textOptions, {
        tandem: tandem.createTandem( 'strongText' )
      } ) );
    const strongNode = new AlignBox( strongText, {
      group: alignGroup,
      xAlign: 'left'
    } );

    super( weakStrongProperty, 'weak', weakNode, 'strong', strongNode,
      combineOptions<ABSwitchOptions>( {}, ABSConstants.AB_SWITCH_OPTIONS, {
        tandem: tandem
      } ) );
  }
}

acidBaseSolutions.register( 'WeakStrongSwitch', WeakStrongSwitch );