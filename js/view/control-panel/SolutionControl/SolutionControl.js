// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of solution menu.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  var Node = require( 'SCENERY/nodes/Node' ),
    inherit = require( 'PHET_CORE/inherit' ),
    AquaRadioButton = require( 'SUN/AquaRadioButton' ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    HBox = require( 'SCENERY/nodes/HBox' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Line = require( 'SCENERY/nodes/Line' ),
    StrengthSlider = require( 'ACID_BASE_SOLUTIONS/view/control-panel/SolutionControl/StrengthSlider' ),
    ConcentrationSlider = require( 'ACID_BASE_SOLUTIONS/view/control-panel/SolutionControl/ConcentrationSlider' );

  // strings
  var acidString = require( 'string!ACID_BASE_SOLUTIONS/acid' ),
    baseString = require( 'string!ACID_BASE_SOLUTIONS/base' ),
    initialConcentrationString = require( 'string!ACID_BASE_SOLUTIONS/initialConcentration' ),
    strengthString = require( 'string!ACID_BASE_SOLUTIONS/strength' ),
    weakString = require( 'string!ACID_BASE_SOLUTIONS/weak' ),
    strongString = require( 'string!ACID_BASE_SOLUTIONS/strong' );

  // constants
  var FONT = new PhetFont( 12 );

  function SolutionControl( solutionMenuModel, options ) {

    var vBox = new VBox( {spacing: 4} ),
      strengthSlider;

    Node.call( this, options );

    // add type radio buttons menu
    vBox.addChild( new HBox( {spacing: 5, children: [
      new AquaRadioButton( solutionMenuModel.isAcidProperty, true, new Text( acidString, {font: FONT} ), {radius: 7} ),
      new AquaRadioButton( solutionMenuModel.isAcidProperty, false, new Text( baseString, {font: FONT} ), {radius: 7} )
    ]} ) );

    // add black line
    vBox.addChild( new Line( 15, 0, 170, 0, {stroke: 'black', lineWidth: 0.75} ) );

    // add concentration slider
    vBox.addChild( new Text( initialConcentrationString, {font: FONT} ) );
    vBox.addChild( new ConcentrationSlider( solutionMenuModel.concentrationSliderModel ) );

    // add black line
    vBox.addChild( new Line( 15, 0, 170, 0, {stroke: 'black', lineWidth: 0.75} ) );

    // add strength radio button
    vBox.addChild( new Text( strengthString, {font: FONT} ) );
    vBox.addChild( new HBox( {spacing: 5, children: [ // strength radio buttons menu
      new AquaRadioButton( solutionMenuModel.isWeakProperty, true, new Text( weakString, {font: FONT} ), {radius: 7} ),
      new AquaRadioButton( solutionMenuModel.isWeakProperty, false, new Text( strongString, {font: FONT} ), {radius: 7} )
    ]} ) );

    // add strength slider
    vBox.addChild( strengthSlider = new StrengthSlider( solutionMenuModel.strengthSliderModel ) );

    this.addChild( vBox );
    vBox.updateLayout();

    solutionMenuModel.strengthSliderModel.visibleProperty.link( function( visible ) {
      strengthSlider.setVisible( visible );
    } );
  }

  return inherit( Node, SolutionControl );
} );