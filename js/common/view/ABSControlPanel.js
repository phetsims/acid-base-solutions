// Copyright 2014-2020, University of Colorado Boulder

/**
 * Base type for main control panel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Panel from '../../../../sun/js/Panel.js';
import acidBaseSolutionsStrings from '../../acid-base-solutions-strings.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSColors from '../ABSColors.js';
import ToolsControl from './ToolsControl.js';
import ViewsControl from './ViewsControl.js';

const solutionString = acidBaseSolutionsStrings.solution;
const toolsString = acidBaseSolutionsStrings.tools;
const viewsString = acidBaseSolutionsStrings.views;

// constants
const TITLE_Y_SPACING = 1;
const TITLE_OPTIONS = { font: new PhetFont( { size: 14, weight: 'bold' } ) };

class ABSControlPanel extends VBox {

  /**
   * @param {ABSViewProperties} viewProperties properties that are specific to the view
   * @param {Node} solutionControl
   * @param {Object} [options]
   */
  constructor( viewProperties, solutionControl, options ) {

    options = merge( {
      align: 'center',
      spacing: 5
    }, options );

    // titles
    const solutionTitle = new Text( solutionString, TITLE_OPTIONS );
    const viewsTitle = new Text( viewsString, TITLE_OPTIONS );
    const toolsTitle = new Text( toolsString, TITLE_OPTIONS );

    // controls
    const viewsControl = new ViewsControl( viewProperties.viewModeProperty, viewProperties.solventVisibleProperty );
    const toolsControl = new ToolsControl( viewProperties.toolModeProperty );

    // 'Solution' and 'Views' panels have same width, 'Tools' panel does not
    const xMargin = 15;
    const panelOptions = {
      minWidth: Math.max( solutionControl.width, Math.max( viewsControl.width, toolsControl.width ) ) + ( 2 * xMargin ),
      fill: ABSColors.CONTROL_PANEL_BACKGROUND,
      xMargin: xMargin,
      yMargin: 6,
      align: 'left'
    };
    options.children = [
      new VBox( {
        spacing: TITLE_Y_SPACING,
        align: 'left',
        children: [
          solutionTitle,
          new Panel( solutionControl, panelOptions )
        ]
      } ),
      new VBox( {
        spacing: TITLE_Y_SPACING,
        align: 'left',
        children: [
          viewsTitle,
          new Panel( viewsControl, panelOptions )
        ]
      } ),
      new VBox( {
        spacing: TITLE_Y_SPACING,
        align: 'left',
        children: [
          toolsTitle,
          new Panel( toolsControl, panelOptions )
        ]
      } )
    ];

    // stack panels vertically
    super( options );
  }
}

acidBaseSolutions.register( 'ABSControlPanel', ABSControlPanel );
export default ABSControlPanel;