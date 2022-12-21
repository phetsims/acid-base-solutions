// Copyright 2014-2022, University of Colorado Boulder

/**
 * A bar in the concentration graph.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import Multilink from '../../../../../axon/js/Multilink.js';
import Utils from '../../../../../dot/js/Utils.js';
import PhetFont from '../../../../../scenery-phet/js/PhetFont.js';
import { Node, Rectangle, RichText, TColor } from '../../../../../scenery/js/imports.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../../AcidBaseSolutionsStrings.js';

// constants
const FONT = new PhetFont( 12 );

export default class ConcentrationGraphBarNode extends Node {

  private readonly maxBarHeight: number;
  private readonly bar: Rectangle;
  private readonly text: RichText;

  public constructor( maxBarHeight: number, tandem: Tandem ) {

    // add rectangle to represent concentration
    const bar = new Rectangle( 0, 0, 25, 0, { fill: 'white' } );
    bar.rotate( Math.PI ); // so that bar grows upward

    // add vertical text for concentration (normal text + exponent text)
    // This is a numeric value (typically in scientific notation) so does not require a StringProperty.
    const text = new RichText( '', {
      font: FONT,
      maxWidth: 0.85 * maxBarHeight,
      tandem: tandem.createTandem( 'text' )
    } );
    text.rotate( -Math.PI / 2 );

    Multilink.multilink( [ bar.boundsProperty, text.boundsProperty ], () => {
      text.centerX = bar.centerX;
      text.bottom = bar.bottom - 6;
    } );

    super( {
      children: [ bar, text ],
      tandem: tandem,
      visiblePropertyOptions: { phetioReadOnly: true }
    } );

    this.maxBarHeight = maxBarHeight;
    this.bar = bar;
    this.text = text;
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  /**
   * Sets height and text value of bar.
   */
  public setValue( value: number ): void {

    const barHeight = Math.abs( Utils.log10( value ) + 8 ) * this.maxBarHeight / 10;

    // set bar height
    if ( isFinite( barHeight ) ) {
      this.bar.setRectHeight( barHeight );
    }
    else {
      this.bar.setRectHeight( 0 );
    }

    // set concentration text
    if ( value < 1e-13 ) {
      this.text.setString( AcidBaseSolutionsStrings.negligibleStringProperty.value );
    }
    else if ( value <= 1 ) {

      // find power of 10
      let pow = Math.floor( Utils.log10( value ) );

      // find value
      value = ( value * Math.pow( 10, -pow ) );

      // show 10.00 as 1.00 x 10
      if ( Math.abs( value - 10 ) < 1e-2 ) {
        pow++;
        value = 1;
      }

      // set text
      if ( pow === 0 ) {
        // issue #109, show 'N.NN x 10^0' as 'N.NN'
        this.text.setString( Utils.toFixed( value, 2 ) );
      }
      else {
        const mantissaString = Utils.toFixed( value, 2 );
        this.text.setString( `${mantissaString} x 10<sup>${pow}</sup>` );
      }
    }
    else {
      this.text.setString( Utils.toFixed( value, 1 ) );
    }
  }

  /**
   * Sets the fill color of the bar.
   */
  public setBarFill( color: TColor ): void {
    this.bar.setFill( color );
  }
}

acidBaseSolutions.register( 'ConcentrationGraphBarNode', ConcentrationGraphBarNode );