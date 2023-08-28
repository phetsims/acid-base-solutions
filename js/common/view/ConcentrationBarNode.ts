// Copyright 2014-2023, University of Colorado Boulder

/**
 * ConcentrationBarNode is a bar in the 'Equilibrium Concentration' graph.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Rectangle, RichText, TColor } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

const FONT = new PhetFont( 12 );

// See https://github.com/phetsims/acid-base-solutions/issues/222
const CONCENTRATION_DECIMAL_PLACES = 1;

export default class ConcentrationBarNode extends Node {

  // Concentration value associated with this bar. This is a Property for PhET-iO.
  public readonly concentrationProperty: Property<number | null>;

  private readonly bar: Rectangle;

  public constructor( maxBarHeight: number, valuesVisibleProperty: TReadOnlyProperty<boolean>, tandem: Tandem, concentrationPropertyFeatured: boolean ) {

    const concentrationProperty = new Property<number | null>( 0, {
      units: 'mol/L',
      tandem: tandem.createTandem( 'concentrationProperty' ),
      phetioValueType: NullableIO( NumberIO ),
      phetioReadOnly: true,
      phetioDocumentation: 'Concentration associated with this bar. null if the bar is not relevant for the selected solution.',
      phetioFeatured: concentrationPropertyFeatured
    } );

    // add rectangle to represent concentration
    const bar = new Rectangle( 0, 0, 25, 0, {
      fill: 'white' // default, correct color set via setBarFill
    } );
    bar.rotate( Math.PI ); // so that bar grows upward

    // Set the bar height
    concentrationProperty.link( concentration => {
      if ( concentration === null ) {
        bar.setRectHeight( 0 );
      }
      else {
        const barHeight = Math.abs( Utils.log10( concentration ) + 8 ) * maxBarHeight / 10;
        if ( isFinite( barHeight ) ) {
          bar.setRectHeight( barHeight );
        }
        else {
          bar.setRectHeight( 0 );
        }
      }
    } );

    // Text for concentration value, typically in scientific notation.
    // Do not instrument, see https://github.com/phetsims/acid-base-solutions/issues/202#issuecomment-1675475175
    const valueStringProperty = new DerivedStringProperty(
      [ concentrationProperty, AcidBaseSolutionsStrings.negligibleStringProperty ],
      concentration => concentrationToString( concentration ) );
    const valueText = new RichText( valueStringProperty, {
      visibleProperty: valuesVisibleProperty,
      font: FONT,
      maxWidth: 0.85 * maxBarHeight,
      rotation: -Math.PI / 2 // vertical
    } );

    Multilink.multilink( [ bar.boundsProperty, valueText.boundsProperty ], () => {
      valueText.centerX = bar.centerX;
      valueText.bottom = bar.bottom - 6;
    } );

    super( {
      children: [ bar, valueText ],
      isDisposable: false,
      tandem: tandem,
      visiblePropertyOptions: { phetioReadOnly: true }
    } );

    this.concentrationProperty = concentrationProperty;
    this.bar = bar;
  }

  /**
   * Sets the fill color of the bar.
   */
  public setBarFill( color: TColor ): void {
    this.bar.fill = color;
  }
}

/**
 * Converts a concentration value to a string that will be displayed on the bar.
 */
function concentrationToString( concentration: number | null ): string {
  let string;
  if ( concentration === null ) {
    string = 'null';
  }
  else if ( concentration < 1e-13 ) {
    string = AcidBaseSolutionsStrings.negligibleStringProperty.value;
  }
  else if ( concentration <= 1 ) {

    // find power of 10
    let pow = Math.floor( Utils.log10( concentration ) );

    // find value
    concentration = ( concentration * Math.pow( 10, -pow ) );

    // If mantissa rounds to 10, increase the power and use 1 for the mantissa.
    if ( Math.abs( concentration - 10 ) < Math.pow( 10, -CONCENTRATION_DECIMAL_PLACES ) ) {
      pow++;
      concentration = 1;
    }

    if ( pow === 0 ) {
      // Show 'N.N x 10^0' as 'N.N', see https://github.com/phetsims/acid-base-solutions/issues/109
      string = Utils.toFixed( concentration, CONCENTRATION_DECIMAL_PLACES );
    }
    else {
      // Show 'N.N x 10^M' for M !== 0
      const mantissaString = Utils.toFixed( concentration, CONCENTRATION_DECIMAL_PLACES );
      string = `${mantissaString} x 10<sup>${pow}</sup>`;
    }
  }
  else {
    string = Utils.toFixed( concentration, 1 ); // see https://github.com/phetsims/acid-base-solutions/issues/222
  }
  return string;
}

acidBaseSolutions.register( 'ConcentrationBarNode', ConcentrationBarNode );