// Copyright 2014-2022, University of Colorado Boulder

/**
 * ConcentrationBarNode is a bar in the 'Equilibrium Concentration' graph.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Rectangle, RichText, TColor } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';

// constants
const FONT = new PhetFont( 12 );

export default class ConcentrationBarNode extends Node {

  // Concentration value associated with this bar. This is a Property for PhET-iO.
  public readonly concentrationProperty: Property<number | null>;

  private readonly bar: Rectangle;

  public constructor( maxBarHeight: number, tandem: Tandem ) {

    const concentrationProperty = new Property<number | null>( 0, {
      units: 'mol/L',
      tandem: tandem.createTandem( 'concentrationProperty' ),
      phetioValueType: NullableIO( NumberIO ),
      phetioReadOnly: true,
      phetioDocumentation: 'Concentration associated with this bar. null if the bar is not relevant for the selected solution.'
    } );

    // add rectangle to represent concentration
    const bar = new Rectangle( 0, 0, 25, 0, { fill: 'white' } );
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
    const textTandem = tandem.createTandem( 'text' );
    const stringProperty = new DerivedProperty( [ concentrationProperty ],
      concentration => concentrationToString( concentration ), {
        tandem: textTandem.createTandem( RichText.STRING_PROPERTY_TANDEM_NAME ),
        phetioValueType: StringIO
      } );
    const text = new RichText( stringProperty, {
      font: FONT,
      maxWidth: 0.85 * maxBarHeight,
      rotation: -Math.PI / 2, // vertical
      tandem: textTandem
    } );

    Multilink.multilink( [ bar.boundsProperty, text.boundsProperty ], () => {
      text.centerX = bar.centerX;
      text.bottom = bar.bottom - 6;
    } );

    super( {
      children: [ bar, text ],
      tandem: tandem,
      visiblePropertyOptions: { phetioReadOnly: true }
    } );

    this.concentrationProperty = concentrationProperty;
    this.bar = bar;
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  /**
   * Sets the fill color of the bar.
   */
  public setBarFill( color: TColor ): void {
    this.bar.setFill( color );
  }
}

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

    // show 10.00 as 1.00 x 10
    if ( Math.abs( concentration - 10 ) < 1e-2 ) {
      pow++;
      concentration = 1;
    }

    if ( pow === 0 ) {
      // issue #109, show 'N.NN x 10^0' as 'N.NN'
      string = Utils.toFixed( concentration, 2 );
    }
    else {
      const mantissaString = Utils.toFixed( concentration, 2 );
      string = `${mantissaString} x 10<sup>${pow}</sup>`;
    }
  }
  else {
    string = Utils.toFixed( concentration, 1 );
  }
  return string;
}

acidBaseSolutions.register( 'ConcentrationBarNode', ConcentrationBarNode );