// Copyright 2022, University of Colorado Boulder

/**
 * StringSwitch is an ABSwitch that switches between string values, and is labeled with strings.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AlignBox, AlignGroup, Text, TextOptions } from '../../../../scenery/js/imports.js';
import ABSwitch, { ABSwitchOptions } from '../../../../sun/js/ABSwitch.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import Property from '../../../../axon/js/Property.js';

type SelfOptions = {
  textOptions?: StrictOmit<TextOptions, 'tandem'>;
};

export type StringSwitchOptions = SelfOptions & ABSwitchOptions & PickRequired<ABSwitchOptions, 'tandem'>;

export default class StringSwitch<T extends string> extends ABSwitch<T> {

  private readonly disposeStringSwitch: () => void;

  public constructor( property: Property<T>,
                      valueA: T, stringAProperty: TReadOnlyProperty<string>,
                      valueB: T, stringBProperty: TReadOnlyProperty<string>,
                      providedOptions: StringSwitchOptions ) {

    const options = providedOptions;

    // To give both labels the same effective width, and keep the toggle switch centered
    const alignGroup = new AlignGroup();

    // A
    const textA = new Text( stringAProperty, combineOptions<TextOptions>( {}, options.textOptions, {
      tandem: options.tandem.createTandem( `${valueA}Text` )
    } ) );
    const nodeA = new AlignBox( textA, {
      group: alignGroup,
      xAlign: 'right'
    } );

    // B
    const textB = new Text( stringBProperty, combineOptions<TextOptions>( {}, options.textOptions, {
      tandem: options.tandem.createTandem( `${valueB}Text` )
    } ) );
    const nodeB = new AlignBox( textB, {
      group: alignGroup,
      xAlign: 'left'
    } );

    super( property, valueA, nodeA, valueB, nodeB, options );

    this.disposeStringSwitch = () => {
      textA.dispose();
      textB.dispose();
    };
  }

  public override dispose(): void {
    this.disposeStringSwitch();
    super.dispose();
  }
}

acidBaseSolutions.register( 'StringSwitch', StringSwitch );