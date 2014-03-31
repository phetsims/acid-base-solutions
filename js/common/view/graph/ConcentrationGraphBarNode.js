// Copyright 2002-2014, University of Colorado Boulder

/**
 * A bar in the concentration graph.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var Util = require( 'DOT/Util' );

  // strings
  var pattern_0value_1power = require( 'string!ACID_BASE_SOLUTIONS/pattern.0value.1power' );
  var negligibleString = require( 'string!ACID_BASE_SOLUTIONS/negligible' );

  // constants
  var FONT = new PhetFont( 12 );

  function ConcentrationGraphBarNode( maxHeight ) {

    this.maxHeight = maxHeight; //@private

    // add rectangle to represent concentration
    this.bar = new Rectangle( 0, 0, 25, 0, { fill: 'white' } ); //@private
    this.bar.rotate( Math.PI ); // so that bar grows upward

    // add vertical text for concentration (normal text + exponent text)
    this.text = new SubSupText( '123', { font: FONT, centerX: 2, centerY: -10 } ); //@private
    this.text.rotate( -Math.PI / 2 );

    Node.call( this, { children: [ this.bar, this.text ] } );
  }


  return inherit( Node, ConcentrationGraphBarNode, {

    // set height and text value of bar
    setValue: function( value ) {
      var barHeight = Math.abs( Util.log10( value ) + 8 ) * this.maxHeight / 10,
        pow;

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
        this.text.setText( StringUtils.format( pattern_0value_1power, Util.toFixed( value, 2 ), pow ) );
      }
      else {
        this.text.setText( Util.toFixed( value, 1 ) );
      }
    },

    // set color of bar
    setBarFill: function( color ) {
      this.bar.setFill( color );
    }
  } );
} );
