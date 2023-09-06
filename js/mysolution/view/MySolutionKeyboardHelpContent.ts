// Copyright 2023, University of Colorado Boulder

/**
 * MySolutionKeyboardHelpContent is the content for the keyboard-help dialog in the 'My Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import MoveDraggableItemsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/MoveDraggableItemsKeyboardHelpSection.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';

export default class MySolutionKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // Sections in the left column.
    const leftSections = [

      // Move Draggable Items
      new MoveDraggableItemsKeyboardHelpSection(),

      // Slider Controls
      new SliderControlsKeyboardHelpSection()
    ];

    // Sections in the right column.
    const rightSections = [

      // Basic Actions
      new BasicActionsKeyboardHelpSection()
    ];

    super( leftSections, rightSections, {
      isDisposable: false // See https://github.com/phetsims/geometric-optics/issues/483
    } );
  }
}

acidBaseSolutions.register( 'MySolutionKeyboardHelpContent', MySolutionKeyboardHelpContent );