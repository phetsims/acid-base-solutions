// Copyright 2014-2020, University of Colorado Boulder

/**
 * pH color key, a set of color 'chips' for pH values.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ABSColors = require( 'ACID_BASE_SOLUTIONS/common/ABSColors' );
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const pHColorKeyString = require( 'string!ACID_BASE_SOLUTIONS/pHColorKey' );

  // constants
  const FONT_BIG = new PhetFont( 12 );
  const FONT_SMALL = new PhetFont( 10 );
  const CHIP_HEIGHT = 28;
  const CHIP_X_SPACING = 1;

  class PHColorKeyNode extends Node {

    /**
     * @param {Dimension2} paperSize
     * @param {Object} [options] any Node options
     */
    constructor( paperSize, options ) {

      super();

      const numberOfChips = ABSColors.PH.length;

      // color chips, with a pH value above each one
      const parentNode = new Node();
      let chipNode;
      let previousChipNode;
      let pHNumberNode;
      for ( let i = 0; i < numberOfChips; i++ ) {

        chipNode = new Rectangle( 0, 0, paperSize.width, CHIP_HEIGHT, { fill: ABSColors.PH[ i ] } );
        pHNumberNode = new Text( i.toString(), { font: FONT_SMALL } );

        parentNode.addChild( chipNode );
        parentNode.addChild( pHNumberNode );

        if ( previousChipNode ) {
          chipNode.left = previousChipNode.right + CHIP_X_SPACING;
        }
        // pH number above color chip
        pHNumberNode.centerX = chipNode.centerX;
        pHNumberNode.bottom = chipNode.top - 2;

        previousChipNode = chipNode;
      }
      this.addChild( parentNode );

      // title, below color chips
      const titleNode = new Text( pHColorKeyString, {
        font: FONT_BIG,
        maxWidth: parentNode.width,
        left: parentNode.left,
        top: parentNode.bottom + 2
      } );
      this.addChild( titleNode );

      this.mutate( options );
    }
  }

  return acidBaseSolutions.register( 'PHColorKeyNode', PHColorKeyNode );
} );
