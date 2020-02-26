// Copyright 2014-2019, University of Colorado Boulder

/**
 * Base type for main control panel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ABSColors = require( 'ACID_BASE_SOLUTIONS/common/ABSColors' );
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const merge = require( 'PHET_CORE/merge' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const Text = require( 'SCENERY/nodes/Text' );
  const ToolsControl = require( 'ACID_BASE_SOLUTIONS/common/view/ToolsControl' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const ViewsControl = require( 'ACID_BASE_SOLUTIONS/common/view/ViewsControl' );

  // strings
  const solutionString = require( 'string!ACID_BASE_SOLUTIONS/solution' );
  const toolsString = require( 'string!ACID_BASE_SOLUTIONS/tools' );
  const viewsString = require( 'string!ACID_BASE_SOLUTIONS/views' );

  // constants
  const TITLE_Y_SPACING = 1;
  const TITLE_OPTIONS = { font: new PhetFont( { size: 14, weight: 'bold' } ) };

  class ABSControlPanel extends VBox {

    /**
     * @param {ABSModel} model
     * @param {ABSViewProperties} viewProperties properties that are specific to the view
     * @param {Node} solutionControl
     * @param {Object} [options]
     */
    constructor( model, viewProperties, solutionControl, options ) {

      options = merge( {
        align: 'left',
        spacing: 5
      }, options );

      // titles
      const solutionTitle = new Text( solutionString, TITLE_OPTIONS );
      const viewsTitle = new Text( viewsString, TITLE_OPTIONS );
      const toolsTitle = new Text( toolsString, TITLE_OPTIONS );

      // controls
      const viewsControl = new ViewsControl( viewProperties.viewModeProperty, viewProperties.solventVisibleProperty );
      const toolsControl = new ToolsControl( viewProperties.toolModeProperty );

      // Reset All button
      const resetAllButton = new ResetAllButton( {
        listener: () => {
          model.reset();
          viewProperties.reset();
        },
        scale: 0.75
      } );

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
            // Reset All button to right of 'Tools' panel
            new HBox( { children: [ new Panel( toolsControl, panelOptions ), resetAllButton ], spacing: 10 } )
          ]
        } )
      ];

      // stack panels vertically
      super( options );
    }
  }

  return acidBaseSolutions.register( 'ABSControlPanel', ABSControlPanel );
} );
