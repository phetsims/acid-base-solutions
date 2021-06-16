[object Promise]

/**
 * pH color key, a set of color 'chips' for pH values.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import acidBaseSolutionsStrings from '../../acidBaseSolutionsStrings.js';
import ABSColors from '../ABSColors.js';

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
    const titleNode = new Text( acidBaseSolutionsStrings.pHColorKey, {
      font: FONT_BIG,
      maxWidth: parentNode.width,
      left: parentNode.left,
      top: parentNode.bottom + 2
    } );
    this.addChild( titleNode );

    this.mutate( options );
  }
}

acidBaseSolutions.register( 'PHColorKeyNode', PHColorKeyNode );
export default PHColorKeyNode;