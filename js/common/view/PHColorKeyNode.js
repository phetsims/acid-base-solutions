// Copyright 2002-2014, University of Colorado Boulder

/**
 * pH color key, a set of color 'chips' for pH values.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ABSColors = require( 'ACID_BASE_SOLUTIONS/common/ABSColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var pHColorKeyString = require( 'string!ACID_BASE_SOLUTIONS/pHColorKey' );

  // constants
  var FONT_BIG = new PhetFont( 10 );
  var FONT_SMALL = new PhetFont( 8 );
  var CHIP_HEIGHT = 28;
  var CHIP_X_SPACING = 1;

  /**
   * @param {Dimension2} paperSize
   * @param {*} options any Node options
   * @constructor
   */
  function PHColorKeyNode( paperSize, options ) {

    var self = this;
    Node.call( this );

    // title
    this.addChild( new Text( pHColorKeyString, {font: FONT_BIG, centerY: 0} ) );

    // color chips, with a pH value below each one
    var chipWidth = paperSize.width; // same width as pH paper, to facilitate holding paper up to color key
    for ( var i = 0; i < ABSColors.PH.length; i++ ) {
      this.addChild( new Rectangle( (chipWidth + CHIP_X_SPACING) * i, 10, chipWidth, CHIP_HEIGHT, {fill: ABSColors.PH[i]} ) );
      this.addChild( new Text( i.toString(), {font: FONT_SMALL, centerX: (chipWidth + CHIP_X_SPACING) * (i + 0.5), centerY: 46} ) );
    }

    this.mutate( options );
  }

  return inherit( Node, PHColorKeyNode );
} );
