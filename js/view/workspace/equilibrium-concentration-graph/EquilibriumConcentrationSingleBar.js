// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for single bar
 * in concentration chart in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    HTMLText = require( 'SCENERY/nodes/HTMLText' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONT = new PhetFont( 12 ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    StringUtils = require( 'PHETCOMMON/util/StringUtils' ),
    Util = require( 'DOT/Util' ),
    ViewModes = require( 'model/ViewModes' ),

  // strings
    pattern_0value_1power = require( 'string!ACID_BASE_SOLUTIONS/pattern.0value.1power' ),
    negligibleString = require( 'string!ACID_BASE_SOLUTIONS/negligible' );

  /**
   * Constructor for single bar in equilibrium concentration chart.
   * @param {model} model Model of simulation. Should contain properties 'viewMode' and 'solution'
   * @param {string} solution Which corresponds to the given bar.
   * @param {property} property Property of model for observing. Concentration of single molecule type
   * @param {object} options for new node
   * @constructor
   */

  function EquilibriumConcentrationSingleBar( model, solution, property, options ) {
    var self = this,
      rectangle,
      text,
      setVisibility,
      height = options.height;
    Node.call( this );

    // add rectangle to represent concentration
    this.addChild( rectangle = new Rectangle( 0, 0, 25, 0, {fill: options.fill} ) );
    rectangle.rotate( Math.PI );

    // add vertical text for concentration (normal text + exponent text)
    this.addChild( text = new HTMLText( '123', {font: FONT, centerX: 2, centerY: -10} ) );
    text.rotate( -Math.PI / 2 );

    // set visibility of bar
    setVisibility = function() {
      self.setVisible( model.viewMode === ViewModes.EQUILIBRIUM && model.solution === solution );
    };

    // set height of bar
    var setBarHeightBinded = setBarHeight.bind( this, height, rectangle, text );

    // observer for properties
    var observer = function() {
      setVisibility();

      // if bar not visible then prevent updating
      if ( self.visible ) {
        setBarHeightBinded( property.value );
      }
    };

    model.property( 'viewMode' ).link( observer );
    model.property( 'solution' ).link( observer );
    property.link( observer );
  }

  // set height of bar
  var setBarHeight = function( height, rectangle, text, value ) {
    var barHeight,
      pow;

    barHeight = Math.abs( Util.log10( value ) + 8 ) * height / 10;

    // set bar height
    if ( isFinite( barHeight ) ) {
      rectangle.setRectHeight( barHeight );
    }

    // set concentration text
    if ( value < 1e-13 ) {
      text.setText( negligibleString );
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
      text.setText( StringUtils.format( pattern_0value_1power, Util.toFixed( value, 2 ), pow ) );
    }
    else {
      text.setText( Util.toFixed( value, 1 ) );
    }
  };

  return inherit( Node, EquilibriumConcentrationSingleBar );
} );
