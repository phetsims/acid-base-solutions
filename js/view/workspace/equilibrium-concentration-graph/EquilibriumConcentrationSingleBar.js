// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation for single bar
 * in concentration chart in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    SubSupText = require( 'SCENERY_PHET/SubSupText' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    StringUtils = require( 'PHETCOMMON/util/StringUtils' ),
    Util = require( 'DOT/Util' );

  // strings
  var pattern_0value_1power = require( 'string!ACID_BASE_SOLUTIONS/pattern.0value.1power' ),
    negligibleString = require( 'string!ACID_BASE_SOLUTIONS/negligible' );

  // constants
  var FONT = new PhetFont( 12 );

  function EquilibriumConcentrationSingleBar( maxHeight ) {
    Node.call( this );
    this._maxHeight = maxHeight;

    // add rectangle to represent concentration
    this.addChild( this._rectangle = new Rectangle( 0, 0, 25, 0, {fill: 'white'} ) );
    this._rectangle.rotate( Math.PI );

    // add vertical text for concentration (normal text + exponent text)
    this.addChild( this._text = new SubSupText( '123', {font: FONT, centerX: 2, centerY: -10} ) );
    this._text.rotate( -Math.PI / 2 );
  }


  return inherit( Node, EquilibriumConcentrationSingleBar, {

    // set height and text value of bar
    setValue: function( value ) {
      var barHeight = Math.abs( Util.log10( value ) + 8 ) * this._maxHeight / 10,
        pow;

      // set bar height
      if ( isFinite( barHeight ) ) {
        this._rectangle.setRectHeight( barHeight );
      }
      else {
        this._rectangle.setRectHeight( 0 );
      }

      // set concentration text
      if ( value < 1e-13 ) {
        this._text.setText( negligibleString );
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
        this._text.setText( StringUtils.format( pattern_0value_1power, Util.toFixed( value, 2 ), pow ) );
      }
      else {
        this._text.setText( Util.toFixed( value, 1 ) );
      }
    },

    // set color of rectangle
    setFill: function( color ) {
      this._rectangle.setFill( color );
    }
  } );
} );
