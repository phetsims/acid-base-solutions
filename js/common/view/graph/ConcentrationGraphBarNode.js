// Copyright 2014-2021, University of Colorado Boulder

/**
 * A bar in the concentration graph.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import Utils from '../../../../../dot/js/Utils.js';
import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import RichText from '../../../../../scenery/js/nodes/RichText.js';
import acidBaseSolutions from '../../../acidBaseSolutions.js';
import acidBaseSolutionsStrings from '../../../acidBaseSolutionsStrings.js';

// constants
const FONT = new PhetFont( 12 );

class ConcentrationGraphBarNode extends Node {

  /**
   * @param {number} maxBarHeight
   */
  constructor( maxBarHeight ) {

    // add rectangle to represent concentration
    const bar = new Rectangle( 0, 0, 25, 0, { fill: 'white' } );
    bar.rotate( Math.PI ); // so that bar grows upward

    // add vertical text for concentration (normal text + exponent text)
    const text = new RichText( '123', { font: FONT, centerX: 2, centerY: -10, maxWidth: 0.85 * maxBarHeight } );
    text.rotate( -Math.PI / 2 );

    super( { children: [ bar, text ] } );

    // @private
    this.maxBarHeight = maxBarHeight;
    this.bar = bar;
    this.text = text;
  }

  // @public set height and text value of bar
  setValue( value ) {
    const barHeight = Math.abs( Utils.log10( value ) + 8 ) * this.maxBarHeight / 10;
    let pow;

    // set bar height
    if ( isFinite( barHeight ) ) {
      this.bar.setRectHeight( barHeight );
    }
    else {
      this.bar.setRectHeight( 0 );
    }

    // set concentration text
    if ( value < 1e-13 ) {
      this.text.setText( acidBaseSolutionsStrings.negligible );
    }
    else if ( value <= 1 ) {
      // find pow
      pow = Math.floor( Utils.log10( value ) );

      // find value
      value = ( value * Math.pow( 10, -pow ) );

      // replace 10.00 to 1.00 x 10
      if ( Math.abs( value - 10 ) < 1e-2 ) {
        pow++;
        value = 1;
      }

      // set text
      if ( pow === 0 ) {
        // issue #109, show 'N.NN x 10^0' as 'N.NN'
        this.text.setText( Utils.toFixed( value, 2 ) );
      }
      else {
        this.text.setText( StringUtils.format( acidBaseSolutionsStrings.pattern[ '0value' ][ '1power' ],
          Utils.toFixed( value, 2 ), pow ) );
      }
    }
    else {
      this.text.setText( Utils.toFixed( value, 1 ) );
    }
  }

  // @public set color of bar
  setBarFill( color ) {
    this.bar.setFill( color );
  }
}

acidBaseSolutions.register( 'ConcentrationGraphBarNode', ConcentrationGraphBarNode );
export default ConcentrationGraphBarNode;