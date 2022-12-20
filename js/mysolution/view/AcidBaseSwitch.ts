// Copyright 2022, University of Colorado Boulder

/**
 * AcidBaseSwitch is the toggle switch for switching between 'Acid' and 'Base'.
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
import { AcidBaseType } from './MySolutionPanel.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

export default class AcidBaseSwitch extends ABSwitch<AcidBaseType> {

  public constructor( acidBaseProperty: StringUnionProperty<AcidBaseType>, tandem: Tandem ) {

    const textOptions = {
      font: ABSConstants.CONTROL_FONT,
      maxWidth: 50
    };

    // To give both labels the same effective width, and keep toggle switch centered
    const acidBaseAlignGroup = new AlignGroup();

    const acidText = new Text( AcidBaseSolutionsStrings.acidStringProperty, combineOptions<TextOptions>( {}, textOptions, {
      tandem: tandem.createTandem( 'acidText' )
    } ) );
    const acidNode = new AlignBox( acidText, {
      group: acidBaseAlignGroup,
      xAlign: 'right'
    } );

    const baseText = new Text( AcidBaseSolutionsStrings.baseStringProperty, combineOptions<TextOptions>( {}, textOptions, {
      tandem: tandem.createTandem( 'baseText' )
    } ) );
    const baseNode = new AlignBox( baseText, {
      group: acidBaseAlignGroup,
      xAlign: 'left'
    } );

    super( acidBaseProperty, 'acid', acidNode, 'base', baseNode,
      combineOptions<ABSwitchOptions>( {}, ABSConstants.AB_SWITCH_OPTIONS, {
        tandem: tandem
      } ) );
  }
}

acidBaseSolutions.register( 'AcidBaseSwitch', AcidBaseSwitch );