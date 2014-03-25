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
  var Constants = require( 'ACID_BASE_SOLUTIONS/model/Constants/Constants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var pHColorKeyString = require( 'string!ACID_BASE_SOLUTIONS/pHColorKey' );

  // pH paper colors, ordered from pH value 0-14
  var PH_COLORS = [
    'rgb(182,70,72)',
    'rgb(196,80,86)',
    'rgb(213,83,71)',
    'rgb(237,123,83)',
    'rgb(246,152,86)',
    'rgb(244,158,79)',
    'rgb(243,160,78)',
    'rgb(244,182,67)',
    'rgb(231,201,75)',
    'rgb(93,118,88)',
    'rgb(30,92,89)',
    'rgb(34,90,105)',
    'rgb(39,87,111)',
    'rgb(27,67,90)',
    'rgb(0,34,52)'
  ];

  // constants
  var FONT_BIG = new PhetFont( 10 );
  var FONT_SMALL = new PhetFont( 8 );
  var CHIP_WIDTH = Constants.PH_PAPER_SIZE.width;
  var CHIP_HEIGHT = 28;
  var CHIP_X_SPACING = 1;

  /**
   * @param {Property<Boolean>} visibleProperty
   * @param {*} options any Node options
   * @constructor
   */
  function PHColorKeyNode( visibleProperty, options ) {

    var self = this;
    Node.call( this );

    // title
    this.addChild( new Text( pHColorKeyString, {font: FONT_BIG, centerY: 0} ) );

    // color chips, with a pH value below each one
    for ( var i = 0; i < PH_COLORS.length; i++ ) {
      this.addChild( new Rectangle( (CHIP_WIDTH + CHIP_X_SPACING) * i, 10, CHIP_WIDTH, CHIP_HEIGHT, {fill: PH_COLORS[i]} ) );
      this.addChild( new Text( i.toString(), {font: FONT_SMALL, centerX: (CHIP_WIDTH + CHIP_X_SPACING) * (i + 0.5), centerY: 46} ) );
    }

    visibleProperty.link( function( visible ) {
      self.visible = visible;
    } );

    this.mutate( options );
  }

  // Maps a {Number} pH value to a {String} color.
  PHColorKeyNode.pHToColor = function( pH ) {
    return PH_COLORS[ Math.round( pH ) ];
  };

  return inherit( Node, PHColorKeyNode );
} );
