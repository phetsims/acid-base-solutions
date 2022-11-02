// Copyright 2014-2022, University of Colorado Boulder

/**
 * pH color key, a set of color 'chips' for pH values.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, NodeOptions, NodeTranslationOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSColors from '../ABSColors.js';

// constants
const FONT_BIG = new PhetFont( 12 );
const FONT_SMALL = new PhetFont( 10 );
const CHIP_HEIGHT = 28;
const CHIP_X_SPACING = 1;

type SelfOptions = EmptySelfOptions;

type PHColorKeyNodeOptions = SelfOptions & NodeTranslationOptions;

export default class PHColorKeyNode extends Node {

  public constructor( paperSize: Dimension2, providedOptions?: PHColorKeyNodeOptions ) {

    const options = optionize<PHColorKeyNodeOptions, SelfOptions, NodeOptions>()( {
      // empty optionize because we'll be setting options.children below
    }, providedOptions );

    const numberOfChips = ABSColors.PH.length;

    // color chips, with a pH value above each one
    const parentNode = new Node();
    let chipNode;
    let previousChipNode;
    let pHText;
    for ( let i = 0; i < numberOfChips; i++ ) {

      chipNode = new Rectangle( 0, 0, paperSize.width, CHIP_HEIGHT, { fill: ABSColors.PH[ i ] } );
      pHText = new Text( i.toString(), { font: FONT_SMALL } );

      parentNode.addChild( chipNode );
      parentNode.addChild( pHText );

      if ( previousChipNode ) {
        chipNode.left = previousChipNode.right + CHIP_X_SPACING;
      }
      // pH number above color chip
      pHText.centerX = chipNode.centerX;
      pHText.bottom = chipNode.top - 2;

      previousChipNode = chipNode;
    }

    // title, below color chips
    const titleText = new Text( AcidBaseSolutionsStrings.pHColorKeyStringProperty, {
      font: FONT_BIG,
      maxWidth: parentNode.width,
      left: parentNode.left,
      top: parentNode.bottom + 2
    } );

    options.children = [ parentNode, titleText ];

    super( options );
  }
}

acidBaseSolutions.register( 'PHColorKeyNode', PHColorKeyNode );