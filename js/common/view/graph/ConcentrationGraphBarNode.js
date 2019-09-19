// Copyright 2014-2017, University of Colorado Boulder

/**
 * A bar in the concentration graph.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  // strings
  const negligibleString = require( 'string!ACID_BASE_SOLUTIONS/negligible' );
  const pattern0Value1PowerString = require( 'string!ACID_BASE_SOLUTIONS/pattern.0value.1power' );

  // constants
  const FONT = new PhetFont( 12 );

  /**
   * @param {number} maxHeight
   * @constructor
   */
  function ConcentrationGraphBarNode( maxHeight ) {

    this.maxBarHeight = maxHeight; // @private

    // @private add rectangle to represent concentration
    this.bar = new Rectangle( 0, 0, 25, 0, { fill: 'white' } );
    this.bar.rotate( Math.PI ); // so that bar grows upward

    // @private add vertical text for concentration (normal text + exponent text)
    this.text = new RichText( '123', { font: FONT, centerX: 2, centerY: -10, maxWidth: 0.85 * maxHeight } );
    this.text.rotate( -Math.PI / 2 );

    Node.call( this, { children: [ this.bar, this.text ] } );
  }

  acidBaseSolutions.register( 'ConcentrationGraphBarNode', ConcentrationGraphBarNode );

  return inherit( Node, ConcentrationGraphBarNode, {

    // @public set height and text value of bar
    setValue: function( value ) {
      const barHeight = Math.abs( Util.log10( value ) + 8 ) * this.maxBarHeight / 10;
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
        this.text.setText( negligibleString );
      }
      else if ( value <= 1 ) {
        // find pow
        pow = Math.floor( Util.log10( value ) );

        // find value
        value = (value * Math.pow( 10, -pow ));

        // replace 10.00 to 1.00 x 10
        if ( Math.abs( value - 10 ) < 1e-2 ) {
          pow++;
          value = 1;
        }

        // set text
        if ( pow === 0 ) {
          // issue #109, show 'N.NN x 10^0' as 'N.NN'
          this.text.setText( Util.toFixed( value, 2 ) );
        }
        else {
          this.text.setText( StringUtils.format( pattern0Value1PowerString, Util.toFixed( value, 2 ), pow ) );
        }
      }
      else {
        this.text.setText( Util.toFixed( value, 1 ) );
      }
    },

    // @public set color of bar
    setBarFill: function( color ) {
      this.bar.setFill( color );
    }
  } );
} );
